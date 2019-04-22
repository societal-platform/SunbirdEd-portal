import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ResourceService, ToasterService, ServerResponse } from '@sunbird/shared';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrgManagementService } from '../../services';
import { IUserUploadStatusResponse, IOrgUploadStatusResponse } from '../../interfaces';
import { IInteractEventInput, IImpressionEventInput, IInteractEventEdata, IInteractEventObject } from '@sunbird/telemetry';
import { UserService } from '@sunbird/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ConfigService } from '../../../shared/services';
import { PageSectionService } from '../../services/pageSection/page-section.service';
import { NgbDatepickerNavigationSelect } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';
/**
 * This component helps to display the success/failure response given by the api based on the process id entered
 *
 */
@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit, OnDestroy {
  @ViewChild('modal') modal;
  /**
* reference for ActivatedRoute
*/
  public activatedRoute: ActivatedRoute;
  /**
* Contains status response
*/
  statusResponse: IUserUploadStatusResponse | IOrgUploadStatusResponse;
  /**
* Contains process id
*/
  processId: string;

  isProcessCompleted: boolean;
  /**
* To show toaster(error, success etc) after any API calls
*/
  private toasterService: ToasterService;
  /**
* To call admin service which helps to upload csv file
*/
  public orgManagementService: OrgManagementService;
  /**
 * To show/hide loader
 */
  showLoader = false;
  /**
   * To call resource service which helps to use language constant
   */
  public resourceService: ResourceService;
  /**
 * status check form name
 */
  statusForm: FormGroup;
  /**
* Contains reference of FormBuilder
*/
  sbFormBuilder: FormBuilder;
  /**
* Contains redirect url
*/
  redirectUrl: string;
  /**
	 * telemetryImpression
	*/
  telemetryImpression: IImpressionEventInput;
  checkStatusInteractEdata: IInteractEventEdata;
  telemetryInteractObject: IInteractEventObject;
  public unsubscribe$ = new Subject<void>();
  orgId = [];
  orgName = [];
  sectionId: any;
  /**
* Constructor to create injected service(s) object
*
* Default method of DetailsComponent class
*
* @param {ResourceService} resourceService To call resource service which helps to use language constant
*/
  constructor(orgManagementService: OrgManagementService, private router: Router, formBuilder: FormBuilder, public config: ConfigService,
    toasterService: ToasterService, resourceService: ResourceService, activatedRoute: ActivatedRoute, public userService: UserService,
    public page: PageSectionService) {
    this.resourceService = resourceService;
    this.sbFormBuilder = formBuilder;
    this.orgManagementService = orgManagementService;
    this.toasterService = toasterService;
    this.activatedRoute = activatedRoute;
  }
  /**
 * This method is used to initialize the formbuilder and to validate process id form field
 */
  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      if (data.redirectUrl) {
        this.redirectUrl = data.redirectUrl;
      } else {
        this.redirectUrl = '/home';
      }
    });
    this.statusForm = this.sbFormBuilder.group({
      processId: ['', null]
    });
    // this.telemetryImpression = {
    //   context: {
    //     env: this.activatedRoute.snapshot.data.telemetry.env
    //   },
    //   edata: {
    //     type: this.activatedRoute.snapshot.data.telemetry.type,
    //     pageid: 'profile-bulk-upload-check-status',
    //     subtype: this.activatedRoute.snapshot.data.telemetry.subtype,
    //     uri: this.router.url
    //   }
    // };
    this.setInteractEventData();
  }
  /**
 * This method helps to redirect to the parent component
 * page, i.e, bulk upload page
 */
  public redirect() {
    this.processId = '';
    this.router.navigate([this.redirectUrl]);
  }
  /**
 * This method helps to fetch bulk upload status based on the given process id
 */
  getBulkUploadStatus(processId) {
    this.showLoader = true;
    if (!(/^\s+$/.test(this.statusForm.value.processId))) {
      this.orgManagementService.getBulkUploadStatus(this.statusForm.value.processId.trim()).pipe(
        takeUntil(this.unsubscribe$))
        .subscribe(
          (apiResponse: ServerResponse) => {
            console.log(apiResponse);
            this.showLoader = false;
            this.statusResponse = apiResponse.result.response[0];
            if (this.statusResponse.status && (this.statusResponse.status === 'COMPLETED')) {
              apiResponse.result.response.forEach(res => {
                res.successResult.forEach(data => {
                  console.log('data', data);
                  if (data.id) {
                  this.orgId.push(data.id);
                  this.orgName.push(data.orgName);
                  }
                });
              });
              console.log(this.orgId);
              console.log(this.orgName);
              this.isProcessCompleted = true;
              this.processId = this.statusResponse.processId;
              this.toasterService.success(this.resourceService.messages.smsg.m0032);
              this.pageSection();
            } else {
              // apiResponse.result.response.forEach(res => {
              //   res.successResult.forEach(data => {
              //     if (data.id) {
              //     this.orgId.push(data.id, data.orgName);
              //     }
              //   });
              // });
              this.isProcessCompleted = false;
              this.toasterService.info(this.resourceService.messages.imsg.m0040);
            }
          }, err => {
            this.showLoader = false;
            const errMsg = err.error.params.errmsg ? err.error.params.errmsg : this.resourceService.messages.fmsg.m0051;
            this.toasterService.error(errMsg);
          });
    } else {
      this.toasterService.error(this.resourceService.messages.stmsg.m0006);
      this.showLoader = false;
    }
  }
  /**
 * This method helps to get the status result from the api
 */
pageSection() {
  console.log('inside fubnc');
  const id = this.config.appConfig.Library.orgId;
  const name = this.config.appConfig.Library.orgName;
  id.forEach(identifier => {
    console.log('id', identifier);
    this.orgId.push(identifier);
  });
  name.forEach(na => {
    console.log('id', na);
    this.orgName.push(na);
  });
  console.log(this.orgId , this.orgName);
 const req = {
    'request': {
        'id': '01269009341042688043',
        'searchQuery': {
                   'request':
                   {
                       'query': '',
                       'filters':
                       {
                           'language': ['English'],
                           'contentType': ['Resource'],
                           'status': ['Live'],
                           'channel': this.orgId,
                           'organisation': this.orgName
                       },
                       'sort_by': {'me_averageRating': 'desc'},
                       'limit': 10
                       }
                       }
    }
};
  this.page.updatePageSection(req).subscribe((data) => {
    console.log('data res', data);
    this.sectionId = data.result.sectionId;
  }, err => {
    console.log('err', err);
    this.toasterService.error(err);
  });
}
// updatePage() {
//   const req = {
//     'request': {
//       'name': 'Resource',
//       'id': '0122838911932661768',
//       'portalMap': [
//           {
//               'id': this.sectionId,
//               'index': 1,
//               'group': 1
//           }
//       ],
//       'appMap': [
//           {
//               'id': this.sectionId,
//               'index': 1,
//               'group': 1
//           }
//       ]
//   }
//   };
//   console.log('req upadte', req);
//     this.page.updatePageSection(req).subscribe((apiResponse) => {
// console.log('response', apiResponse);
//   }, err => {
//     console.log('err', err);
//     this.toasterService.error(err);
//   });
// }
  getStatusResult(status) {
    return status;
  }
  ngOnDestroy() {
    this.modal.deny();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  setInteractEventData() {
    this.checkStatusInteractEdata = {
      id: 'upload-status',
      type: 'click',
      pageid: 'profile-read'
    };
    this.telemetryInteractObject = {
      id: this.userService.userid,
      type: 'user',
      ver: '1.0'
    };
  }
}
