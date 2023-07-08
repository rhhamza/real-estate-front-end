import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs';
import { NotifierService } from 'angular-notifier';
import { Appointment } from 'src/app/core/models/Appointment.model';
import { AppointmentService } from 'src/app/core/services/appointment.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    events: [],
  };
appointments: Appointment[] = []
selectedEvent: any; 
modalContent: any;
modalRef: NgbModalRef | undefined;
constructor(
private appointmentService: AppointmentService,
public modalService: NgbModal,
private notifier: NotifierService,
) { }

ngOnInit(): void {

this.readAppointments()
}

handleDateClick(arg: any) {
alert('date click! ' + arg.dateStr);
}

readAppointments() {
  const userId = localStorage.getItem('userId');
  this.appointmentService.getAllAppointments().subscribe((filteredResponse: Appointment[]) => {
    let events: any = [];
    filteredResponse.map((app: Appointment) => {
      let obj = {
        title: app.title,
        start: app.dateDebut,
        end: app.dateFin,
        id: app.idAppointment,
      };
      
      events.push(obj);
    });
    this.calendarOptions.events = events;
  });
}

showEventDetails(event: any ,content: any) {
const appointmentId = event.event.id;
console.log(appointmentId);
this.appointmentService.getAppointment(appointmentId).subscribe(
  (response: Appointment) => {
    
    this.selectedEvent = {
    id: response.idAppointment,
    title: response.title,
    dateDebut: response.dateDebut,
    dateFin: response.dateFin,
    MeetingLink: response.meetingLink,
   
    };
    console.log(this.selectedEvent)
    this.openModal(content);
    console.log(response)
    console.log('Start Date:', this.selectedEvent.start);
    console.log('datedebut:', this.selectedEvent.dateDebut);
    console.log('datedebut:', this.selectedEvent.dateFin);
  },
  (error: any) => {
    console.error(error);
  }
);
}


openModal(content: any) {
this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' });
}
closeModal(): void {
this.modalService.dismissAll();
}
updateAppointment() {
if (this.selectedEvent && this.selectedEvent.id) {
  
  this.appointmentService.updateAppointment(this.selectedEvent.id, this.selectedEvent).subscribe(
    (response: Appointment) => {
      // Handle the successful update
      console.log('Appointment updated:', response);
      // Close the modal or perform any other actions
      this.modalService.dismissAll()
      this.notifier.notify(
        'success',
        'Appointment succesfully Added'
      );
      // Reload appointments
      this.readAppointments();
  
    },
    (error: any) => {

      // Handle the error 
      console.log('Appointment updated:');
      console.error('Update error:', error);
      this.modalService.dismissAll()
      this.readAppointments();
    }
  );
}
}
deleteAppointment() {
if (this.selectedEvent && this.selectedEvent.id) {
  this.appointmentService.deleteAppointment(this.selectedEvent.id).subscribe(

    (data) => {
      console.log(data)
      // Handle the successful deletion
      console.log('Appointment deleted');
      // Close the modal
      this.modalService.dismissAll()
      this.notifier.notify(
        'success',
        'Appointment succesfully Added'
      );
      
      // Reload appointments
      this.readAppointments();
    }, (err => {
      console.log(err)
     
      this.modalService.dismissAll()
      this.readAppointments();
      
    })
  );
}
}
}
