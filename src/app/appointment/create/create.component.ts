import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AppointmentService} from '../../core/services/appointment.service';
import {Router} from '@angular/router';
import { getDateInStringFormat } from '../../core/util/date-util';


@Component({
  selector: 'app-create',
  standalone: false,
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent implements OnInit {
  newAppointmentFormGroup!: FormGroup;

  constructor(private _appointmentService: AppointmentService,
              private _router: Router) {}
    ngOnInit(): void {
      this.newAppointmentFormGroup = new FormGroup({
        provinceId: new FormControl('', [Validators.required]),
        cityId: new FormControl('', [Validators.required]),
        branchId: new FormControl('', [Validators.required]),
        appointmentDate: new FormControl(null, [Validators.required]),
        slotId: new FormControl(''),
        description: new FormControl('', [Validators.maxLength(500)])
      });
    }
    onSubmit = () => {
     if(this.newAppointmentFormGroup.valid) {
       let newAppointmentFormGroupValue = this.newAppointmentFormGroup.value;
       let newAppointment = {
         branchId: newAppointmentFormGroupValue.branchId,
         slotId: newAppointmentFormGroupValue.slotId,
         description: newAppointmentFormGroupValue.description,
         appointmentDate: getDateInStringFormat(newAppointmentFormGroupValue.appointmentDate)
       };
       console.log(newAppointment);
       this._appointmentService.createAppointment(newAppointment).subscribe({
         next: (response) => {
           if(response.success) {
             this._router.navigate(['/appointment/list']);
           }
           console.log(response.message);
         }
       })
     }
    }
}
