import { Component, ElementRef, Input, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { IApartment } from 'src/app/shared/interface/i-apartment';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { animate, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-premium-apartments',
  templateUrl: './premium-apartments.component.html',
  styleUrls: ['./premium-apartments.component.css'],
  animations: [
    trigger('spin', [
      transition('* => *', [
        animate('1s linear', style({ transform: 'rotate(360deg)' })),
      ]),
    ]),
  ],
})
export class PremiumApartmentsComponent implements OnInit {
  @Input() allApartments: IApartment[];
  @Input() loadingAllApartments: boolean =true;
  
  constructor(private renderer: Renderer2){}

  ngOnInit()
  {
    this.loadScript();

  }

  @ViewChild('slider') slider: ElementRef;
  @ViewChildren(CdkDrag) slides: QueryList<CdkDrag>;

  slideWidth = 800;
  slideOffset = 0;
  sliderWidth = 0;

  ngAfterViewInit() {
    this.sliderWidth = this.slides.length * this.slideWidth;
  }

  moveSlider(offset: number) {
    this.slideOffset += offset;
    if (this.slideOffset > 0) {
      this.slideOffset = 0;
    } else if (this.slideOffset < -(this.sliderWidth - this.slideWidth)) {
      this.slideOffset = -(this.sliderWidth - this.slideWidth);
    }
    this.slider.nativeElement.style.transform = `translateX(${this.slideOffset}px)`;
  }



  private loadScript(): void
  {
    setTimeout(() =>{
      const script = this.renderer.createElement('script');
      script.src = 'assets/js/Pzd9jIG4P8zR.js';
      this.renderer.appendChild(document.body, script);
    },500);

    setTimeout(()=>{
      const script = this.renderer.createElement('script');
      script.src = 'assets/js/my-js/fix-for-premium-1.js';
      this.renderer.appendChild(document.body, script);
    },1008)

    setTimeout(()=>{
      const script = this.renderer.createElement('script');
      script.src = 'assets/js/my-js/fix-for-premium-2.js';
      this.renderer.appendChild(document.body, script);
    },2100)

    setTimeout(()=>{
      const script = this.renderer.createElement('script');
      script.src = 'assets/js/my-js/fix-for-premium-3.js';
      this.renderer.appendChild(document.body, script);
    },3050)

    setTimeout(()=>{
      const script = this.renderer.createElement('script');
      script.src = 'assets/js/my-js/fix-for-premium-4.js';
      this.renderer.appendChild(document.body, script);
    },4120)

    setTimeout(()=>{
      const script = this.renderer.createElement('script');
      script.src = 'assets/js/my-js/fix-for-premium-5.js';
      this.renderer.appendChild(document.body, script);
    },5000)

    setTimeout(()=>{
      const script = this.renderer.createElement('script');
      script.src = 'assets/js/my-js/fix-for-premium-6.js';
      this.renderer.appendChild(document.body, script);
    },6030)

    setTimeout(()=>{
      const script = this.renderer.createElement('script');
      script.src = 'assets/js/my-js/fix-for-premium-7.js';
      this.renderer.appendChild(document.body, script);
    },8200)

    setTimeout(()=>{
      const script = this.renderer.createElement('script');
      script.src = 'assets/js/my-js/fix-for-premium-8.js';
      this.renderer.appendChild(document.body, script);
    },10000)

    setTimeout(()=>{
      const script = this.renderer.createElement('script');
      script.src = 'assets/js/my-js/fix-for-premium-9.js';
      this.renderer.appendChild(document.body, script);
    },12090)

    setTimeout(()=>{
      const script = this.renderer.createElement('script');
      script.src = 'assets/js/my-js/fix-for-premium-10.js';
      this.renderer.appendChild(document.body, script);
    },15000)

    setTimeout(()=>{
      const script = this.renderer.createElement('script');
      script.src = 'assets/js/my-js/fix-for-premium-6.js';
      this.renderer.appendChild(document.body, script);
    },20000)

    setTimeout(()=>{
      const script = this.renderer.createElement('script');
      script.src = 'assets/js/my-js/fix-for-premium-4.js';
      this.renderer.appendChild(document.body, script);
    },24000)

    setTimeout(()=>{
      const script = this.renderer.createElement('script');
      script.src = 'assets/js/my-js/fix-for-premium-5.js';
      this.renderer.appendChild(document.body, script);
    },30000)

    setTimeout(()=>{
      const script = this.renderer.createElement('script');
      script.src = 'assets/js/my-js/fix-for-premium-3.js';
      this.renderer.appendChild(document.body, script);
    },35000)

    setTimeout(()=>{
      const script = this.renderer.createElement('script');
      script.src = 'assets/js/my-js/fix-for-premium-2.js';
      this.renderer.appendChild(document.body, script);
    },40000)
  }
}
