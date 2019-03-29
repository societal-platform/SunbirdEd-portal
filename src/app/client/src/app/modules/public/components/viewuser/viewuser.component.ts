import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ConfigService } from '@sunbird/shared';
import { UserService, LearnerService, PublicDataService } from '@sunbird/core';
import * as _ from 'lodash';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResourceService, ToasterService, RouterNavigationService, ServerResponse } from '@sunbird/shared';
import {Router} from '@angular/router';
import { UserSearchServicePublicService  } from '../../services/user-search-service-public.service';
@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.css'],
  providers: [NgbModal]
})
export class ViewuserComponent implements OnInit {
  userIds = [];
  assignRole = false;
  selectedvalue;
  selectedid;
  show = false;
  userroles = [];
  existingUserRoles;
  role = [];
  uniqueRoles = [];
  finalRoles = [];
  selectedOrgName: string;

  roles = [
    { name: 'CONTENT_CREATOR' },
    { name: 'BOOK_CREATOR' },
    { name: 'CONTENT_REVIEWER' },
    { name: 'TEACHER_BADGE_ISSUER' }
  ];
  selectedOrgUserRoles: Array<string>;
  selectedOrgUserRolesNew: any = [];
  condition = false;

  count: number;
  userUniqueId: any;
  orgId: any;
  userDetail: any;
  constructor(
    public configService: ConfigService,
    public userService: UserService,
    public learnerService: LearnerService,
    public publicdataService: PublicDataService,
    public toasterService: ToasterService,
    private modalService: NgbModal,
    public router: Router,
    public userSearchService: UserSearchServicePublicService,
    public resourceService: ResourceService
  ) {}

  ngOnInit() {
    this.getUsersList();

  }
  editRoles(role, userRoles, event) {
    console.log(role, userRoles, event);
    if (userRoles.includes(role) === true) {
      console.log(userRoles);
      this.selectedOrgUserRoles = this.selectedOrgUserRoles.filter((selectedRole) => {
        console.log(selectedRole, role);
        return selectedRole !== role;
      });
      console.log(this.selectedOrgUserRoles);
    } else {
      if (event.target.checked === true) {
        this.selectedOrgUserRolesNew.push(role);
console.log('else', this.selectedOrgUserRolesNew);
      } else {
        this.selectedOrgUserRolesNew.splice(this.selectedOrgUserRolesNew.indexOf(role));
        console.log('else else', this.selectedOrgUserRolesNew);
      }
    }
  }
  getUsersList() {
    const option = {
      url: this.configService.urlConFig.URLS.ADMIN.USER_SEARCH,
      data: {
        request: {
          query: this.userService.rootOrgId,
          filters: {
            createdBy: this.userService.userid
          }
        }
      }
    };
    this.learnerService.post(option).subscribe(data => {
      const response = data.result;
      console.log('res', response);
      let userorgid;
      let userorgName;
      _.forOwn(response, content => {
        _.forEach(content, value => {
          _.forEach(value, user => {
            userorgName = user.userName;
            // console.log('user Detail', user);
            this.userDetail = user;
            _.forEach(user.organisations, (userorg: any) => {

              this.existingUserRoles = userorg.roles;
              this.selectedOrgUserRoles = this.existingUserRoles;
              userorgid = userorg.organisationId;
              console.log('org detail', this.existingUserRoles);
            });
            if (user.organisations.length > 0) {

              this.userUniqueId = user.id;
              this.orgId = userorgid;
              console.log('user', user, this.orgId);
              const userid = {
                id: user.id,
                organisationId: userorgid,
                organisationName: userorgName,
                firstName: user.firstName,
                provider: this.userService.rootOrgId,
                roles: this.existingUserRoles,
                status: user.status
              };
              this.userIds.push(userid);
            }
          });
        });
        // this.iterate();
      });
    });
  }

  iterate() {
    this.userIds.forEach(element => {
      this.selectedOrgUserRoles = element.roles;
      console.log('iterate', this.selectedOrgUserRoles);

    });
//     let objt;
//     console.log('iterate');
//     this.roles.forEach(element => {
//       this.existingUserRoles.forEach(element1 => {
//         // console.log('roles ', element.name,'exiting ',element1);

//         if(element.name === element1 ) {
//           let key =true;
//         // console.log('first if',element1);
//           objt = {
//             role: element1,
//             key: key
//           }
// this.role.push(objt);
//         }
//         if(element.name != element1 ) {
//           // console.log('second if',element1)
//           let value = false;
//           objt = {
//             role: element1,
//             key: value
//           }
// this.role.push(objt);
//         }
//       });
//     });
  //   // console.log('role', this.role);
  //   this.uniqueRoles = _.uniqWith(this.role,_.isEqual);
  // //  this.finalRoles = _.uniq(this.userroles,'role')
  // this.finalRoles = Array.from(this.uniqueRoles.reduce((m, t) => m.set(t.role, t), new Map()).values());
  //   console.log('unique',this.finalRoles);
  }
  updateRoles(roles, userId) {
    if (this.selectedOrgUserRolesNew) {
      this.selectedOrgUserRolesNew.forEach((Newroles) => {
        roles.push(Newroles);
      });
      const mainRole = [];
      const mainRolesCollections = _.clone(this.roles);
      _.forEach(mainRolesCollections, (value, key) => {
        mainRole.push(value.name);
      });

      const option = { userId: userId , orgId: this.orgId, roles: roles };
      console.log('user Id in update', option);
      this.userSearchService.updateRoles(option).subscribe(
        (apiResponse: ServerResponse) => {
          console.log(' in update', apiResponse);
          this.toasterService.success(this.resourceService.messages.smsg.m0028);
          this.goBackToCoursePage();
        },
        err => {
          this.selectedOrgUserRoles = _.difference(this.selectedOrgUserRoles, this.selectedOrgUserRolesNew);
          this.toasterService.error(this.resourceService.messages.emsg.m0005);
          // this.redirect();
        }
      );
    }
  }
  deleteUser(user) {
    const option = {
      url: this.configService.urlConFig.URLS.ADMIN.REMOVE_USER,
      data: {
        request: {
          userId: user.id,
          organisationId: user.organisationId,
          userName: user.firstName,
          provider: user.provider,

        }
      }
    };
    this.publicdataService.post(option).subscribe(
      data => {
        console.log(data);
        this.toasterService.success('user deleted successfully');

        this.goBackToCoursePage();
      },
      err => {
        this.toasterService.error(err);
      }
    );
  }
  goBackToCoursePage() {
    // setTimeout(() => {
    //   window.location.reload();
    // }, 500);
    // this.router.navigate(['/viewuser']);
    location.reload();
  }
  openLg(content) {

    this.modalService.open(content, { size: 'lg' });
  }
  gottoCancel() {
    console.log('in redirect');
    this.router.navigate(['/viewuser']);
  }




  // updateUser(user, role) {
  //   console.log('inside update');
  //   this.existingUserRoles.forEach(element => {
  //     this.userroles.push(element);
  //     console.log(element,'check');
  //   });
  // console.log('key', this.userroles);
  //   _.forEach(role.value, (value, key) => {
  //      if(value) {
  //       this.userroles.push(key);
  //       console.log('key', key,value,this.userroles);
  //      }
  //   });
  //   const option = {
  //     url: this.configService.urlConFig.URLS.ADMIN.UPDATE_USER_ORG_ROLES,
  //     data: {
  //       request: {
  //         userId: user.id,
  //         organisationId: user.organisationId,
  //         roles: this.userroles
  //       }
  //     }
  //   };
  //   console.log('public', option);
  //   this.publicdataService.post(option).subscribe(
  //     data => {
  //       this.toasterService.success('user role updated successfully');
  //       // this.goBackToCoursePage();
  //     },
  //     err => {
  //       this.toasterService.error(err);
  //     }
  //   );
  // }



}
