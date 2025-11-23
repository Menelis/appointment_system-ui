import {Component, Inject, OnInit} from '@angular/core';
import {AppointmentService} from '../../core/services/appointment.service';
import {APP_CONFIG_TOKEN, AppConfig} from '../../core/models/app-config';
import {AppointmentDto} from '../../core/models/dto/appointment-dto';
import {PagedResult} from '../../core/models/paged-result';

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
              @Inject(APP_CONFIG_TOKEN) appConfig: AppConfig) {
    this.pageSize = appConfig.defaultUiSettings.pageSize;
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
}
