import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentService } from '@sunbird/core';
import { ConfigService , NavigationHelperService} from '@sunbird/shared';
import { BadgesService } from '../../../core/services/badges/badges.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent implements OnInit {
  public activatedRoute: ActivatedRoute;
  public configService: ConfigService;
  public contentService: ContentService;
  public contentId;
  public route: Router;
  assetDetail: any;
  sanitizer: any;
  showLoader = true;
  loaderMessage = 'Loading pdf please wait';
  constructor(activated: ActivatedRoute, sanitizers: DomSanitizer,
    config: ConfigService, contentServe: ContentService , rout: Router, public navigationHelperService: NavigationHelperService,
    ) {
      this.activatedRoute = activated;
      this.activatedRoute.url.subscribe(url => {
        this.contentId = url[1].path;
      });
      this.configService = config;
      this.contentService = contentServe;
      this.sanitizer = sanitizers;
      this.showLoader = true;

    }

  ngOnInit() {

    const req = {
      url: `${this.configService.urlConFig.URLS.CONTENT.GET}/${this.activatedRoute.snapshot.params.contentId}`,
    };
    this.contentService.get(req).subscribe(data => {
      console.log('read contents', data);
      this.assetDetail = this.sanitizer.bypassSecurityTrustResourceUrl(data.result.content.artifactUrl);
      this.showLoader = false;
    });
    this.checkForPreviousRouteForRedirect();
  }
  checkForPreviousRouteForRedirect() {
    const previousUrlObj = this.navigationHelperService.getPreviousUrl();
    console.log('pre', previousUrlObj);
    if (previousUrlObj && previousUrlObj.url && (previousUrlObj.url !== '/myassets')) {
      // this.redirect();
    }
  }


}
