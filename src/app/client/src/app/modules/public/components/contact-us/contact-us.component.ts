import { Component, OnInit } from '@angular/core';
import {  ConfigService, ServerResponse, ToasterService, IUserData} from '@sunbird/shared';
import { PublicDataService, UserService, LearnerService } from '@sunbird/core';
import {ConfigureService } from '../../services/configure/configure.service';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  alert = false;
  public userServie: UserService;
  user: any;
  country: any;
  constructor(public configService: ConfigService,  public publicDataService: PublicDataService,
   public dataService: ConfigureService, public tosterservice: ToasterService, public router: Router,
   userService: UserService, public learnSerive: LearnerService) {
     this.userServie = userService;
   }
email: any;
name: any;
org: any;
message: any;
userData: any;
userName: any;
userEmail: any;
orgName: any;
// contactform = document.getElementById('contactform');
private _success = new Subject<string>();

staticAlertClosed = false;
successMessage: string;

  ngOnInit() {
    this.userServie.userData$.subscribe(
      (user: IUserData) => {
        this.user = user.userProfile;
        this.userName = this.user.firstName;
        this.userEmail = this.user.email;
        this.orgName = this.user.rootOrg.orgName;
      console.log('user info', this.userServie.loggedIn);
    });
  }

  gotoContact() {
    // console.log('form data', formdata);
    const data = $('#contactform').serializeArray();
    console.log('form', data);
    this.sendNotification(data);
  }
  sendNotification(data1) {
    console.log('in func', data1);
    data1.forEach(element => {
   if (element.name === 'name') {
   this.name = element.value;
   }
   if (element.name === 'email') {
    this.email = element.value;
   }
   if (element.name === 'org') {
    this.org = element.value;
   }
   if (element.name === 'message') {
      this.message = element.value;
   }
   if (element.name === 'country') {
    this.country = element.value;
 }
    });
    this.userData = 'Name: ' + this.name + '<br>' + 'Email Id: ' + this.email + '<br>' +
    'Organization Name: ' + this.org + '<br>' + 'Country: ' + this.country + '<br>' + 'Message: ' + this.message;
   const body = {
    request: {

      subject: this.dataService.dataConfig.contactsubject,

      body: this.dataService.dataConfig.body + '<br>' + this.userData,

      orgImgUrl: this.dataService.dataConfig.orgImgUrl,

      emailTemplateType: this.dataService.dataConfig.contacttemplate,

      fromEmail: this.dataService.dataConfig.fromEmail,

      recipientEmails: this.dataService.dataConfig.email

  }
   };

      const req = {
        url: `${this.configService.urlConFig.URLS.FEEDBACK.EMAIL}`,
        data: body
      };
      this.learnSerive.post(req).subscribe( (data: ServerResponse) => {
        this.alert = !this.alert;
        this.tosterservice.success('Thanks for Contacting Us. We will get back to you very soon.');
  return data;
      });


  }


}
