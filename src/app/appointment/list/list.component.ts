import {Component, Inject, OnInit} from '@angular/core';
import {AppointmentService} from '../../core/services/appointment.service';
import {APP_CONFIG_TOKEN, AppConfig} from '../../core/models/app-config';
import {AppointmentDto} from '../../core/models/dto/appointment-dto';
import {PagedResult} from '../../core/models/paged-result';
import {SlotDto} from '../../core/models/dto/slot-dto';
import {AppointmentStatus} from '../../core/constants/app-constants';
import { SweetAlertService } from '../../core/services/sweet-alert.service';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  pageSize!: number;
  currentPage = 1;
  pagedAppointmentResult!: PagedResult<AppointmentDto[]>;
  constructor(private _appointmentService: AppointmentService,
              @Inject(APP_CONFIG_TOKEN) appConfig: AppConfig,
              private _sweetAlertService: SweetAlertService) {
    this.pageSize = appConfig.defaultUiSettings.pageSize;
  }
  ngOnInit(): void {
    this.loadAppointments(this.currentPage, this.pageSize);
  }

  loadAppointments = (pageNo: number, pageSize: number) => {
    this._appointmentService.getPaginatedAppointments(pageNo, pageSize).subscribe({
      next: (response) => {
        this.pagedAppointmentResult = response;
        console.log(this.pagedAppointmentResult);
      },
      error: (error) => {}
    });
  }

  onPageSelectChange = (pageNumber: number) => {
    this.loadAppointments(pageNumber, this.pageSize)
  }

  updateStatusModal = (appointment:AppointmentDto, status: string)=> {
    this._sweetAlertService.confirmationDialog('Booking Confirmation',`Are you sure you want to confirm the booking with reference no: ${appointment.referenceNo} ?`)
      .then((result) => {
        if(result.isConfirmed) {
          this.updateStatus(appointment, status);
        }
      });
  }
  updateStatus = (appointment:AppointmentDto, status: string) => {
    const updateStatus = {
      id: appointment.id,
      status: status
    };
    this._appointmentService.updateAppointmentStatus(updateStatus).subscribe({
      next: (response) => {
        if(response.success) {
          this._sweetAlertService.showSuccessMessage('Booking Confirmation', response.message);
          return;
        }
        this._sweetAlertService.showFailureMessage('Booking Confirmation', response.message);
      },
      error: (error) => {}
    });
  }



  getSlotFormatedString = (slot?: SlotDto) => {
    return slot == null ? 'Any time' : `${slot.slotStart} - ${slot.slotEnd}`;
  }
  hideButton = (appointment: AppointmentDto, status: string) => {
    if(appointment.status === status) {
      return "d-none";
    }
    return "";
  }
  protected readonly AppointmentStatus = AppointmentStatus;
}
