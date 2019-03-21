import { Component, OnInit, ViewChild, OnDestroy, } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {
  ResourceService, ConfigService, ToasterService, ServerResponse, IUserData, IUserProfile, Framework,
  ILoaderMessage, NavigationHelperService
} from '@sunbird/shared';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorService } from './../../services';
import { SearchService, UserService, FrameworkService, FormService } from '@sunbird/core';
import * as _ from 'lodash';
import { CacheService } from 'ng2-cache-service';
import { DefaultTemplateComponent } from '../content-creation-default-template/content-creation-default-template.component';
import { IInteractEventInput, IImpressionEventInput } from '@sunbird/telemetry';
import { WorkSpace } from '../../classes/workspace';
import { WorkSpaceService } from '../../services';
import { publish } from 'rxjs/operators';

@Component({
  selector: 'app-data-driven',
  templateUrl: './data-driven.component.html',
  styleUrls: ['./data-driven.component.css']
})
export class DataDrivenComponent extends WorkSpace implements OnInit, OnDestroy {
  @ViewChild('formData') formData: DefaultTemplateComponent;
  @ViewChild('modal') modal;
  announcementForm: FormGroup;

  /**
	 * This variable hepls to show and hide page loader.
   * It is kept true by default as at first when we comes
   * to a page the loader should be displayed before showing
   * any data
	 */
  showLoader = true;
  /**
* To show toaster(error, success etc) after any API calls
*/
  private toasterService: ToasterService;

  /**
* urlString for get url details
*/
  private urlString;
  /**
* contentType is creation type, fected from url
*/
  public contentType;
  /**
   * resourceType is resource type
   */
  public resourceType;
  /**
 * userForm name creation
 */
  public creationForm: FormGroup;
  /**
 * userProfile is of type userprofile interface
 */
  public userProfile: IUserProfile;
  /**
* Contains config service reference
*/
  public configService: ConfigService;
  /**
 * To make inbox API calls
 */
  private editorService: EditorService;
  /**
  * To call resource service which helps to use language constant
  */
  public resourceService: ResourceService;
  /**
 * To call resource service which helps to use language constant
 */
  public userService: UserService;
  /**
 * To send activatedRoute.snapshot to routerNavigationService
 */
  public activatedRoute: ActivatedRoute;
  /**
  * loader message
  */
  loaderMessage: ILoaderMessage;

  public frameworkService: FrameworkService;

  public formService: FormService;

  public formType = 'content';

  public formAction = 'create';

  public getFormFields: any;

  public formFieldProperties: any;

  public categoryMasterList: any;

  public creationFormLable: string;

  public name: string;

  public description: string;

  public isCachedDataExists: boolean;

  public framework: string;
  public showButton = false;
  public submit = false;

  /**
	* telemetryImpression
	*/
  telemetryImpression: IImpressionEventInput;

  percentDone: number;
  uploadSuccess = false;
  showMessage = false;



  constructor(
    public searchService: SearchService,
    public workSpaceService: WorkSpaceService,
    activatedRoute: ActivatedRoute,
    frameworkService: FrameworkService,
    private router: Router,
    resourceService: ResourceService,
    toasterService: ToasterService,
    editorService: EditorService,
    userService: UserService,
    configService: ConfigService,
    formService: FormService,
    private _cacheService: CacheService,
    public navigationHelperService: NavigationHelperService
  ) {
    super(searchService, workSpaceService, userService);
    this.activatedRoute = activatedRoute;
    this.resourceService = resourceService;
    this.toasterService = toasterService;
    this.editorService = editorService;
    this.userService = userService;
    this.configService = configService;
    this.frameworkService = frameworkService;
    this.formService = formService;
    this.contentType = 'studymaterial';
    console.log('content type', this.contentType);
    this.resourceType = this.configService.appConfig.resourceType[this.contentType];
    this.creationFormLable = this.configService.appConfig.contentCreateTypeLable[this.contentType];
    this.name = this.configService.appConfig.contentName[this.contentType] ?
      this.configService.appConfig.contentName[this.contentType] : 'Untitled';
    this.description = this.configService.appConfig.contentDescription[this.contentType] ?
      this.configService.appConfig.contentDescription[this.contentType] : 'Untitled';
  }


  ngOnInit() {
    console.log('this.activated ', this.activatedRoute);
    this.checkForPreviousRouteForRedirect();

    /**
     * fetchFrameworkMetaData is called to config the form data and framework data
     */
    this.fetchFrameworkMetaData();
    /***
 * Call User service to get user data
 */
    this.userService.userData$.subscribe(
      (user: IUserData) => {
        if (user && !user.err) {
          this.userProfile = user.userProfile;
        }
      });
    console.log('user profil', this.userProfile);
    this.telemetryImpression = {
      context: {
        env: this.activatedRoute.snapshot.data.telemetry.env
      },
      edata: {
        type: this.activatedRoute.snapshot.data.telemetry.type,
        pageid: this.activatedRoute.snapshot.data.telemetry.pageid,
        subtype: this.activatedRoute.snapshot.data.telemetry.subtype,
        uri: this.activatedRoute.snapshot.data.telemetry.uri
      }
    };
  }
  ngOnDestroy() {
    if (this.modal && this.modal.deny) {
      this.modal.deny();
    }
    // this.goToCreate();
  }
  /**
  * fetchFrameworkMetaData is gives form config data
  */
  fetchFrameworkMetaData() {

    this.frameworkService.frameworkData$.subscribe((frameworkData: Framework) => {
      console.log('frame', frameworkData);
      if (!frameworkData.err) {
        this.categoryMasterList = _.cloneDeep(frameworkData.frameworkdata['defaultFramework'].categories);
        this.framework = frameworkData.frameworkdata['defaultFramework'].code;
        /**
  * isCachedDataExists will check data is exists in cache or not. If exists should not call
  * form api otherwise call form api and get form data
  */     console.log('cata', this.categoryMasterList);
        this.isCachedDataExists = this._cacheService.exists(this.contentType + this.formAction);
        if (this.isCachedDataExists) {
          const data: any | null = this._cacheService.get(this.contentType + this.formAction);
          this.formFieldProperties = data;
        } else {
          const formServiceInputParams = {
            formType: this.formType,
            formAction: this.formAction,
            contentType: this.contentType,
            framework: this.framework
          };
          this.formService.getFormConfig(formServiceInputParams).subscribe(
            (data: ServerResponse) => {
              console.log('data');
              this.formFieldProperties = data;
              this.getFormConfig();
            },
            (err: ServerResponse) => {
              this.toasterService.error(this.resourceService.messages.emsg.m0005);
            }
          );
        }
      } else if (frameworkData && frameworkData.err) {
        this.toasterService.error(this.resourceService.messages.emsg.m0005);
      }
    });
  }

  /**
   * @description            - Which is used to config the form field vlaues
   * @param {formFieldProperties} formFieldProperties  - Field information
   */
  getFormConfig() {
    _.forEach(this.categoryMasterList, (category) => {
      _.forEach(this.formFieldProperties, (formFieldCategory) => {
        if (category.code === formFieldCategory.code) {
          formFieldCategory.range = category.terms;
        }
        return formFieldCategory;
      });
    });
    this.formFieldProperties = _.sortBy(_.uniqBy(this.formFieldProperties, 'code'), 'index');
    this._cacheService.set(this.contentType + this.formAction, this.formFieldProperties,
      {
        maxAge: this.configService.appConfig.cacheServiceConfig.setTimeInMinutes *
          this.configService.appConfig.cacheServiceConfig.setTimeInSeconds
      });
  }
  /****
* Redirects to workspace create section
*/
  goToCreate() {
    console.log('create after ');

    this.router.navigate(['myassets']);
  }

  /**
* requestBody is returned of type object
*/
  generateData(data) {
    console.log('dat form', data);
    this.showLoader = true;
    const requestData = _.cloneDeep(data);
    requestData.name = data.name ? data.name : this.name,
      requestData.description = data.description ? data.description : this.description,
      requestData.createdBy = this.userProfile.id,
      requestData.organisation = this.userProfile.organisationNames,
      requestData.createdFor = this.userProfile.organisationIds,
      requestData.contentType = this.configService.appConfig.contentCreateTypeForEditors[this.contentType],
      requestData.framework = this.framework;
    requestData.version = parseFloat(requestData.version);
    requestData['artifactUrl'] = data.link;
    if (this.contentType === 'studymaterial') {
      requestData.mimeType = 'text/x-url';
    } else {
      requestData.mimeType = this.configService.urlConFig.URLS.CONTENT_COLLECTION;
    }
    if (this.resourceType) {
      requestData.resourceType = this.resourceType;
    }
    if (!_.isEmpty(this.userProfile.lastName)) {
      requestData.creator = this.userProfile.firstName + ' ' + this.userProfile.lastName;
    } else {
      requestData.creator = this.userProfile.firstName;
    }
    return requestData;
  }
  checkFields() {
    const data = _.pickBy(this.formData.formInputData);
    if (!!data.name && !!data.description && !!data.board && !!data.keywords && !!data.creators && !!data.version && data.gradeLevel) {
      console.log('hii');
      this.uploadSuccess = true;
      this.createContent();
    } else {
      this.showMessage = true;
      this.toasterService.error('Asset creation failed please provide required fields');
    }
  }
  createContent() {
    console.log('form data ', this.formData.formInputData);

    const requestData = {
      content: this.generateData(_.pickBy(this.formData.formInputData))
    };

    console.log('form data', this.formData.formInputData);
    if (this.contentType === 'studymaterial' && this.uploadSuccess === true) {
      this.editorService.create(requestData).subscribe(res => {
        console.log('res', res);
        this.toasterService.success('Asset created successfully');
        this.createLockAndNavigateToEditor({ identifier: res.result.content_id });
      }, err => {
        this.toasterService.error('asset creation failed');
      });
    } else {
      this.toasterService.error('asset creation failed');
    }
    this.goToCreate();

  }

  createLockAndNavigateToEditor(content) {
    const state = 'draft';
    const framework = this.framework;
    // if (this.contentType === 'studymaterial') {
    //   this.router.navigate(['/workspace/content/edit/content/', content.identifier, state, framework, 'Draft']);
    // } else {
    //   const type = this.configService.appConfig.contentCreateTypeForEditors[this.contentType];
    //   this.router.navigate(['/workspace/content/edit/collection', content.identifier, type, state, framework, 'Draft']);
    // }
  }

  /**
    * Issue #SB-1448,  If previous url is not from create page, redirect current page to 'workspace/content/create'
  */
  checkForPreviousRouteForRedirect() {
    const previousUrlObj = this.navigationHelperService.getPreviousUrl();
    if (previousUrlObj && previousUrlObj.url && (previousUrlObj.url !== '/myassets/create')) {
      this.redirect();
    }
  }

  sendForReview() {

  }
  redirect() {
    this.router.navigate(['/myassets/create']);
  }


}
