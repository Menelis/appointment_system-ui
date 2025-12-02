import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-callback',
  standalone: false,
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.scss'
})
export class CallbackComponent implements OnInit, OnDestroy {


  constructor(private _router: Router) {
  }
  ngOnInit(): void {
  }
  ngOnDestroy(): void {
  }
}
