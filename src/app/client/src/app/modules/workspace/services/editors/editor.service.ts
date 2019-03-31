import { ContentService, PublicDataService, UserService , UploadContentService} from '@sunbird/core';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ConfigService, ServerResponse } from '@sunbird/shared';
import { map, switchMap, catchError } from 'rxjs/operators';
import * as _ from 'lodash';
import { WorkSpaceService } from './../work-space/workspace.service';

/**
 * Service to provides CRUD methods to make content api request by extending DataService.
 */
@Injectable()
export class EditorService {
    /**
     * base Url for content api
     */
    baseUrl: string;
    /**
     * reference of config service.
     */
    public configService: ConfigService;
    /**
     * reference of content service.
     */
    public contentService: ContentService;
    /**
     * reference of lerner service.
     */
    public publicDataService: PublicDataService;

    public uploadService: UploadContentService;
    /**
     * constructor
     * @param {ConfigService} config ConfigService reference
     */
    constructor(configService: ConfigService, contentService: ContentService, publicDataService: PublicDataService,
        public workspaceService: WorkSpaceService, public userService: UserService, public uploadservice: UploadContentService) {
        this.configService = configService;
        this.contentService = contentService;
        this.baseUrl = this.configService.urlConFig.URLS.CONTENT_PREFIX;
        this.publicDataService = publicDataService;
        this.uploadService = uploadservice;

    }

    /**
     * Create content Id for the editor
     * @param req OBJECT
     */
    create(req): Observable<ServerResponse> {
        const option = {
            url: this.configService.urlConFig.URLS.CONTENT.CREATE,
            data: {
                'request': req
            }
        };
        return this.contentService.post(option);
    }

    uploadUrl(req, contentId: string): Observable<ServerResponse> {
        const option = {
            url: `${this.configService.urlConFig.URLS.CONTENT.UPLOADURL}/${contentId}`,
            data: {
                'request': req
            }
           };
           console.log('option ', option);
           return this.uploadService.post(option);
    }
    upload(req, contentId: string): Observable<ServerResponse> {
        const formdata = new FormData();
      formdata.append('fileUrl', req);
      formdata.append('mimeType', 'application/pdf');
        const option = {
            url: `${this.configService.urlConFig.URLS.CONTENT.UPLOAD}/${contentId}`,
            // formdata: formdata
           };
           console.log('option ', option);
           return this.uploadService.posting(option, formdata);
    }

   update(req, contentId: string): Observable<ServerResponse> {
       const option = {
        url: `${this.configService.urlConFig.URLS.CONTENT.UPDATE}/${contentId}`,
        data: {
            'request': req
        }
       };
       return this.contentService.patch(option);
   }


    /**
     * get content details by id and query param
     */
    getContent(contentId: string, option: any = { params: {} }): Observable<ServerResponse> {
        const param = { fields: this.configService.editorConfig.DEFAULT_PARAMS_FIELDS };
        const req = {
            url: `${this.configService.urlConFig.URLS.CONTENT.GET}/${contentId}`,
            param: { ...param, ...option.params }
        };
        return this.publicDataService.get(req).pipe(map((response: ServerResponse) => {
            return response;
        }));
    }

    getOwnershipType() {
        const formServiceInputParams = {
            formType: 'content',
            subType: 'all',
            formAction: 'ownership',
            rootOrgId: this.userService.userProfile.rootOrgId
        };
        return this.workspaceService.getFormData(formServiceInputParams).pipe(
            map(data => {
                return _.get(data, 'result.form.data.fields[0].ownershipType') ?
                data.result.form.data.fields[0].ownershipType : ['createdBy'];
            }), catchError(error => {
                return of(['createdBy']);
            })
        );
    }
}
