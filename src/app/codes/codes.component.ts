import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Code } from '../code';
import { CodeService } from '../code.service';

@Component({
  selector: 'my-codes',
  templateUrl: 'codes.component.html',
  styleUrls: ['codes.component.css']
})
export class CodesComponent implements OnInit {
  codes: Code[];
  selectedCode: Code;
  addingCode = false;
  error: any;

  constructor(
    private router: Router,
    private codeService: CodeService) { }

  getCodes(): void {
    this.codeService
      .getCodes()
      .subscribe(codes => this.codes = codes);
  }

  addCode(): void {
    this.addingCode = true;
    this.selectedCode = null;
  }

  close(savedCode: Code): void {
    this.addingCode = false;
    if (savedCode) { this.getCodes(); }
  }

  deleteCode(code: Code, event: any): void {
    event.stopPropagation();
    this.codeService
      .delete(code)
      .then(res => {
        this.codes = this.codes.filter(h => h !== code);
        if (this.selectedCode === code) { this.selectedCode = null; }
      })
      .catch(error => this.error = error);
  }

  ngOnInit(): void {
    this.getCodes();
  }

  onSelect(code: Code): void {
    this.selectedCode = code;
    this.addingCode = false;
  }

  gotoDetail(code: Code): void {
    this.router.navigate(['/detail', code.id]);
  }
}
