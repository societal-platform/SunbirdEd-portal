import { Component, OnInit, Input } from '@angular/core';
import { ResourceService } from '@sunbird/shared';
import { Router } from '@angular/router';
import { UserService } from '../../services';
@Component({
  selector: 'app-footer',
  templateUrl: './main-footer.component.html',
  styleUrls: ['./main-footer.component.css']
})
export class MainFooterComponent implements OnInit {
  /**
   * reference of resourceService service.
   */
  public resourceService: ResourceService;
  /*
  Date to show copyright year
  */
  date = new Date();
  /*
  Hide or show footer
  */
  showFooter = true;
  padding;
  constructor(resourceService: ResourceService ,  public router: Router,
    public userService: UserService) {
    this.resourceService = resourceService;
  }

  ngOnInit() {
if (this.userService.loggedIn) {
this.padding = true;
}
  }
  gotoContact(value) {
    if ( value === 'contact') {
    this.router.navigate(['contactUs']);
    }
    if ( value === 'license') {
    this.router.navigate(['license']);
    }
    if ( value === 'people') {
    this.router.navigate(['people']);
    }
  }
}
