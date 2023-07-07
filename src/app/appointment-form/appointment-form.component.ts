import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AppointmentService } from '../core/services/appointment.service';
import { IAppointment } from '../core/interfaces/AppointmentInterface';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss']
})
export class AppointmentFormComponent implements OnInit {
  AppoitmentForm!: FormGroup;
  submitted = false;
  offerId= this.activateRoute.snapshot.paramMap.get('offer');

  constructor(private fb: FormBuilder,  private appointmentService: AppointmentService, private activateRoute: ActivatedRoute) {
    this.AppoitmentForm = this.fb.group({
      title: ['', Validators.required],
      discrition: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required,this.dateFinValidator()],
      meetingLink: ['', Validators.required],
      online: [false, Validators.required],
      location: [''],
    });
  }


  ngOnInit(): void {

      this.AppoitmentForm.get('online')?.valueChanges.subscribe((value) => {
      if (value) {
        // If online is checked, clear the location field
        this.AppoitmentForm.get('location')!.setValue('');
      }
    });
  
  }
  get f() { return this.AppoitmentForm?.controls; }

  onSubmit() {
      this.submitted = true;
      console.log(this.AppoitmentForm.value);
      
      if (this.AppoitmentForm?.invalid) {
          return;
      }

      let body = {
        ...this.AppoitmentForm.value,
        propertyOffer: { id: this.offerId ? parseInt(this.offerId) : 0 },
        user: { id: 1 }
      }

      this.appointmentService.createAppointment(body).subscribe((response: IAppointment) => {
        this.submitted = false;
        this.AppoitmentForm.reset();
        setTimeout(() => {
          // Do something after the form submission
        }, 2000);
        console.log(this.AppoitmentForm.value);
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

}
