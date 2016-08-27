import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { Code } from '../code';

@Injectable()
export class CodeSearchService {
  constructor(private http: Http) { }

  search(term: string): Observable<Code[]> {
    return this.http
      .get(`app/codes/?name=${term}`)
      .map((r: Response) => r.json().data as Code[]);
  }
}
