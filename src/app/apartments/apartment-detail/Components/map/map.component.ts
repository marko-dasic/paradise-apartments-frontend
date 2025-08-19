import { AfterViewInit, Component, ElementRef, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent  implements OnInit{
  @Input() mapString: string;
  @Input() street: string;
  @Input() streetNum: string;
  safeString: SafeHtml;
  lines: any[] = [
    {
      icon:"fa-solid fa-right-to-bracket",
      text:"Prijavljivanje od 14:00 do 22:00.",
    },
    {
      icon:"fa-solid fa-right-from-bracket",
      text:"Odjavljivanje do 11:00.",
    },
    {
      icon:"fa-solid fa-children",
      text:"Deca uzrasta 4 godine i starija se u ovom objektu smatraju odraslima. Krevetac za dete mladje od 3 godine je besplatan.",
    },
    {
      icon:"fa-solid fa-ban-smoking",
      text:"Pušenje nije dozvoljeno.",
    },
    {
      icon:"fa-solid fa-champagne-glasses",
      text:"Zabave/događaji nisu dozvoljeni",
    },
    {
      icon:"fa-regular fa-moon",
      text:"Gosti treba da budu tihi između 22.00 i 08.00.",
    },

  ]
  constructor(private sanitizer: DomSanitizer,private elementRef: ElementRef){}

  
  ngOnInit(): void {
    this.safeString =  this.sanitizer.bypassSecurityTrustHtml(this.mapString);

  }



  

}
