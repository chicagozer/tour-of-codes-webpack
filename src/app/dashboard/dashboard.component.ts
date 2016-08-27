import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Code } from '../code';
import { CodeService } from '../code.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  codes: Code[] = [];

  constructor(
    private router: Router,
    private codeService: CodeService) {
  }

  ngOnInit(): void {
    this.codeService.getCodes()
      .subscribe(codes => this.codes = codes.slice(1, 5));
  }

  gotoDetail(code: Code): void {
    let link = ['/detail', code.id];
    this.router.navigate(link);
  }
}
