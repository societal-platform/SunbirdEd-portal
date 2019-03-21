import {
  ConfigService, ResourceService, IUserData, IUserProfile,
  ToasterService, ServerResponse
} from '@sunbird/shared';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService, PermissionService } from '../../services';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { IInteractEventObject, IInteractEventEdata } from '@sunbird/telemetry';
import { CacheService } from 'ng2-cache-service';
import { first, filter } from 'rxjs/operators';
import { SuiModalService, TemplateModalConfig, ModalTemplate } from 'ng2-semantic-ui';
import * as _ from 'lodash';
declare var jQuery: any;
import { PublicDataService } from '../../services/public-data/public-data.service';
import { ConfigureService } from '../../services/configure/configure.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

/**
 * Main menu component
 */
@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
  providers: [NgbModal]
})
export class MainMenuComponent implements OnInit {
  @ViewChild('modalTemplate')
  email: any;
  name: any;
  org: any;
  message: any;
  closeResult: string;
  alert = false;
  userData: any;
userName: any;
userEmail: any;
orgName: any;

  public modalTemplate: ModalTemplate<{ data: string }, string, string>;
  /**
   * Workspace access roles
   */
  workSpaceRole: Array<string>;
  /**
   * reference of resourceService service.
   */
  public resourceService: ResourceService;
  /**
   * reference of UserService service.
   */
  public userService: UserService;
  /**
   * reference of permissionService service.
   */
  public permissionService: PermissionService;
  /**
   * reference of config service.
   */
  public config: ConfigService;
  /**
 * user profile details.
 */
  userProfile: IUserProfile;
  /**
   * reference of Router.
   */
  private router: Router;
  homeMenuIntractEdata: IInteractEventEdata;
  learnMenuIntractEdata: IInteractEventEdata;
  libraryMenuIntractEdata: IInteractEventEdata;
  workspaceMenuIntractEdata: IInteractEventEdata;
  exploreRoutingUrl: string;
  showExploreHeader = false;
  add = false;
  helpLinkVisibility: string;
  private toasterService: ToasterService;
  success = false;
  user: any;

  /*
  * constructor
  */
  constructor(resourceService: ResourceService, userService: UserService, router: Router,
    public modalServices: SuiModalService, toasterService: ToasterService,
    permissionService: PermissionService, config: ConfigService, private cacheService: CacheService,
     public publicDataService: PublicDataService,
    public dataService: ConfigureService, private modalService: NgbModal) {
    this.resourceService = resourceService;
    this.userService = userService;
    this.permissionService = permissionService;
    this.router = router;
    this.config = config;
    this.workSpaceRole = this.config.rolesConfig.headerDropdownRoles.workSpaceRole;
    this.toasterService = toasterService;
  }

  ngOnInit() {
    try {
      this.helpLinkVisibility = (<HTMLInputElement>document.getElementById('helpLinkVisibility')).value;
    } catch (error) {
      this.helpLinkVisibility = 'false';
    }
    this.setInteractData();
    this.getUrl();
    this.userService.userData$.pipe(first()).subscribe(
      (user: IUserData) => {
        this.user = user.userProfile;
        this.user = user.userProfile;
        this.userName = this.user.firstName;
        this.userEmail = this.user.email;
        this.orgName = this.user.rootOrg.orgName;
      });
  }
  setInteractData() {
    this.homeMenuIntractEdata = {
      id: 'home-tab',
      type: 'click',
      pageid: 'home'
    };
    this.libraryMenuIntractEdata = {
      id: 'library-tab',
      type: 'click',
      pageid: 'library'
    };
    this.learnMenuIntractEdata = {
      id: 'learn-tab',
      type: 'click',
      pageid: 'learn'
    };
    this.workspaceMenuIntractEdata = {
      id: 'workspace-menu-button',
      type: 'click',
      pageid: 'workspace'
    };
  }

  logout() {
    window.location.replace('/logoff');
    this.cacheService.removeAll();
  }

  showSideBar() {
    jQuery('.ui.sidebar').sidebar('setting', 'transition', 'overlay').sidebar('toggle');
  }

  getUrl() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((urlAfterRedirects: NavigationEnd) => {
      if (_.includes(urlAfterRedirects.url, '/explore')) {
        this.showExploreHeader = true;
        const url = urlAfterRedirects.url.split('?')[0].split('/');
        if (url.indexOf('explore') === 2) {
          this.exploreRoutingUrl = url[1] + '/' + url[2];
        } else {
          this.exploreRoutingUrl = url[1];
        }
      } else if (_.includes(urlAfterRedirects.url, '/explore-course')) {
        this.showExploreHeader = true;
        const url = urlAfterRedirects.url.split('?')[0].split('/');
        if (url.indexOf('explore-course') === 2) {
          this.exploreRoutingUrl = url[1] + '/' + url[2];
        } else {
          this.exploreRoutingUrl = url[1];
        }
      } else {
        this.showExploreHeader = false;
      }
    });
  }

  navigateToWorkspace() {
    const authroles = this.permissionService.getWorkspaceAuthRoles();
    console.log('authrole', authroles);
    if (authroles) {
      this.router.navigate([authroles.url]);
    }
  }

  gotoContact() {
    const data = $('#feedbackform').serializeArray();
    console.log('form', data);
    this.sendNotification(data);
  }
  sendNotification(data1) {
    this.success = !this.success;
    console.log('in func', data1);
    data1.forEach(element => {
   if (element.name === 'email') {
    this.email = element.value;
   }
   if (element.name === 'org') {
    this.org = element.value;
   }
   if (element.name === 'message') {
      this.message = element.value;
   }
    });
    this.userData = 'Organization:&nbsp;' + this.org + '<br>' + 'email Id:&nbsp; ' + this.email;

    const body = {
      request: {

        subject: this.email + this.dataService.dataConfig.subject,

        body: this.dataService.dataConfig.body + '<br>' + '&nbsp;&nbsp;&nbsp;' + this.message + '<br>' + this.userData,

        orgName: this.org,

        orgImgUrl: this.dataService.dataConfig.orgImgUrl,

        emailTemplateType: this.dataService.dataConfig.template,

        fromEmail: this.dataService.dataConfig.fromEmail,

        recipientEmails: [this.dataService.dataConfig.email]

    }
     };

        const req = {
          url: `${this.config.urlConFig.URLS.FEEDBACK.EMAIL}`,
          data: body
        };
        this.publicDataService.post(req).subscribe( (data: ServerResponse) => {
          this.alert = !this.alert;
          this.toasterService.success('Thanks for your valuable feedback.');
    return data;

        });
    }
  openSm(content) {
    const modalClose = this.modalService.open(content);
  }

}
