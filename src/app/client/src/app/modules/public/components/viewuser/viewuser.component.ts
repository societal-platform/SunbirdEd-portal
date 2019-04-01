import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ConfigService } from '@sunbird/shared';
import { UserService, LearnerService, PublicDataService } from '@sunbird/core';
import * as _ from 'lodash';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResourceService, ToasterService, RouterNavigationService, ServerResponse } from '@sunbird/shared';
import {Router, ActivatedRoute} from '@angular/router';
import { UserSearchServicePublicService  } from '../../services/searchService/user-search-service-public.service';
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
  modalRef: any;
  selectedOrgName: string;
  roles = [
    { name: 'CONTENT_CREATOR'},
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
    public resourceService: ResourceService,
    public activatedRoute: ActivatedRoute
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
        this.userIds = [];
        this.goToUsers();
      },
      err => {
        this.toasterService.error(err);
      }
    );
  }

  openLg(content) {
    console.log(content);
  this.modalRef = this.modalService.open(content, { size: 'lg' });
  console.log(this.modalRef);
  }
  goToUsers() {
setTimeout(() => {
  this.router.navigate(['/viewuser']);
this.ngOnInit();
}, 500);
  }
  gottoCancel() {
    this.modalRef.close();
    setTimeout(() => {
      this.router.navigate(['/viewuser']);
      this.ngOnInit();
    }, 300);
  }

}
