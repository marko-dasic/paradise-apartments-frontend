import { Component, OnInit } from '@angular/core';
import { CONTACT } from 'src/app/constants/contact';

@Component({
  selector: 'app-our-services',
  templateUrl: './our-services.component.html',
  styleUrls: ['./our-services.component.css']
})
export class OurServicesComponent implements OnInit {
    
    tel: string;

    ngOnInit(): void {
      this.tel = CONTACT.PHONE;
    }

}
