import { Component, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit,OnChanges {
  @Input() idToScroll:string;
  @ViewChild('crkve') crkveElement: ElementRef;
  @ViewChild('barovi') baroviElement: ElementRef;
  @ViewChild('muzeji') muzejiElement: ElementRef;
  @ViewChild('restorani') restoraniElement: ElementRef;
  currentMapRestoran: SafeHtml;
  ids: string[] = ['barovi','muzeji','restorani','crkve']; 

  mapaRestorani: string[] = [
    '<iframe class="google-map-belgrade" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2830.5884151311698!2d20.47781221138521!3d44.809575976757586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a7a98100da753%3A0x8a284aea0b3d1685!2sLorenzo%20%26%20Kakalamba!5e0!3m2!1sen!2srs!4v1703959836480!5m2!1sen!2srs"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    '<iframe class="google-map-belgrade"  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11321.22422756043!2d20.451311887158194!3d44.815329200000015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a7b46c70b43df%3A0x4f2a6d3146c002bf!2sPomodoro%20Vidin!5e0!3m2!1sen!2srs!4v1703959892914!5m2!1sen!2srs"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    '<iframe class="google-map-belgrade" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2830.8719949788388!2d20.47604671138488!3d44.80379727713897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a7a9e5410c769%3A0x8342be31f8551b96!2z0J7RgNCw0YjQsNGG!5e0!3m2!1sen!2srs!4v1703959913569!5m2!1sen!2srs" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    '<iframe class="google-map-belgrade" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11320.67209301423!2d20.45441957406986!3d44.8181415088565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a7ab04ef97847%3A0x28d774bcbf6bad61!2sRestoran%20Hanan!5e0!3m2!1sen!2srs!4v1703960028872!5m2!1sen!2srs" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    '<iframe class="google-map-belgrade" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2830.8719949788388!2d20.47604671138488!3d44.80379727713897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a7a9e5410c769%3A0x8342be31f8551b96!2z0J7RgNCw0YjQsNGG!5e0!3m2!1sen!2srs!4v1703959913569!5m2!1sen!2srs" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    '<iframe class="google-map-belgrade" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2830.113094075374!2d20.449791049919657!3d44.81926060188768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a654c8b97f287%3A0x75b6e88e257e6645!2zU25lxb5hbmE!5e0!3m2!1sen!2srs!4v1703960065479!5m2!1sen!2srs" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    '<iframe class="google-map-belgrade" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2829.978694836235!2d20.45659951138588!3d44.82199867593771!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a654ad707f4cd%3A0x66eb4635e10fd374!2sTrattoria%20Pepe!5e0!3m2!1sen!2srs!4v1703960094143!5m2!1sen!2srs" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    '<iframe class="google-map-belgrade" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2830.306617569951!2d20.455705711385495!3d44.815317776378684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a7ab3f5de6511%3A0x491b2f0ad6f6d082!2sRed%20Bread!5e0!3m2!1sen!2srs!4v1703960120006!5m2!1sen!2srs" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    '<iframe class="google-map-belgrade"  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2830.103052707996!2d20.450433311385776!3d44.819465176104906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a6535f23bda11%3A0xc1f0204133838173!2sKonoba%20Akustik%20-%20Stari%20Beograd!5e0!3m2!1sen!2srs!4v1703960153303!5m2!1sen!2srs" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    '<iframe class="google-map-belgrade" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2830.236922054686!2d20.46115271138561!3d44.81673777628499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a7bf65df9dbe9%3A0x33a2bfb2fd6707f0!2sZavi%C4%8Daj%20Skadarlija!5e0!3m2!1sen!2srs!4v1703960230615!5m2!1sen!2srs" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    '<iframe class="google-map-belgrade" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11325.368504811808!2d20.447982287158197!3d44.794215799999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a7100a2e23141%3A0xa52c6442a932ad65!2sNEBOJ%C5%A0A%20Restaurant%20(park%20entrance)!5e0!3m2!1sen!2srs!4v1703960380921!5m2!1sen!2srs" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    '<iframe class="google-map-belgrade" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7127.13142040944!2d20.405272090792643!3d44.82078325324159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a657a26b4e6b9%3A0xfb4054cfa32f729!2sDurmitor!5e0!3m2!1sen!2srs!4v1703960443238!5m2!1sen!2srs" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    '<iframe class="google-map-belgrade" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2830.0551656427074!2d20.445182111385858!3d44.820440776040506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a654f3ac3d8f7%3A0xa0f11ae9338cd482!2sCafe%20Lavash!5e0!3m2!1sen!2srs!4v1703960535830!5m2!1sen!2srs" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    '<iframe class="google-map-belgrade"  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11320.217024005802!2d20.437430474071792!3d44.8204593079384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a654b197d95db%3A0x3afdd8298aee54a!2sSmokvica%20-%20Kralja%20Petra!5e0!3m2!1sen!2srs!4v1703960579524!5m2!1sen!2srs" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    '<iframe class="google-map-belgrade" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2830.2983621778535!2d20.461416211385515!3d44.81548597636754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a7ab1a58c2059%3A0xea1d826682eab66d!2sRestoran%20Grme%C4%8D!5e0!3m2!1sen!2srs!4v1703960867580!5m2!1sen!2srs" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    '<iframe class="google-map-belgrade" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2830.316487688655!2d20.455521111385593!3d44.81511667639199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a7ab280a85c59%3A0x7db2314469b061b5!2sMikan%20Restaurant!5e0!3m2!1sen!2srs!4v1703960925276!5m2!1sen!2srs" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
  ]
  mapOfPubs: string[] = [
    '<iframe class="google-map-belgrade" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2830.868564927597!2d20.47898821138487!3d44.80386717713428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a7a9e9da2265f%3A0x29a5c5ce5ba25164!2sKafana%20Pavle%20Korcagin!5e0!3m2!1sen!2srs!4v1703960265327!5m2!1sen!2srs"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    '<iframe class="google-map-belgrade" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2830.9609687415214!2d20.488309811384795!3d44.80198407725854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a7a9cb462657d%3A0x12f504916efeabca!2sLimun%20%C5%BEut!5e0!3m2!1sen!2srs!4v1703960290261!5m2!1sen!2srs"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    '<iframe class="google-map-belgrade" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11320.755751802331!2d20.4524863!3d44.8177154!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a654daf0b1067%3A0x46f7b669e83f6f4f!2sZnak%20Pitanja%20(Question%20Mark)!5e0!3m2!1sen!2srs!4v1703960893759!5m2!1sen!2srs"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    '<iframe class="google-map-belgrade" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2830.1689328953375!2d20.462171211385776!3d44.81812297619359!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a7ab6b04577b7%3A0x86e4d0906b4b9805!2zVHJpIMWhZcWhaXJh!5e0!3m2!1sen!2srs!4v1703960950428!5m2!1sen!2srs"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    '<iframe class="google-map-belgrade" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2830.194966479546!2d20.461689211385654!3d44.817592576228556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a65a2f5c2410f%3A0x593b17952a814579!2sDva%20Jelena!5e0!3m2!1sen!2srs!4v1703960965323!5m2!1sen!2srs"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    '<iframe class="google-map-belgrade" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2830.2063143762493!2d20.463456111385604!3d44.81736137624376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a7ab1249efd8d%3A0x617b8c7db7f1b4db!2sJedno%20mesto!5e0!3m2!1sen!2srs!4v1703961125234!5m2!1sen!2srs"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    '<iframe class="google-map-belgrade" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2830.9324250189907!2d20.480171911384843!3d44.80256577722013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a7a9d149627c9%3A0x86de53634daae47c!2sJazbina!5e0!3m2!1sen!2srs!4v1703961156856!5m2!1sen!2srs"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
  ]
  constructor(private sanitizer: DomSanitizer,  private el: ElementRef, private renderer: Renderer2){}

  ngOnInit(): void {
    this.currentMapRestoran = null;
    
  }

  ngOnChanges(changes: SimpleChanges) 
  {
    
  }

  goToMap(type: string, id: number)
  {
    
    if(type == "restoran")
    {
      this.currentMapRestoran = this.sanitizer.bypassSecurityTrustHtml(this.mapaRestorani[id]);
    }
    else if(type == "kafana"){
      this.currentMapRestoran = this.sanitizer.bypassSecurityTrustHtml(this.mapOfPubs[id]);
    }
  }

 
}
