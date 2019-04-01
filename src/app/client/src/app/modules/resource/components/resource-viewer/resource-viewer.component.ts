import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentService } from '@sunbird/core';
import { ConfigService } from '@sunbird/shared';
import { BadgesService } from '../../../core/services/badges/badges.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-resource-viewer',
  templateUrl: './resource-viewer.component.html',
  styleUrls: ['./resource-viewer.component.scss']
})
export class ResourceViewerComponent implements OnInit {
  public activatedRoute: ActivatedRoute;
  public configService: ConfigService;
  public contentService: ContentService;
  public contentId;
  public route: Router;
  assetDetail: any;
  sanitizer: any;
  showLoader = true;
  loaderMessage = 'Loading pdf please wait';
  path: string;
  constructor(activated: ActivatedRoute, sanitizers: DomSanitizer,
    config: ConfigService, contentServe: ContentService , private rout: Router) {
      this.activatedRoute = activated;
      this.activatedRoute.url.subscribe(url => {
        this.contentId = url[1].path;
      });
      this.configService = config;
      this.contentService = contentServe;
      this.sanitizer = sanitizers;
      this.showLoader = true;
      this.route = rout

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
  }
  navigateToDetailsPage() {
    console.log('params', this.activatedRoute)
    this.activatedRoute.url.subscribe(url => {
      console.log('url', url)
      this.path = url[2].path;
      });
      console.log('path', this.path)
      this.route.navigate(['resources/play/content', this.path])
  }
  
}
