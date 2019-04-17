import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
  } from '@angular/router';
  import { Observable, of, EMPTY } from 'rxjs';
  import { take, mergeMap, catchError} from 'rxjs/operators';
import { ConfigService } from '@sunbird/shared';
import { LearnerService} from '@sunbird/core';
@Injectable({
  providedIn: 'root'
})
export class ResolverService implements Resolve<any> {
   constructor( public config: ConfigService, public learnerService: LearnerService) { }
   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<never> {
    const option = {
      url: this.config.urlConFig.URLS.ADMIN.ORG_SEARCH,
      data: {
        'request': {
          'filters': {
            'rootOrgId': this.config.appConfig.ExplorePage.orgId[0]
          }
        }
        }
    };
console.log('resolver called', option);
    return this.learnerService.post(option);
   }
  }
