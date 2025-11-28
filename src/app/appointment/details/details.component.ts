import {Component, inject, Input} from '@angular/core';
import {AppointmentDto} from '../../core/models/dto/appointment-dto';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-details',
  standalone: false,
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  @Input() appointmentDetails!: AppointmentDto;
  activeModal = inject(NgbActiveModal);
}
