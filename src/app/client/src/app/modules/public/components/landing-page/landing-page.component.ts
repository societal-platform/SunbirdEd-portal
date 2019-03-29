import { Component, OnInit } from '@angular/core';
import { UserService, PermissionService } from '../../../core/services';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { ConfigService, IUserData } from '@sunbird/shared';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  providers: [NgbCarouselConfig]
})
export class LandingPageComponent implements OnInit {
  workSpaceRole: Array<string>;
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
   this.userService.userData$.subscribe(
      (user: IUserData) => {
        if (user && !user.err) {
          this.userRole = user.userProfile.userRoles;
          console.log('userprofile', this.userRole);
        }
      });
// this.userRole = this.userService.userProfile.userRoles;
   console.log('log in ', this.userService.loggedIn);
  }

}
