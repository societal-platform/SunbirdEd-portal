import { combineLatest as observableCombineLatest, Observable, Subject, Subscription, BehaviorSubject } from 'rxjs';
import { Component, OnInit, ViewChild, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkSpace } from '../../classes/workspace';
import { SearchService, UserService, ISort, FrameworkService, PermissionService, ContentService } from '@sunbird/core';
import {
  ServerResponse, PaginationService, ConfigService, ToasterService,
  ResourceService, ILoaderMessage, INoResultMessage, IContents,
} from '@sunbird/shared';
import { Ibatch, IStatusOption } from './../../interfaces/';
import { WorkSpaceService } from '../../services';
import { IPagination } from '@sunbird/announcement';
import * as _ from 'lodash';
import { IImpressionEventInput } from '@sunbird/telemetry';
import { SuiModalService, TemplateModalConfig, ModalTemplate } from 'ng2-semantic-ui';
import { ICard } from '../../../shared/interfaces/card';
import { BadgesService } from '../../../core/services/badges/badges.service';
import { IUserData } from '@sunbird/shared';
import { Location } from '@angular/common';


@Component({
  selector: 'app-myassest-page',
  templateUrl: './myassest-page.component.html',
  styleUrls: ['./myassest-page.component.scss']
})
export class MyassestPageComponent extends WorkSpace implements OnInit, OnDestroy {
  @ViewChild('modalTemplate')
  // @ViewChild('modalTemplate2')
  public modalTemplate: ModalTemplate<{ data: string }, string, string>;
  // public modalTemplate2: ModalTemplate<{data: string}, string, string>;
  /**
     * state for content editior
    */

  state: string;

  /**
   * To store the content available for upForReview
   */

  /**
   * To navigate to other pages
   */
  route: Router;

  /**
   * To send activatedRoute.snapshot to router navigation
   * service for redirection to draft  component
  */
  private activatedRoute: ActivatedRoute;

  /**
   * Contains unique contentIds id
  */
  contentIds: string;
  /**
   * Contains list of published course(s) of logged-in user
  */
  // allContent: Array<IContents> = [];
  allContent: Array<ICard> = [];
  upForReviewContent = [];

  /**
   * To show / hide loader
  */
  showLoader = true;

  /**
   * loader message
  */
  loaderMessage: ILoaderMessage;

  /**
  Modal message stores the message to display in the generic modal template */
modalMessage = '';
  /**
   * To show / hide no result message when no result found
  */
  noResult = false;

  /**
   * lock popup data for locked contents
  */
  lockPopupData: object;

  /**
   * To show content locked modal
  */
  showLockedContentModal = false;

  /**
   * To show / hide error
  */
  showError = false;

  /**
   * no result  message
  */
  noResultMessage: INoResultMessage;

  /**
  to show no results on upForReview tab
  */
  noResultsForReview = false;

  /**
    * For showing pagination on draft list
  */
  private paginationService: PaginationService;

  /**
  * To get url, app configs
  */
  public config: ConfigService;
  /**
  * Contains page limit of inbox list
  */
  pageLimit: number;
  /**
  * Current page number of inbox list
  */
  pageNumber = 1;

  /**
  * totalCount of the list
  */
  totalCount: Number;
  /**
    status for preselection;
  */
  status: string;
  /**
  route query param;
  */
  queryParams: any;
  /**
  redirectUrl;
  */
  public redirectUrl: string;
  /**
  filterType;
  */
  public filterType: string;
  /**
  sortingOptions ;
  */
  public sortingOptions: Array<ISort>;
  /**
  sortingOptions ;
  */
  sortByOption: string;
  /**
  sort for filter;
  */
  sort: object;
  /**
	 * inviewLogs
	*/
  inviewLogs = [];
  /**
* value typed
*/
  query: string;
  /**
  * Contains returned object of the pagination service
  * which is needed to show the pagination on all content view
  */
  pager: IPagination;

  /**
  * To show toaster(error, success etc) after any API calls
  */
  private toasterService: ToasterService;
  /**
	 * telemetryImpression
	*/
  telemetryImpression: IImpressionEventInput;
  /**
  * To call resource service which helps to use language constant
  *
  */
  orgDetailsUnsubscribe: Subscription;
  badgeService: BadgesService;
  public frameworkService: FrameworkService;
  public resourceService: ResourceService;
  public permissionService: PermissionService;
  public contentService: ContentService;
  lessonRole: any;
  userId: string;
  reasons = [];
  deleteAsset = false;
  publishAsset = false;
  badgeList: any;
  user: any;
  orgId: any;
  role: any;
  userDetails: any;
  /**
    * Constructor to create injected service(s) object
    Default method of Draft Component class
    * @param {SearchService} SearchService Reference of SearchService
    * @param {UserService} UserService Reference of UserService
    * @param {Router} route Reference of Router
    * @param {PaginationService} paginationService Reference of PaginationService
    * @param {ActivatedRoute} activatedRoute Reference of ActivatedRoute
    * @param {ConfigService} config Reference of ConfigService
  */
  constructor(public searchService: SearchService,
    public workSpaceService: WorkSpaceService,
    badgeService: BadgesService,
    paginationService: PaginationService,
    activatedRoute: ActivatedRoute,
    route: Router, userService: UserService,
    permissionService: PermissionService,
    toasterService: ToasterService, resourceService: ResourceService,
    config: ConfigService, public modalService: SuiModalService,
    public modalServices: SuiModalService, frameworkService: FrameworkService,
    contentService: ContentService) {
    super(searchService, workSpaceService, userService);
    this.paginationService = paginationService;
    this.route = route;
    this.activatedRoute = activatedRoute;
    this.toasterService = toasterService;
    this.resourceService = resourceService;
    this.config = config;
    this.permissionService = permissionService;
    this.badgeService = badgeService;
    this.route.onSameUrlNavigation = 'reload';
    this.frameworkService = frameworkService;
    this.contentService = contentService;

    this.state = 'allcontent';
    this.loaderMessage = {
      'loaderMessage': this.resourceService.messages.stmsg.m0110,
    };
    this.sortingOptions = this.config.dropDownConfig.FILTER.RESOURCES.sortingOptions;
  }

  ngOnInit() {
    this.userId = this.userService.userid;
    this.lessonRole = this.config.rolesConfig.workSpaceRole.lessonRole;

    this.filterType = this.config.appConfig.allmycontent.filterType;
    this.redirectUrl = this.config.appConfig.allmycontent.inPageredirectUrl;
    this.frameworkService.initialize();

    observableCombineLatest(
      this.activatedRoute.params,
      this.activatedRoute.queryParams,
      (params: any, queryParams: any) => {
        return {
          params: params,
          queryParams: queryParams
        };
      })
      .subscribe(bothParams => {
        if (bothParams.params.pageNumber) {
          this.pageNumber = Number(bothParams.params.pageNumber);
        }
        this.queryParams = bothParams.queryParams;
        this.query = this.queryParams['query'];
        this.fecthAllContent(this.config.appConfig.WORKSPACE.PAGE_LIMIT, this.pageNumber, bothParams);

      });
    this.userService.userData$.subscribe(
      (user: IUserData) => {
        this.userDetails = user.userProfile;
        this.user = user.userProfile.userRoles;
        this.orgId = user.userProfile.rootOrgId;
        this.user.forEach(element => {
          if (element === 'TEACHER_BADGE_ISSUER') {
            this.role = element;          }
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
      this.badgeList = data.result.content;
    });
  }



  /**
  * This method sets the make an api call to get all UpForReviewContent with page No and offset
  */
  fecthAllContent(limit: number, pageNumber: number, bothParams) {
    console.log('fetch all');
    this.showLoader = true;
    if (bothParams.queryParams.sort_by) {
      const sort_by = bothParams.queryParams.sort_by;
      const sortType = bothParams.queryParams.sortType;
      this.sort = {
        [sort_by]: _.toString(sortType)
      };
    } else {
      this.sort = { lastUpdatedOn: this.config.appConfig.WORKSPACE.lastUpdatedOn };
    }
    const preStatus = ['Draft', 'Review', 'Live'];
    const searchParams = {
      filters: {
        status: bothParams.queryParams.status ? bothParams.queryParams.status : preStatus,
        createdBy: this.userService.userid,
        contentType: this.config.appConfig.WORKSPACE.contentType,
        objectType: this.config.appConfig.WORKSPACE.objectType,
        board: bothParams.queryParams.board,
        subject: bothParams.queryParams.subject,
        medium: bothParams.queryParams.medium,
        gradeLevel: bothParams.queryParams.gradeLevel,
        resourceType: bothParams.queryParams.resourceType,
        keywords: bothParams.queryParams.keywords
      },
      limit: limit,
      offset: (pageNumber - 1) * (limit),
      query: _.toString(bothParams.queryParams.query),
      sort_by: this.sort
    };
    this.orgDetailsUnsubscribe = this.searchContentWithLockStatus(searchParams)
      .subscribe(
        (data: ServerResponse) => {
          console.log('USER USER', this.userDetails);
          console.log('data here ', data);
          if (data.result.count && data.result.content.length > 0) {
            if (this.route.url === '/upForReview' ) {
               console.log('reviewAsset is captured ', this.config.appConfig.Library.orgName);
               this.noResultsForReview = false;
              const option = {
                url : '/content/v1/search',
                param : '',
                filters: {
                  language: ['English'],
                  contentType: ['Resource'],
                  status: ['Review'],
                  channel: this.userDetails.organisationIds,
                  organisation: this.config.appConfig.Library.orgName
              },
                sort_by: {me_averageRating: 'desc'}
              };
              this.contentService.getupForReviewData(option).subscribe(response => {
                if (response.result.count > 0) {
                  this.upForReviewContent = response.result.content.filter(content => content.createdBy !== this.userId);
                  if (this.upForReviewContent.length <= 0) {
                    this.noResultsForReview = true;
                    this.noResultMessage = {
                      'messageText': 'No assets available to review for now.'
                    };
                  } else {
                    this.noResultsForReview = false;
                  }

                  this.allContent = this.upForReviewContent;
                console.log('the all content for upforreview is ', this.allContent);
                } else {
                  console.log('did not recieve anything');
                  // set the no results template if no assets is present
                  this.noResultsForReview = true;
                  this.noResultMessage = {
                    'messageText': 'No assets available to review for now.'
                  };
                }
              });
            } else {this.allContent = data.result.content; }
            console.log('this is allContent', this.allContent);
            this.totalCount = data.result.count;
            this.pager = this.paginationService.getPager(data.result.count, pageNumber, limit);
            this.showLoader = false;
            this.noResult = false;
          } else {
            this.showError = false;
            this.noResult = true;
            this.showLoader = false;
            this.noResultMessage = {
              'messageText': this.resourceService.messages.stmsg.m0125
            };
          }
        },
        (err: ServerResponse) => {
          this.showLoader = false;
          this.noResult = false;
          this.showError = true;
          this.toasterService.error(this.resourceService.messages.fmsg.m0081);
        }
      );
  }
  public deleteConfirmModal(contentIds) {
    this.deleteAsset = true;
    const config = new TemplateModalConfig<{ data: string }, string, string>(this.modalTemplate);
    config.isClosable = true;
    config.size = 'mini';
    config.context = {
      data: 'delete'
      };
      this.modalMessage = 'Do you want to delete this asset ?';

    this.modalService
      .open(config)
      .onApprove(result => {
        this.showLoader = true;
        this.loaderMessage = {
          'loaderMessage': this.resourceService.messages.stmsg.m0034,
        };
        this.delete(contentIds).subscribe(
          (data: ServerResponse) => {
            this.showLoader = false;
            this.allContent = this.removeAllMyContent(this.allContent, contentIds);
            if (this.allContent.length === 0) {
              this.ngOnInit();
            }
            this.toasterService.success('Asset deleted successfully');
          },
          (err: ServerResponse) => {
            this.showLoader = false;
            this.toasterService.error(this.resourceService.messages.fmsg.m0022);
          }
        );
      })
      .onDeny(result => {
      });
  }
  public reviewConfirmModal(contentIds) {
    const config2 = new TemplateModalConfig<{ data: string }, string, string>(this.modalTemplate);
    config2.isClosable = true;
    config2.size = 'mini';
    config2.context = {
      data: 'Review'
      };
      this.modalMessage = 'Do you want to send this asset for review?';
    this.modalServices
      .open(config2)
      .onApprove(result => {
        this.showLoader = true;
        this.loaderMessage = {
          'loaderMessage': this.resourceService.messages.stmsg.m0034,
        };
        const requestBody = {
          request: {
            content: {
            }
          }
        };
        const option = {
          url: `${this.config.urlConFig.URLS.CONTENT.REVIEW}/${contentIds}`,
          data: requestBody
        };
        console.log(this.config.urlConFig.URLS.CONTENT);
        this.contentService.post(option).subscribe(
          (data: ServerResponse) => {
            console.log('server response for asset review is ');
            console.log(data);
            this.toasterService.success('Your Asset has been sucessfully sent for review');
            setTimeout(() => {
              this.showLoader = false;
              this.ngOnInit();
            }, 2000);
          }, (err) => {
            console.log('error occured while sending asset for review');
            console.log(err);
            this.showLoader = false;
            this.toasterService.error('An error occured while sending your asset for review.');
          });
      })

      .onDeny(result => {
      });
  }

  /* public publishConfirmModal(contentId){
    const config2 = new TemplateModalConfig<{ data: string }, string, string>(this.modalTemplate);
    config2.isClosable = true;
    config2.size = 'mini';
    config2.context = {data: 'Review'};
    this.modalServices
      .open(config2)
      .onApprove(result => {
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
        const option = {
          url: `${this.config.urlConFig.URLS.CONTENT.PUBLISH}/${contentId}`,
          data: requestBody
        };
        console.log(this.config.urlConFig.URLS.CONTENT);
        this.contentService.post(option).subscribe(
          (data: ServerResponse) => {
            this.showLoader = false;
            console.log("server response for asset review is ");
            console.log(data);
            //this.resourceService.messages.smsg.m0004
            this.toasterService.success('You Asset has been sucessfully sent for review');
            window.location.reload();
          }, (err) => {
            console.log('error occured while sending asset for review');
            console.log(err);
            this.showLoader = false;
            this.toasterService.error('An error occured while sending your asset for review.');
          });
      })

      .onDeny(result => {
      });
  } */

  /**
   * This method helps to navigate to different pages.
   * If page number is less than 1 or page number is greater than total number
   * of pages is less which is not possible, then it returns.
	 *
	 * @param {number} page Variable to know which page has been clicked
	 *
	 * @example navigateToPage(1)
	 */
  navigateToPage(page: number): undefined | void {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pageNumber = page;
    this.route.navigate(['myassets/', this.pageNumber], { queryParams: this.queryParams });
  }
  navigateToDetailsPage(contentId: string) {
    if (this.route.url === '/upForReview') {
      this.navigateToReviewAssetDetailsPage(contentId);
    } else {
      this.route.navigate(['myassets/detail', contentId]);
    }
  }

  navigateToReviewAssetDetailsPage(contentId: string) {
    this.route.navigate(['upForReview/review/detail', contentId]);
  }

  contentClick(content) {
    if (_.size(content.lockInfo)) {
      this.lockPopupData = content;
      this.showLockedContentModal = true;
    } else {
      const status = content.status.toLowerCase();
      if (status === 'processing') {
        return;
      }
      if (status === 'draft') { // only draft state contents need to be locked
        this.workSpaceService.navigateToContent(content, this.state);
      } else {
        this.workSpaceService.navigateToContent(content, this.state);
      }
    }
  }

  public onCloseLockInfoPopup() {
    this.showLockedContentModal = false;
  }

  inview(event) {
    _.forEach(event.inview, (inview, key) => {
      const obj = _.find(this.inviewLogs, (o) => {
        return o.objid === inview.data.identifier;
      });
      if (obj === undefined) {
        this.inviewLogs.push({
          objid: inview.data.identifier,
          objtype: inview.data.contentType,
          index: inview.id
        });
      }
    });
    this.telemetryImpression.edata.visits = this.inviewLogs;
    this.telemetryImpression.edata.subtype = 'pageexit';
    this.telemetryImpression = Object.assign({}, this.telemetryImpression);
  }
  removeAllMyContent(contentList, requestData) {
    return contentList.filter((content) => {
      return requestData.indexOf(content.identifier) === -1;
    });
  }
  ngOnDestroy() {
    console.log('destroy');
    if (this.orgDetailsUnsubscribe) {
      this.orgDetailsUnsubscribe.unsubscribe();
    }

  }
  navigateToEditPage(contentId: string) {
    this.route.navigate(['myassets/update', contentId]);
  }
}
