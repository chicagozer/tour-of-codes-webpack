import { Injectable } from '@angular/core';
import {  Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

import { Code } from './code';

@Injectable()
export class CodeService {
  private codesUrl = 'http://localhost:10080/api/client/v1/kv/ATTENDANCE_STATUS';  // URL to web api
  private options: RequestOptions = null;


  constructor(private http: Http) {
    let myheaders = new Headers();

    myheaders.set('Content-Type', 'application/json;charset=UTF-8');
    myheaders.set('Authorization', 'Basic ' + btoa('vdms' + ':' + 'password'));

    this.options = new RequestOptions({ headers: myheaders, body: "", withCredentials: true  })
  }
  /*

   getCodes(): Observable<Person[]>{
   let people$ = this.http
   .get(`${this.baseUrl}/people`, {headers: this.getHeaders()})
   .map(mapPersons);
   return people$;
   }*/


  getCodesP(): Promise<Code[]> {
    return this.http
      .get(this.codesUrl)
      .toPromise()
      .then(response =>
        Object.keys(response.json()).map( (data, index) =>
          ({ id: index, name: data, value: response.json()[data] })
        )
      )

      .catch(this.handleError);
  }

  getCodes(): Observable<Code[]> {
    return this.http
      .get(this.codesUrl, this.options)
      .map(response =>
        Object.keys(response.json()).map( (data, index) =>
          ({ id: index, name: data, value: response.json()[data] })
        )
      );
  }



  getCode(id: number): Observable<Code> {
    return this.getCodes()
      .map(codes => codes.find(code => code.id === id));
  }

  save(code: Code): Promise<Code> {
    if (code.name) {
      return this.put(code);
    }
    return this.post(code);
  }

  delete(Code: Code): Promise<Response> {


    let url = `${this.codesUrl}/${Code.name}`;

    return this.http
      .delete(url, this.options)
      .toPromise()
      .catch(this.handleError);
  }

  // Add new Code
  private post(Code: Code): Promise<Code> {


    return this.http
      .post(this.codesUrl, JSON.stringify(Code), this.options)
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  // Update existing Code
  private put(Code: Code): Promise<Code> {


    let url = `${this.codesUrl}/${Code.name}`;

    return this.http
      .put(url, JSON.stringify(Code), this.options)
      .toPromise()
      .then(() => Code)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
