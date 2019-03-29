
import { of as observableOf, throwError as observableThrowError, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ServerResponse, RequestParam, HttpOptions } from '@sunbird/shared';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import * as moment from 'moment';
import * as _ from 'lodash';

/**
 * Service to provide base CRUD methods to make api request.
 *
 */
@Injectable()
export class DataService {
  /**
   * Contains rootOrg Id
   */
  rootOrgId: string;
  /**
   * Contains channel Id
   */
  channelId: string;
   /**
   * Contains appId
   */
  appId: string;
  /**
   * Contains devoce Id
   */
  deviceId: string;
  /**
   * Contains base Url for api end points
   */
  baseUrl: string;
  /**
   * angular HttpClient
   */
  http: HttpClient;
  /**
   * Constructor
   * @param {HttpClient} http HttpClient reference
   */
  constructor(http: HttpClient) {
    this.http = http;
  }

  /**
   * for making get api calls
   *
   * @param requestParam interface
   */
  get(requestParam: RequestParam): Observable<ServerResponse> {
    const httpOptions: HttpOptions = {
      headers: requestParam.header ? requestParam.header : this.getHeader(),
      params: requestParam.param
    };

    return this.http.get(this.baseUrl + requestParam.url, httpOptions).pipe(
      mergeMap((data: ServerResponse) => {
        if (data.responseCode !== 'OK') {
          return observableThrowError(data);
        }
        return observableOf(data);
      }));
  }

  /**
   * for making post api calls
   *
   * @param {RequestParam} requestParam interface
   *
   */
  post(requestParam: RequestParam): Observable<ServerResponse> {
    const httpOptions: HttpOptions = {
      headers: requestParam.header ? this.getHeader(requestParam.header) : this.getHeader(),
      params: requestParam.param
    };
    return this.http.post(this.baseUrl + requestParam.url, requestParam.data, httpOptions).pipe(
      mergeMap((data: ServerResponse) => {
        console.log('data ', data);
        if (data.responseCode !== 'OK') {
          return observableThrowError(data);
        }
        return observableOf(data);
      }));
  }
  posting(requestParam: RequestParam, formdata): Observable<ServerResponse> {
    const httpOptions: HttpOptions = {
      headers: requestParam.header ? this.getHeaderForm(requestParam.header) : this.getHeaderForm(),
      params: requestParam.param
    }; console.log('base url', this.baseUrl);

    return this.http.post(this.baseUrl + requestParam.url, formdata, ).pipe(
      mergeMap((data: ServerResponse) => {
        console.log('data ', data);
        if (data.responseCode !== 'OK') {
          return observableThrowError(data);
        }
        return observableOf(data);
      }));
  }
  /**
   * for making patch api calls
   *
   * @param {RequestParam} requestParam interface
   *
   */
  patch(requestParam: RequestParam): Observable<ServerResponse> {
    const httpOptions: HttpOptions = {
      headers: requestParam.header ? requestParam.header : this.getHeader(),
      params: requestParam.param
    };
  const config = {
      enctype: 'multipart/form-data',
      processData: false,
      contentType: false,
      cache: false
  };

    return this.http.patch(this.baseUrl + requestParam.url, requestParam.data, httpOptions).pipe(
      mergeMap((data: ServerResponse) => {
        if (data.responseCode !== 'OK') {
          return observableThrowError(data);
        }
        return observableOf(data);
      }));
  }

  /**
   * for making delete api calls
   * @param {RequestParam} requestParam interface
   */
  delete(requestParam: RequestParam): Observable<ServerResponse> {
    const httpOptions: HttpOptions = {
      headers: requestParam.header ? requestParam.header : this.getHeader(),
      params: requestParam.param,
      body: requestParam.data
    };
    return this.http.delete(this.baseUrl + requestParam.url, httpOptions).pipe(
      mergeMap((data: ServerResponse) => {
        if (data.responseCode !== 'OK') {
          return observableThrowError(data);
        }
        return observableOf(data);
      }));
  }
put(requestParam): Observable<ServerResponse> {
  console.log('put', requestParam);
  const httpOptions: HttpOptions = {
    headers: requestParam.header ? requestParam.header : this.getHeaderFormUrl(),
    params: requestParam.param,
  };
  return this.http.put(requestParam.url, requestParam.fileList, httpOptions)
  .pipe(
    mergeMap((data: ServerResponse) => {
      return observableOf(data);
    }));
}
  /**
   * for preparing headers
   */
  private getHeader(headers?: HttpOptions['headers']): HttpOptions['headers'] {
    const default_headers = {
      'Accept': 'application/json',
      // 'X-Consumer-ID': 'X-Consumer-ID',
      'X-Source': 'web',
      'ts': moment().format(),
      'X-msgid': UUID.UUID()
    };
    try {
      this.deviceId = (<HTMLInputElement>document.getElementById('deviceId')).value;
      this.appId = (<HTMLInputElement>document.getElementById('appId')).value;
    } catch (err) { }
    if (this.deviceId) {
      default_headers['X-Device-ID'] = this.deviceId;
    }
    if (this.rootOrgId) {
      default_headers['X-Org-code'] = this.rootOrgId;
    }
    if (this.channelId) {
      default_headers['X-Channel-Id'] = this.channelId;
    }
    if (this.appId) {
      default_headers['X-App-Id'] = this.appId;
    }
    if (headers) {
      return { ...default_headers, ...headers };
    } else {
      return { ...default_headers };
    }
  }


  private getHeaderFormUrl(headers?: HttpOptions['headers']): HttpOptions['headers'] {
    // const default_headers = {
    //   'enctype:': 'multipart/form-data',
    //   // 'X-Consumer-ID': 'X-Consumer-ID',
    //   'X-Source': 'web',
    //   'ts': moment().format(),
    //   'X-msgid': UUID.UUID()

    // };
    const config = {
      processData: false,
            headers: {
          'x-ms-blob-type': 'BlockBlob'
      },
      contentType: 'application/pdf',
  };
  //   const config = {
  //     enctype: 'multipart/form-data',
  //     processData: false,
  //     contentType: false,
  //     cache: false,
  //     'ts': moment().format(),
  //     'X-msgid': UUID.UUID()

  // };
    try {
      this.deviceId = (<HTMLInputElement>document.getElementById('deviceId')).value;
      this.appId = (<HTMLInputElement>document.getElementById('appId')).value;
    } catch (err) { }
    if (this.deviceId) {
      config['X-Device-ID'] = this.deviceId;
    }
    if (this.rootOrgId) {
      config['X-Org-code'] = this.rootOrgId;
    }
    if (this.channelId) {
      config['X-Channel-Id'] = this.channelId;
    }
    if (this.appId) {
      config['X-App-Id'] = this.appId;
    }
    if (headers) {
      return { ...config, ...headers };
    } else {
      return { ...config };
    }
  }
  private getHeaderForm(headers?: HttpOptions['headers']): HttpOptions['headers'] {
    // const default_headers = {
    //   'enctype:': 'multipart/form-data',
    //   // 'X-Consumer-ID': 'X-Consumer-ID',
    //   'X-Source': 'web',
    //   'ts': moment().format(),
    //   'X-msgid': UUID.UUID()

    // };
    const config = {
      enctype: 'multipart/form-data',
      processData: false,
      contentType: false,
      cache: false,
      'ts': moment().format(),
      'X-msgid': UUID.UUID()

  };
    try {
      this.deviceId = (<HTMLInputElement>document.getElementById('deviceId')).value;
      this.appId = (<HTMLInputElement>document.getElementById('appId')).value;
    } catch (err) { }
    if (this.deviceId) {
      config['X-Device-ID'] = this.deviceId;
    }
    if (this.rootOrgId) {
      config['X-Org-code'] = this.rootOrgId;
    }
    if (this.channelId) {
      config['X-Channel-Id'] = this.channelId;
    }
    if (this.appId) {
      config['X-App-Id'] = this.appId;
    }
    if (headers) {
      return { ...config, ...headers };
    } else {
      return { ...config };
    }
  }
}
