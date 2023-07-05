import { Component, Input, OnInit } from '@angular/core';
import { Company } from '../../../core/models/company.model';

@Component({
  selector: 'app-company-card',
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.scss']
})
export class CompanyCardComponent implements OnInit {

  @Input() company!: Company;

  constructor() { }

  ngOnInit(): void {
  }
}
