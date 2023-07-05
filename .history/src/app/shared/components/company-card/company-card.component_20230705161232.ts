import { Component, Input, OnInit } from '@angular/core';
import { Company } from '../../../core/models/company.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-company-card',
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.scss']
})
export class CompanyCardComponent implements OnInit {

  @Input() company!: Company;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
}
