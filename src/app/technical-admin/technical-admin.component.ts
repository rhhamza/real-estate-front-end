import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventData } from 'ngx-event-calendar/lib/interface/event-data';

export const testData: EventData[] = [
  { id: 20, title: 'Match', desc: 'BL Match',
  startDate: new Date("2019-11-22T21:00:00"), endDate: new Date("2019-11-26T23:00:00"), createdBy: 'Mark',
  createdAt: new Date("2019-11-10T10:00:00"), type: 2, color: 'red' },
  { id: 12, title: 'Meeting', desc: 'Meeting test',
  startDate: new Date("2019-11-19T13:43:00"), endDate: new Date("2019-11-23T15:00:00"), createdBy: 'Mark',
  createdAt: new Date("2019-11-10T10:00:00"), type: 2, color: 'green' },
  { id: 14, title: 'Exam meggyesalmásfahéjaskalács lkgdhaslgdshal kghdsl kghdslkahsdlidg', desc: 'Exam test',
  startDate: new Date("2019-11-22T15:00:00"), endDate: new Date("2019-11-22T16:00:00"), createdBy: 'Dora',
  createdAt: new Date("2019-11-10T10:00:00"), type: 1, color: 'orange' },
  { id: 104, title: 'Training', desc: 'Morning running asdfasdfds',
  startDate: new Date("2019-11-22T08:10:00"), endDate: new Date("2019-11-22T09:00:00"), createdBy: 'Dora',
  createdAt: new Date("2019-11-10T10:00:00"), type: 1, color: 'gray' },
  { id: 18, title: 'Coffe', desc: 'Coffe with friend',
  startDate: new Date("2019-11-22T07:00:00"), endDate: new Date("2019-11-22T07:20:00"), createdBy: 'Dora',
  createdAt: new Date("2019-11-10T10:00:00"), type: 1, color: 'purple' },
  { id: 20, title: 'Football match', desc: 'Barcelona - Chelsea',
   startDate: new Date("2019-11-06T20:00:00"), endDate: new Date("2019-11-06T22:00:00"), createdBy: 'Tom',
   createdAt: new Date("2019-11-05T20:00:00"), type: 2, color: 'lightgray' },
  { id: 17, title: 'Holiday', desc: 'Travel',
   startDate: new Date("2019-11-08T20:00:00"), endDate: new Date("2019-11-12T12:00:00"), createdBy: 'Tom',
   createdAt: new Date("2019-11-06T20:00:00"), type: 2, color: '#5bda5b' },
  { id: 114, title: 'Meeting', desc: 'Meeting test',
   startDate: new Date("2019-09-28T20:00:00"), endDate: new Date("2019-11-05T20:00:00"), createdBy: 'Mark',
   createdAt: new Date("2019-05-20T20:00:00"), type: 2, color: 'cornflowerblue' },
  { id: 19, title: 'Training', desc: 'Running',
   startDate: new Date("2019-11-08T20:00:00"), endDate: new Date("2019-11-08T22:00:00"), createdBy: 'Tom',
   createdAt: new Date("2019-11-20T10:00:00"), type: 2, color: 'orange' },
   { id: 21, title: 'Training', desc: 'Football',
   startDate: new Date("2019-11-30T20:00:00"), endDate: new Date("2019-12-08T22:00:00"), createdBy: 'Tom',
   createdAt: new Date("2019-11-20T10:00:00"), type: 2, color: 'orange' },
];

@Component({
  selector: 'app-technical-admin',
  templateUrl: './technical-admin.component.html',
  styleUrls: ['./technical-admin.component.scss']
})
export class TechnicalAdminComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  dataArray: EventData[] = testData;

  selectDay(event: any) {
    console.log(event);
  }
  

  logout() {
    localStorage.removeItem('userId')
    localStorage.removeItem('accessToken')
    this.router.navigate([''])
  }
}
