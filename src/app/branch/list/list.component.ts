import {Component, OnInit} from '@angular/core';
import {RepositoryService} from '../../core/services/repository.service';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  constructor(private _repo: RepositoryService) {
  }
  ngOnInit(): void {
    this.loadBranches();
  }

  loadBranches = () => {
    this._repo.getData('branch').subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
}
