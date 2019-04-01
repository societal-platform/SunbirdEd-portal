import { Component, OnInit } from '@angular/core';
import { UserService, PermissionService } from '../../../core/services';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { ConfigService, IUserData } from '@sunbird/shared';
import * as _ from 'lodash';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  providers: [NgbCarouselConfig]
})
export class LandingPageComponent implements OnInit {
  public contents = [
   {
     role: 'CONTENT_CREATOR',
     data: [ 'As a Content Creator, you can use the SPace to accomplish the following:',
     // tslint:disable-next-line:max-line-length
     ' - Search and Discover Assets: You can discover assets - Knowledge, Process, Software, Hardware, Data - that you would like to leverage for your Mission. Go to Shared Assets.',
      // tslint:disable-next-line:max-line-length
     ' - Add an Asset: You can add information about an asset that you like to share with others in the ecosystem. You can also edit, delete and publish your assets. Go to My Assets.'
    ]
   },
   {
    role: 'CONTENT_REVIEWER',
    data: [
      'As a Reviewer , you can use the SPace to accomplish the following:',
       // tslint:disable-next-line:max-line-length
      '- Search, Discover and Review Assets: You can discover assets - Knowledge, Process, Software, Hardware, Data - that you would like to Badge. Go to Shared Assets.',
           ]
  },
  {
    role: 'ORG_ADMIN',
    data: [
      'As a Organization Admin, you can use the SPace to accomplish the following:',
       // tslint:disable-next-line:max-line-length
      '- Search and Discover Assets: You can discover assets - Knowledge, Process, Software, Hardware, Data - that you would like to leverage for your Mission. Go to Shared Assets.',
      '- Add User: You can add users and assign required roles to a specific user. Go to Add User.'
    ]
  },
  {
    role: 'TEACHER_BADGE_ISSUER',
    data: [
      'As a Badge Issuer, you can use the SPace to accomplish the following:',
       // tslint:disable-next-line:max-line-length
      '- Search, Discover and Badge Assets: You can discover assets - Knowledge, Process, Software, Hardware, Data - that you would like to Badge. Go to Shared Assets.',
           ]
  },
  ];

  workSpaceRole: Array<string>;
  public userContents = [];
  public configService: ConfigService;
  userlogged;
  images = [1, 2, 3].map(() => `../../.../../../../../assets/images/banner_bg.jpg${Math.random()}`);
  public userService: UserService;
  public permissionService: PermissionService;
  showNavigationArrows = false;
  showNavigationIndicators = false;
  userRole: any;
  constructor( userService: UserService , config: NgbCarouselConfig, permissionService: PermissionService,
    configService: ConfigService) {
      this.configService = configService;
    this.userService = userService;
    this.permissionService = permissionService;
    this.workSpaceRole = this.configService.rolesConfig.headerDropdownRoles.workSpaceRole;
  }

  ngOnInit() {

this.getUserRoles();
// this.userRole = this.userService.userProfile.userRoles;
   console.log('log in ', this.userService.loggedIn);
  }
getUserRoles() {
 this.userService.userData$.subscribe(
    (user: IUserData) => {
      if (user && !user.err) {
        this.userRole = user.userProfile.userRoles;
        console.log('userprofile', this.userRole);
      }
    });

}
}
