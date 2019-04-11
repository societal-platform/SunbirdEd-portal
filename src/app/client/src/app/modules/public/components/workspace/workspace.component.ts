import { Component, OnInit } from '@angular/core';
import { PermissionService, UserService } from '@sunbird/core';
import { Subscription } from 'rxjs';
import { IUserData, IUserProfile} from '@sunbird/shared';
@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {
 public permissionService: PermissionService;
 userDataSubscription: Subscription;
 public userService: UserService;
 userProfile: IUserProfile;
 adminDashboard: Array<string>;

  constructor(permissionService: PermissionService, userService: UserService) {
    this.permissionService = permissionService;
    this.userService = userService;
  }

  ngOnInit() {
    this.userDataSubscription = this.userService.userData$.subscribe(
      (user: IUserData) => {
        if (user && !user.err) {
          this.userProfile = user.userProfile;
        }
      });
  }

}
