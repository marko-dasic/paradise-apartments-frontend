import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {


    constructor(private metaService: Meta){}

    text: string = "PARADISE";
    subtext: string = "GDE GOD DA IDEŠ IDI PUNOG SRCA";
    ngOnInit(): void {
      this.metaService.updateTag({ name: 'keywords', content: 'Paradise, apartmani, smestaj, povoljni apartmani, o paradise' });
      this.metaService.updateTag({ name: 'description', content: 'Paradise Apartmani - Lux usluga po pristupačnoj ceni. Pregledajte celokupnu ponudu naših apartmana i po Vašoj meri. Najbolje lokacije u gradu, svaki apartman je smešten na u blizini sveg najboljeg što Beograd nudi!' });
    }
}
