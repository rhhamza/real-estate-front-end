import { Component, Input, OnInit } from '@angular/core';
import { Company } from '../../../core/models/company.model';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-company-card',
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.scss']
})
export class CompanyCardComponent implements OnInit {
  public id?: string;


  @Input() company!: Company;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    
  }
}
