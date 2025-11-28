import {Component, Inject, OnInit} from '@angular/core';
import {AppointmentService} from '../../core/services/appointment.service';
import {APP_CONFIG_TOKEN, AppConfig} from '../../core/models/app-config';
import {AppointmentDto} from '../../core/models/dto/appointment-dto';
import {PagedResult} from '../../core/models/paged-result';
import {SlotDto} from '../../core/models/dto/slot-dto';
import {AppointmentStatus} from '../../core/constants/app-constants';
import { SweetAlertService } from '../../core/services/sweet-alert.service';
import {AuthService} from '../../core/services/auth/auth.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DetailsComponent} from '../details/details.component';

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
  canConfirmBooking!: boolean;
  constructor(private _appointmentService: AppointmentService,
              @Inject(APP_CONFIG_TOKEN) appConfig: AppConfig,
              private _sweetAlertService: SweetAlertService,
              private _authService: AuthService,
              private _modalService: NgbModal) {
    this.pageSize = appConfig.defaultUiSettings.pageSize;
    this.canConfirmBooking = this._authService.isUser || this._authService.isAdmin;
  }
  ngOnInit(): void {
    this.loadAppointments(this.currentPage, this.pageSize);
  }

  loadAppointments = (pageNo: number, pageSize: number) => {
    this._appointmentService.getPaginatedAppointments(pageNo, pageSize).subscribe({
      next: (response) => {
        this.pagedAppointmentResult = response;
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
  cancelStatusModal = (appointment: AppointmentDto) => {
    this._sweetAlertService.confirmationDialogWithMessage(`Please provide a reason for booking cancellation with reference no: ${appointment.referenceNo}`, 'Cancel', 'Confirm')
      .then((result) => {
        if(result.isConfirmed) {
         this.updateStatus(appointment, AppointmentStatus.BOOKING_CANCELLED, result.value);
        }
      });
  }
  updateStatus = (appointment:AppointmentDto, status: string, reason?: string) => {
    const updateStatus = {
      id: appointment.id,
      status: status,
      reason: reason
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
  hideButton = (appointment: AppointmentDto, statuses: string[]) => {
    if(statuses.includes(appointment.status)) {
      return "d-none";
    }
    return "";
  }
  openDetailsModal = (appointment: AppointmentDto) => {
    console.log(appointment);
    const modalRef = this._modalService.open(
      DetailsComponent,
      {
        size: "lg"
      }
    );
    modalRef.componentInstance.appointmentDetails = appointment;
  }
  protected readonly AppointmentStatus = AppointmentStatus;
}
