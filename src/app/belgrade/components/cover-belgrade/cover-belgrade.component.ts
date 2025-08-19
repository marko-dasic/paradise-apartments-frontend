import { Component, ElementRef, EventEmitter, OnInit, Output, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-cover-belgrade',
  templateUrl: './cover-belgrade.component.html',
  styleUrls: ['./cover-belgrade.component.css']
})
export class CoverBelgradeComponent implements OnInit 
{
  @Output() scrollToBlock: EventEmitter<string> = new EventEmitter<string>()

  constructor(private renderer: Renderer2){
  }

  ngOnInit()
  {
    this.loadScript();

  }
  
  scrollToTarget(id: string) {
    this.scrollToBlock.emit(id);
  }

  private loadScript(): void
  {
      const script = this.renderer.createElement('script');
      script.src = 'assets/js/my-js/belgrade-cover.js';
      this.renderer.appendChild(document.body, script);
  }


}
