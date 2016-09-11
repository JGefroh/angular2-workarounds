import { Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class JGHttp {
  private headers = new Headers({'Content-Type': 'application/json'});
  constructor(public http: Http, public config: JGHttpConfig) {}


  private baseUrl(): string {
    return this.config.webServiceBase + '/' + this.config.resourceNamePlural;
  }

  private collectionsUrl(): string {
    return this.baseUrl();
  }

  private memberUrl(id): string {
    return this.baseUrl() + (id ? `/${encodeURIComponent(id)}` : '');
  }

  private wrapPayload(resource): any {
    let payload = {};
    payload[this.config.resourceNameSingular] = resource;
    return payload;
  }

  index(params?): Promise<any> {
    let options = new RequestOptions({
      headers: this.headers,
      search: new URLSearchParams(params)
    });
    return this.http.get(this.collectionsUrl(), options).toPromise()
                      .then(this.convertBodyToJson)
  }

  show(id): Promise<any> {
    let options = new RequestOptions({
      headers: this.headers
    });
    return this.http.get(this.memberUrl(id), options).toPromise()
                      .then(this.convertBodyToJson);
  }

  get(id): Promise<any> {
    return this.show(id);
  }

  create(resource, params?): Promise<any> {
    let options = new RequestOptions({
      headers: this.headers,
      search: new URLSearchParams(params)
    });
    return this.http.post(this.collectionsUrl(), this.wrapPayload(resource), options).toPromise()
                      .then(this.convertBodyToJson);
  }

  update(resource, params?): Promise<any> {
    let options = new RequestOptions({
      headers: this.headers,
      search: new URLSearchParams(params)
    });
    return this.http.post(this.memberUrl(resource.id), this.wrapPayload(resource), options).toPromise()
                      .then(this.convertBodyToJson);
  }

  delete(resource): Promise<any> {
    let options = new RequestOptions({
      headers: this.headers
    });
    return this.http.delete(this.memberUrl(resource.id), options).toPromise()
                      .then(this.convertBodyToJson);
  }


  private convertBodyToJson(response): any {
    return response.json();
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}

export class JGHttpConfig {
  constructor(public webServiceBase:string, public resourceNameSingular: string, public resourceNamePlural: string) {

  }
}
