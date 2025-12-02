import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-out',
  standalone: false,
  templateUrl: './sign-out.component.html',
  styleUrl: './sign-out.component.scss'
})
export class SignOutComponent implements OnInit {
  constructor(private _router: Router) {
  }
  ngOnInit(): void {}
}
