import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentService, UserService} from '@sunbird/core';
import { ConfigService } from '@sunbird/shared';
import { Location } from '@angular/common';
import { BadgesService } from '../../../core/services/badges/badges.service';
import { SuiModalService, TemplateModalConfig, ModalTemplate } from 'ng2-semantic-ui';
import {
  ToasterService, ServerResponse ,
  ResourceService, IUserData
} from '@sunbird/shared';

export interface IassessDetail {
  name: string;
  link: string;
  since: string;
  year: string;
  region: string;
  board: string;
  gradeLevel: Array<any>;
  topic: Array<any>;
  keywords: Array<any>;
  description: string;
  version: string;
  creators: string;
  artifactUrl: string;
  mimeType: string;
  badgeAssertions: Array<any>;
}
@Component({
  selector: 'app-asset-detail-page',
  templateUrl: './asset-detail-page.component.html',
  styleUrls: ['./asset-detail-page.component.scss']
})

export class AssetDetailPageComponent implements OnInit {
  @ViewChild('modalTemplate')
  public modalTemplate: ModalTemplate<{ data: string }, string, string>;
  badgeList: any;
  showLoader = true;
  add = false;
  success = false;
  user: any;
  public userService: UserService;
  public activatedRoute: ActivatedRoute;
  public configService: ConfigService;
  public contentService: ContentService;
  badgeService: BadgesService;
  public contentId;
  public route: Router;
  public assetDetail: IassessDetail = {
    name: '',
    link: '',
    since: '',
    year: '',
    region: '',
    board: '',
    gradeLevel: [],
    topic: [],
    keywords: [],
    description: '',
    version: '',
    creators: '',
    artifactUrl: '',
    mimeType: '',
    badgeAssertions: [],
  };
  public resourceService: ResourceService;
  private toasterService: ToasterService;
  orgId: any;
  role: any;
  verified =  false;
  loaderMessage: {};
  reasons: Array<string>;
  userId: any;

  // capture previous url state for publish visibility
  visible = false;

  pdfs: string;
  constructor(activated: ActivatedRoute, public modalServices: SuiModalService , public modalService: SuiModalService,
    badgeService: BadgesService,  toasterService: ToasterService, resourceService: ResourceService, userService: UserService,
    config: ConfigService, contentServe: ContentService , rout: Router, private location: Location) {
    this.activatedRoute = activated;
    this.activatedRoute.url.subscribe(url => {
      this.contentId = url[1].path;
    });
    this.configService = config;
    this.contentService = contentServe;
    this.badgeService = badgeService;
    this.route = rout;
    this.toasterService = toasterService;
    this.resourceService = resourceService;
    this.userService = userService;
   }

  ngOnInit() {
    console.log('content', this.contentId);
    if (this.route.url.indexOf('review/detail') > -1 ) {
      this.visible = true;
    } else {
      this.visible = false;
    }
    const req = {
      url: `${this.configService.urlConFig.URLS.CONTENT.GET}/${this.activatedRoute.snapshot.params.contentId}`,
    };
    this.contentService.get(req).subscribe(data => {
      console.log('read content', data);
      this.assetDetail = data.result.content;
      this.pdfs = data.result.content.artifactUrl.substring(data.result.content.artifactUrl.lastIndexOf('/'),
      data.result.content.artifactUrl.lastIndexOf('pdf'));

    });
    console.log('this', this.assetDetail);
    this.userService.userData$.subscribe(
      (user: IUserData) => {
        this.user = user.userProfile.userRoles;
        this.orgId = user.userProfile.rootOrgId;
        this.userId = this.userService.userid;
      console.log('user info', this.orgId);
      this.user.forEach(element => {
        if (element === 'TEACHER_BADGE_ISSUER') {
          this.role = element;
          console.log('role', element);
        }
      });
    });
    const request = {
      request: {
        filters: {
          issuerList: [],
          rootOrgId: this.orgId,
          roles: [this.role],
          type: 'content'
        }
      }
    };
    this.badgeService.getAllBadgeList(request).subscribe((data) => {
      console.log('data for badge', data);
      this.badgeList = data.result.badges;
    });

  }
  assignBadge(issuerId, badgeId) {
    console.log('ids', issuerId, badgeId);
    this.success = true;
    const req = {
      request: {
        recipientId: this.contentId,
        recipientType: 'content',
        issuerId: issuerId,
        badgeId: badgeId
      }

    };
    this.badgeService.createAssertion(req).subscribe((data) => {
      console.log('aser', data);
    });
    this.callAlert();
  }
  callAlert() {
    alert('Badge added Successfully');
  }
  navigateToDetailsPage() {
    if (this.route.url.indexOf('/review/detail/do_') > -1 ) {
       this.route.navigate(['/upForReview']);
    } else {
      this.route.navigate(['myassets']);
    }
  }
  public deleteConfirmModal(issuerId, badgeId) {
    this.add = true;
    const config = new TemplateModalConfig<{ data: string }, string, string>(this.modalTemplate);
    config.isClosable = true;
    config.size = 'mini';
    this.modalService
      .open(config)
      .onApprove(result => {
        const req = {
          request: {
            recipientId: this.contentId,
            recipientType: 'content',
            issuerId: issuerId,
            badgeId: badgeId
          }

        };
        this.badgeService.createAssertion(req).subscribe((data) => {
          console.log('aser', data);
             this.showLoader = false;
             this.verified = !true;
             this.toasterService.success('Badge Added successfully');
             this.ngOnInit();
           },
           (err: ServerResponse) => {
             this.showLoader = false;
             this.toasterService.error('Adding Badge failed Please try again later');
           }
         );
       })
       .onDeny(result => {
       });
   }

   rejectAsset(contentId) {
     const option = {
      url: `${this.configService.urlConFig.URLS.CONTENT.REJECT}/${contentId}`
     };
     this.contentService.post(option).subscribe(
      (data: ServerResponse) => {
        this.showLoader = false;
        console.log('server response for asset reject is ');
        console.log(data);
        // this.resourceService.messages.smsg.m0004
        this.toasterService.success('Asset has been rejected successfully');
        setTimeout(() => {
          this.route.navigate(['upForReview']);
        }, 1200);
      }, (err) => {
        this.showLoader = false;
        this.toasterService.error('error occured while rejecting the asset');
      });
   }
   publishAsset(contentId) {
        this.showLoader = true;
          this.loaderMessage = {
            'loaderMessage': this.resourceService.messages.stmsg.m0034,
          };
          this.reasons = ['Content plays correctly',
            'Can see the content clearly on Desktop and App',
            'No Hate speech, Abuse, Violence, Profanity',
            'No Sexual content, Nudity or Vulgarity',
            'Relevant Keywords',
            'Appropriate tags such as Resource Type, Concepts',
            'Correct Board, Grade, Subject, Medium',
            'Appropriate Title, Description',
            'No Discrimination or Defamation',
            'Is suitable for children',
            'Audio (if any) is clear and easy to understand',
            'No Spelling mistakes in the text',
            'Language is simple to understand'];
           const requestBody = {
            request: {
              content: {
                publishChecklist: this.reasons,
                lastPublishedBy: this.userId
              }
            }
          };
          console.log(this.configService.urlConFig.URLS.CONTENT.PUBLISH, ' is the prefixer', requestBody);
          const option = {
            url: `${this.configService.urlConFig.URLS.CONTENT.PUBLISH}/${contentId}`,
            data: requestBody
          };
          this.contentService.post(option).subscribe(
            (data: ServerResponse) => {
              this.showLoader = false;
              console.log('server response for asset publish is ');
              console.log(data);
              // this.resourceService.messages.smsg.m0004
              this.toasterService.success('Asset has been sucessfully published');
              this.location.back();
            }, ( err ) => {
              console.log('error occured while sending asset for review');
              console.log(err);
              this.showLoader = false;
              this.toasterService.error('An error occured while sending your asset for review.');
            });
    }
   navigateToplay() {
    this.route.navigate(['play']);
   }
}
