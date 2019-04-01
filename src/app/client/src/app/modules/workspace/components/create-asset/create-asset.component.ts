import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {
  ResourceService, ConfigService, ToasterService, ServerResponse, IUserData, IUserProfile, Framework,
  ILoaderMessage, NavigationHelperService
} from '@sunbird/shared';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorService } from './../../services';
import { SearchService, UserService, FrameworkService, FormService, ContentService } from '@sunbird/core';
import * as _ from 'lodash';
import { CacheService } from 'ng2-cache-service';
import { DefaultTemplateComponent } from '../content-creation-default-template/content-creation-default-template.component';
import { IInteractEventInput, IImpressionEventInput } from '@sunbird/telemetry';
import { WorkSpace } from '../../classes/workspace';
import { WorkSpaceService } from '../../services';
import { publish } from 'rxjs/operators';

@Component({
  selector: 'app-create-asset',
  templateUrl: './create-asset.component.html',
  styleUrls: ['./create-asset.component.scss']
})
export class CreateAssetComponent extends WorkSpace implements OnInit, OnDestroy {
  @ViewChild('formData') formData: DefaultTemplateComponent;
  @ViewChild('modal') modal;

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
  public contentType = 'studymaterial';
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

  public contentService: ContentService;
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

  public formAction = 'save';

  public getFormFields: any;

  public formFieldProperties: any;

  public categoryMasterList: any;

  public creationFormLable: string;

  public name: string;

  public description: string;

  public isCachedDataExists: boolean;

  public framework: string;

  public contentID: string;

  public formUpdateData: any;
  uploadSuccess = false;
  showMessage = false;
  /**
	* telemetryImpression
	*/
  telemetryImpression: IImpressionEventInput;
  enabled = false;
  pdf: any;
  fileList: any;
  contentId: string;
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
    public navigationHelperService: NavigationHelperService,
    public contentservice: ContentService
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
    this.activatedRoute.url.subscribe(url => {
      // this.contentType = url[0].path;
      console.log('content type', this.contentType, url[0].path);

    });
    console.log('content type', this.contentType);
    this.contentService = contentservice;
    this.resourceType = this.configService.appConfig.resourceType[this.contentType];
    this.creationFormLable = this.configService.appConfig.contentCreateTypeLable[this.contentType];
    this.name = this.configService.appConfig.contentName[this.contentType] ?
      this.configService.appConfig.contentName[this.contentType] : 'Untitled';
    this.description = this.configService.appConfig.contentDescription[this.contentType] ?
      this.configService.appConfig.contentDescription[this.contentType] : 'Untitled';
  }


  ngOnInit() {
    console.log('this.activated ', this.activatedRoute.snapshot.params.contentId);

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

  }
  ngOnDestroy() {
    if (this.modal && this.modal.deny) {
      this.modal.deny();
    }
  }
  /**
  * fetchFrameworkMetaData is gives form config data
  */
  fetchFrameworkMetaData() {
    console.log('hiis');
    this.frameworkService.frameworkData$.subscribe((frameworkData: Framework) => {
      console.log('frame', frameworkData);
      if (!frameworkData.err) {
        console.log('error framework');
        this.categoryMasterList = _.cloneDeep(frameworkData.frameworkdata['defaultFramework'].categories);
        this.framework = frameworkData.frameworkdata['defaultFramework'].code;
        /**
  * isCachedDataExists will check data is exists in cache or not. If exists should not call
  * form api otherwise call form api and get form data
  */
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
    const req = {
      url: `${this.configService.urlConFig.URLS.CONTENT.GET}/${this.activatedRoute.snapshot.params.contentId}`,
    };
    this.contentService.get(req).subscribe(data => {
      console.log('read content', data);
      if (data.result.content.mimeType === 'application/pdf') {
        this.enabled = true;
        this.pdf = data.result.content.artifactUrl.substring(data.result.content.artifactUrl.lastIndexOf('/'),
         data.result.content.artifactUrl.lastIndexOf('pdf'));

      }
      // this.formInputData['gradeLevel'] = this.mutateData(data.result.content.gradeLevel)
      // this.formInputData['versionKey'] = data.result.content.versionKey;
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
    setTimeout(() => {
      this.router.navigate(['myassets']);
    }, 1600);
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
    delete requestData.status;
    if (this.contentType === 'studymaterial' && data.link) {
      requestData.mimeType = 'text/x-url';
      requestData['artifactUrl'] = data.link;
      // requestData.mimeType = 'application/pdf'
    } else {
      requestData.mimeType = 'application/pdf';
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
    console.log('formData', this.formData);
    const data = _.pickBy(this.formData.formInputData);
    if (!!data.name && !!data.description && !!data.board && !!data.keywords && !!data.creators &&
      !!data.version && !!data.gradeLevel && !!data.link) {
      console.log('hii');
      this.uploadSuccess = true;
      this.updateContent();
    } else {
      this.showMessage = true;
      this.toasterService.error('Asset updation failed please provide required fields');
    }
  }
  checkFieldofFile() {
    const data = _.pickBy(this.formData.formInputData);
    if (!!data.name && !!data.description && !!data.board && !!data.keywords && !!data.creators &&
      !!data.version && !!data.gradeLevel && !!this.fileList) {
      this.uploadSuccess = true;
      if (this.fileList.size < 50000000) {
        this.updateContentFile();
      } else {
        this.toasterService.error('File size should be less than 50MB');
      }
    } else {
      this.toasterService.error('Asset creation failed please provide required fields');
    }
  }

  updateContentFile() {
    console.log('in update content', this.generateData(_.pickBy(this.formData.formInputData)));
    const requestData = {
      content: this.generateData(_.pickBy(this.formData.formInputData)),
    };
    console.log('form data', this.formData.formInputData, requestData);
    if (this.contentType === 'studymaterial' && this.uploadSuccess === true) {
      this.editorService.update(requestData, this.activatedRoute.snapshot.params.contentId).subscribe(res => {
        console.log('res', res);
        this.contentId = res.result.content_id;
        this.uploadFileEvent();

        this.toasterService.success('Asset updated Successfully');
      }, err => {
        this.toasterService.error('Asset updation failed please try after some time');

      });
    } else {
      this.toasterService.error('Asset updation failed please try after some time');
    }
  }
  updateContent() {
    console.log('in update content', this.generateData(_.pickBy(this.formData.formInputData)));
    const requestData = {
      content: this.generateData(_.pickBy(this.formData.formInputData)),
    };
    console.log('form data', this.formData.formInputData, requestData);
    if (this.contentType === 'studymaterial' && this.uploadSuccess === true) {
      this.editorService.update(requestData, this.activatedRoute.snapshot.params.contentId).subscribe(res => {
        console.log('res', res);
        this.toasterService.success('Asset updated Successfully');
        this.goToCreate();
      }, err => {
        this.toasterService.error('Asset updation failed please try after some time');

      });
    } else {
      this.toasterService.error('Asset updation failed please try after some time');
    }
  }

  basicUploadFile(event) {
    this.fileList = event.target.files[0];
  }

  uploadFileEvent() {
    console.log('fileList', this.fileList);
    const data = {
      fileName: this.fileList.name
    };
    const request = {
      content: data
    };
    console.log('request in upload file', request);
    this.editorService.uploadUrl(request, this.contentId).subscribe(res => {
      this.toasterService.success('uploaded successfully');
      const pdfurl = res.result.pre_signed_url.substring(0, res.result.pre_signed_url.lastIndexOf('?'));
      this.workSpaceService.uploadPreSigned(res.result.pre_signed_url, this.fileList).subscribe(ress => {
        this.editorService.upload(pdfurl, this.contentId).subscribe(response => {
          console.log('ress', response);

        });
        this.goToCreate();

      }, err => {
        this.toasterService.error('asset creation failed');
      }

      );

      // this.editorService.upload()
    }, err => {
      this.toasterService.error('asset creation failed');
    });

  }

  createLockAndNavigateToEditor(content) {
    const state = 'draft';
    const framework = this.framework;
  }

  /**
    * Issue #SB-1448,  If previous url is not from create page, redirect current page to 'workspace/content/create'
  */
  checkForPreviousRouteForRedirect() {
    const previousUrlObj = this.navigationHelperService.getPreviousUrl();
    console.log('pre', previousUrlObj);
    if (previousUrlObj && previousUrlObj.url && (previousUrlObj.url !== '/myassets')) {
      this.redirect();
    }
  }
  redirect() {
    this.router.navigate(['/myassets/update', this.contentID]);

  }
}
