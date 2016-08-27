import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Code } from '../code';
import { CodeService } from '../code.service';

@Component({
  selector: 'my-code-detail',
  templateUrl: 'code-detail.component.html',
  styleUrls: ['code-detail.component.css']
})
export class CodeDetailComponent implements OnInit {
  @Input() code: Code;
  @Output() close = new EventEmitter();
  error: any;
  navigated = false; // true if navigated here

  constructor(
    private codeService: CodeService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        let id = +params['id'];
        this.navigated = true;
        this.codeService.getCode(id)
          .subscribe(code => this.code = code);
      } else {
        this.navigated = false;
        this.code = new Code();
      }
    });
  }

  save(): void {
    this.codeService
      .save(this.code)
      .then(code => {
        this.code = code; // saved code, w/ id if new
        this.goBack(code);
      })
      .catch(error => this.error = error); // TODO: Display error message
  }

  goBack(savedCode: Code = null): void {
    this.close.emit(savedCode);
    if (this.navigated) { window.history.back(); }
  }
}
