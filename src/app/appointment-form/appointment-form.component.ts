import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AppointmentService } from '../core/services/appointment.service';
import { IAppointment } from '../core/interfaces/AppointmentInterface';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { UserService } from '../core/services/user.service';
@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss']
})
export class AppointmentFormComponent implements OnInit {
  AppoitmentForm!: FormGroup;
  isOnline = false;
  submitted = false;
  offerId= this.activateRoute.snapshot.paramMap.get('offer');
  userId = localStorage.getItem('userId') || null

  constructor(private fb: FormBuilder, 
     private appointmentService: AppointmentService, 
    private activateRoute: ActivatedRoute, 
    private notifier: NotifierService,
    
    ) {
    this.AppoitmentForm = this.fb.group({
      title: ['', Validators.required],
      discrition: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required,this.dateFinValidator()],
      meetingLink: [''],
      online: [this.isOnline, Validators.required],
      location: [{ value: '', disabled:false }]
    });
  }


 ngOnInit(): void {
  console.log(this.isOnline)
  /* 

    this.AppoitmentForm.get('online')?.valueChanges.subscribe((value) => {
      const locationControl = this.AppoitmentForm.get('location');
      if (value) {
        // If online is checked, disable the location control and clear its value
        locationControl?.disable();
        locationControl?.setValue('');
      } else {
        // If online is not checked, enable the location control
        locationControl?.enable();
      }
    });*/
  }
  get f() { return this.AppoitmentForm?.controls; }

  onSubmit() {
      this.submitted = true;
      console.log(this.AppoitmentForm.value);
      console.log(this.isOnline);
      
      if (this.AppoitmentForm?.invalid) {
          return;
      }

      let body = {
        ...this.AppoitmentForm.value,
        online:this.isOnline,
      
        propertyOffer: { id: this.offerId ? parseInt(this.offerId) : 0 },
        user:{id: this.userId},
      }

      this.appointmentService.createAppointment(body).subscribe((response: IAppointment) => {
        this.submitted = false;
        this.AppoitmentForm.reset();
        setTimeout(() => {
          // Do something after the form submission
        }, 2000);
        console.log(this.offerId)
        
        console.log(this.AppoitmentForm.value);
        this.notifier.notify(
          'success',
          'Appointment succesfully Added'
        );
      }, err => {
        this.notifier.notify(
          'error',
          err.error.message
        );
      });
    }
  dateFinValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const dateDebut = this.AppoitmentForm.get('dateDebut')?.value;
      const dateFin = control.value;

      if (dateDebut && dateFin) {
        const diffInMillis = new Date(dateFin).getTime() - new Date(dateDebut).getTime();
        const diffInHours = diffInMillis / (1000 * 60 * 60);

        if (diffInHours <= 0 || diffInHours > 1) {
          return { rangeInvalid: true };
        }
      }

      return null;
    };
  }

  toggleOnline() {
    this.isOnline = !this.isOnline;
  console.log(this.isOnline)
    if (!this.isOnline) {
      this.AppoitmentForm.get('location')?.setValue('');
    }
  }



}
