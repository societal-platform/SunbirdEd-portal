import { Injectable } from '@angular/core';
import { ConfigService, RequestParam, ServerResponse, HttpOptions } from '@sunbird/shared';
import { LearnerService } from '@sunbird/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageSectionService {

  constructor(public configService: ConfigService, public learnerService: LearnerService) { }
  createPageSection(req) {
    const httpOptions: RequestParam = {
      url: this.configService.urlConFig.URLS.ADMIN.PAGE,
      data: req
    };
    console.log('inside servise page', httpOptions);
    return this.learnerService.post(httpOptions);
  }
 updatePage(req) {
  const httpOptions: RequestParam = {
    url: this.configService.urlConFig.URLS.ADMIN.UPDATE_PAGE,
    data: req
  };
  console.log('update page', httpOptions);
  return this.learnerService.patch(httpOptions);
 }
 updatePageSection(req) {
  const httpOptions: RequestParam = {
    url: this.configService.urlConFig.URLS.ADMIN.UPDATE_PAGE_SECTION,
    data: req
  };
  console.log('update page', httpOptions);
  return this.learnerService.patch(httpOptions);
 }
}
