import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { DomSanitizer, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-belgrade',
  templateUrl: './belgrade.component.html',
  styleUrls: ['./belgrade.component.css']
})
export class BelgradeComponent implements OnInit{
  idToScroll: string;
  ids: string[] = ['parkovi','muzeji','restorani','kafane','pozorista']; 

  constructor(private sanitizer: DomSanitizer,  private el: ElementRef, private renderer: Renderer2, private metaService: Meta){
  }

  ngOnInit(): void {
    this.idToScroll = null;
    this.metaService.updateTag({ name: 'keywords', content: 'Paradise, apartmani, O Beogradu, zanimljivosti,' });
    this.metaService.updateTag({ name: 'description', content: 'Beograd, prestonica Srbije, ne oduševljava samo svojom arhitekturom već i živopisnom prošlošću koja se ogleda u svakom kamenu. Nalazi se na ušću reka Save i Dunava, što mu pruža posebno značajan geografski položaj. Grad koji je preživeo burne istorijske periode, Beograd i danas nosi ožiljke prošlosti u obliku tvrđave Kalemegdan, autentičnog simbola grada.' });
  }
  

  scrollToTarget(id:string) 
  {
    //alert(id)
    this.ids.forEach(e=>{
      if(e != id)
      {
        this.hideElement(e);
      }
    })

    this.displayElement(id);

    if(id != null)
    {
      const targetElement = this.el.nativeElement.querySelector('#'+ id);
      // console.log("tatreget element",targetElement)
      if (targetElement) {
        //targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const targetOffset = targetElement.offsetTop - 200; // Dodajte ili oduzmite vrednost za prilagođavanje podizanja ekrana
        window.scroll({ top: targetOffset, behavior: 'smooth' });
      }
    }
  }

  hideElement(id:string)
  {
    const targetElement = this.el.nativeElement.querySelector('#'+ id);

    this.renderer.removeClass(targetElement,"d-block");
    this.renderer.addClass(targetElement,"d-none");
  }

  displayElement(id:string)
  {
    const targetElement = this.el.nativeElement.querySelector('#'+ id);

    this.renderer.removeClass(targetElement,"d-none");
    this.renderer.addClass(targetElement,"d-block");
  }
}
