import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {

  companysData: any[] = [
    {
      icon: "assets/images/job/Circleci.svg",
      name: "CircleCi",
      service: "Internet Services"
    },
    {
      icon: "assets/images/job/Mg.svg",
      name: "Mg",
      service: "Internet Services"
    },
    {
      icon: "assets/images/job/Twilio.svg",
      name: "Twilio",
      service: "Internet Services"
    },
    {
      icon: "assets/images/job/Udemy.svg",
      name: "Udemy",
      service: "Internet Services"
    },
    {
      icon: "assets/images/job/Webhooks.svg",
      name: "Webhooks",
      service: "Internet Services"
    },
    {
      icon: "assets/images/job/Discord.svg",
      name: "Discord",
      service: "Internet Services"
    },
    {
      icon: "assets/images/job/Eslint.svg",
      name: "Eslint",
      service: "Internet Services"
    },
    {
      icon: "assets/images/job/Gitlab.svg",
      name: "Gitlab",
      service: "Internet Services"
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
