import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-response-message',
  standalone: false,
  templateUrl: './response-message.component.html',
  styleUrl: './response-message.component.scss'
})
export class ResponseMessageComponent {
  @Input() public success!: boolean;
  @Input() public message!: string;
}
