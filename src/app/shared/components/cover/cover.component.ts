import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.css']
})
export class CoverComponent {
  @Input() text: string = "PARADISE";
  @Input() subtext: string = "";
}
