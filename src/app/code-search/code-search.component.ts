import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { CodeSearchService } from './code-search.service';
import { Code } from '../code';

@Component({
  selector: 'code-search',
  templateUrl: 'code-search.component.html',
  styleUrls: ['code-search.component.css'],
  providers: [CodeSearchService]
})
export class CodeSearchComponent implements OnInit {
  codes: Observable<Code[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private codeSearchService: CodeSearchService,
    private router: Router) { }

  search(term: string): void {
    // Push a search term into the observable stream.
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.codes = this.searchTerms
      .debounceTime(300)        // wait for 300ms pause in events
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time
        // return the http search observable
        ? this.codeSearchService.search(term)
        // or the observable of empty codes if no search term
        : Observable.of<Code[]>([]))
      .catch(error => {
        // TODO: real error handling
        console.log(error);
        return Observable.of<Code[]>([]);
      });
  }

  gotoDetail(code: Code): void {
    let link = ['/detail', code.id];
    this.router.navigate(link);
  }
}
