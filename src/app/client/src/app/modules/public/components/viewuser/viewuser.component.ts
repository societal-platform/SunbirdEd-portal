import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { ConfigService, IUserData } from '@sunbird/shared';
import { UserService, LearnerService, PublicDataService  } from '@sunbird/core';
import * as _ from 'lodash';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResourceService, ToasterService, RouterNavigationService, ServerResponse } from '@sunbird/shared';
import {Router, ActivatedRoute} from '@angular/router';
import { UserSearchServicePublicService  } from '../../services/searchService/user-search-service-public.service';
import { element, componentRefresh } from '@angular/core/src/render3/instructions';
import { BlobsOptions } from 'fine-uploader/lib/core';
@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.css'],
  providers: [NgbModal]
})
export class ViewuserComponent implements OnInit {
  @ViewChild('modal') modal;

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
  modalRef: any;
  selectedOrgName: string;
  roles = [
    { name: 'CONTENT_CREATOR'},
    { name: 'BOOK_CREATOR' },
    { name: 'CONTENT_REVIEWER' },
    { name: 'TEACHER_BADGE_ISSUER' }
  ];
  selectedOrgUserRoles = [];
  selectedOrgUserRolesNew: any = [];
  condition = false;
  count: number;
  userUniqueId: any;
  orgId: any;
  userDetail: any;
  roleforUser: any;
  updaterole: any[];
  ref: HTMLElement;
  constructor(
    public configService: ConfigService,
    public userService: UserService,
    public learnerService: LearnerService,
    public publicdataService: PublicDataService,
    public toasterService: ToasterService,
    private modalService: NgbModal,
    public router: Router,
    public userSearchService: UserSearchServicePublicService,
    public resourceService: ResourceService,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getUsersList();
    this.roleforUser = [];
  }
  editRoles(role, userRoles, event, userId) {
    console.log(role, userRoles, event, userId);
 userRoles.forEach((element1, value) => {

 if (element1.id === userId) {
  if (element1.roles.includes(role) === true) {
    console.log(element1.roles);
    this.selectedOrgUserRoles[value].roles = element1.roles.filter((selectedRole) => {
      console.log(selectedRole, role);
      return selectedRole !== role;
    });

  } else {
    if (event.target.checked === true) {
      this.selectedOrgUserRolesNew.push(role);
console.log('else', this.selectedOrgUserRolesNew);
    } else {
      this.selectedOrgUserRolesNew.splice(this.selectedOrgUserRolesNew.indexOf(role));
      console.log('else else', this.selectedOrgUserRolesNew);
    }
  } this.updaterole = this.selectedOrgUserRoles;
  console.log('ceßßß', this.selectedOrgUserRoles, this.updaterole);
 }
 }
 );
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
              userorgid = userorg.organisationId;
              // console.log('org detail', this.existingUserRoles);
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
              const roles = {
                id: user.id,
                roles: this.existingUserRoles,

            };
            this.selectedOrgUserRoles.push(roles);
            console.log('selected user ifd', this.selectedOrgUserRoles);
              this.userIds.push(userid);
            }
          });
        });
        // this.iterate();
      });
    });
  }

  updateRoles(roles, userIds, userRoles) {
const rolesUnique = _.uniqWith(roles, _.isEqual);
console.log('unique', rolesUnique, this.selectedOrgUserRoles, this.updaterole);
    if (this.selectedOrgUserRolesNew) {
      this.selectedOrgUserRolesNew.forEach((Newroles) => {
        this.selectedOrgUserRoles.forEach(user => {
          if (userIds === user.id) {
            user.roles.push(Newroles);
          }
        });
      });
      const mainRole = [];
      const mainRolesCollections = _.clone(this.roles);
      _.forEach(mainRolesCollections, (value, key) => {
        mainRole.push(value.name);
      });

      this.selectedOrgUserRoles.forEach(element1 => {
  console.log('role', rolesUnique, 'id', userIds, 'lenth', this.selectedOrgUserRoles.length,
   this.selectedOrgUserRoles, 'element length', rolesUnique.length, this.existingUserRoles.lenth);
  console.log('elemetid', element1.id , 'user id', userIds, 'userroles', userRoles);
  if (element1.id === userIds ) {
    element1.roles.forEach(oldRole => {
      if (userRoles.includes(oldRole)) {
        console.log('in]side check if', oldRole);
        if (oldRole !== 'PUBLIC') {
          this.roleforUser.push(oldRole);
console.log('1', this.roleforUser);
        } else {
          this.roleforUser.push(oldRole);
          console.log('2', this.roleforUser);
        }
      }
    }); }
  // } else if (element1.length > this.selectedOrgUserRoles.length) {
  //   console.log('second if');
  //  this.roleforUser.push(element1, 'PUBLIC');
  // }
});
this.roleforUser = Array.from(new Set(this.roleforUser));
console.log('new role', this.roleforUser);
      const option = { userId: userIds , orgId: this.orgId, roles: this.roleforUser };
      console.log('user Id in update', option);
      // this.updateRoles(roles, userIds, userRoles);
      this.userSearchService.updateRoles(option).subscribe(
        (apiResponse: ServerResponse) => {
          console.log(' in update', apiResponse);
          this.toasterService.success(this.resourceService.messages.smsg.m0028);
this.userIds = [];
   this.gottoCancel();
        },
        err => {
          this.selectedOrgUserRoles = _.difference(this.selectedOrgUserRoles, this.selectedOrgUserRolesNew);
          this.toasterService.error(this.resourceService.messages.emsg.m0005);
          // this.redirect();
        }
      );
    }
    this.selectedOrgUserRoles = [];

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
    this.learnerService.post(option).subscribe(
      data => {
        console.log(data);
        this.toasterService.success('user deleted successfully');
        this.userIds = [];
        this.goToUsers();
      },
      err => {
        this.toasterService.error(err.error.params.errmsg);
      }
    );
  }

  openLg(content) {
    console.log(content);
  this.modalRef = this.modalService.open(content, { size: 'sm' , centered: true});
  console.log(this.modalRef);
  }

  goToUsers() {
    console.log('cancel');
setTimeout(() => {
  this.userIds = [];
      this.router.navigate(['/viewuser']);
      this.ngOnInit();
}, 500);
  }
  gottoCancel() {

    setTimeout(() => {
      this.userIds = [];
      this.router.navigate(['/viewuser']);
      this.ngOnInit();
    }, 2000);
    this.modalRef.close();
  }

}
