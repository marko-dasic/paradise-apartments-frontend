import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ICategory } from 'src/app/shared/interface/i-category';
import { ICity } from 'src/app/shared/interface/i-city';
import { CategoryService } from 'src/app/shared/services/categories/category.service';
import { CitiesService } from 'src/app/shared/services/cities/cities.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { param } from 'jquery';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  animations: [
    trigger('spin', [
      transition('* => *', [
        animate('1s linear', style({ transform: 'rotate(360deg)' })),
      ]),
    ]),
    trigger('blockAnimation', [
      state('hidden', style({ height: '0', opacity: '0' })),
      state('visible', style({ height: '*', opacity: '1' })),
      transition('hidden <=> visible', animate('300ms ease-in-out')),
    ]),
  ],
})

export class FilterComponent {

  @Output() filterEmiter = new EventEmitter<any>();
  @Input()  minPriceControll: FormControl;
  @Input() HasApartment: boolean;
  @Input() loading: boolean;
  @Input() numberApartments:number;
  @Input() defaultCategoryId: number;
  @Input() numPerson: any;
  @Input() start: any;
  @Input() end: any;

  defaultNumberPerson: number;
  numbersOfPersons: number[] = [1,2,3,4,5,6,7,8,9];
  selectedNumberOfPerson: number;

  minStartDate: string;
  minEndDate: string;
  selectedNumPerson: number;

  blockState: 'hidden' | 'visible' = 'hidden';
  selectedCategory: ICategory;
  filterForm: FormGroup;
  cities: ICity[];
  categories: ICategory[];
  initalSelectedCategoryIds: number[];

  checkLiftId:number = 4;
  checkKlimaId:number = 2;
  checkTvId:number = 3;
  checkDjakuziId:number = 11;
  checkTerasaId:number = 100;
  checkSefId:number = 1001;
  checkParkingId:number = 8;

  constructor(private formBuilder: FormBuilder,
              private cityService: CitiesService,
              private categoryService: CategoryService) { }

  ngOnInit(): void {
    //Inicjalizacija forme za pretrgu
    const currentDate = new Date();
    this.minStartDate = this.formatDateToYYYYMMDD(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1,13,30,1));
    this.minEndDate = this.formatDateToYYYYMMDD(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 2,13,30,1));

    if(this.start == null || this.start == undefined) this.start = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1,13,30,1);
    if(this.end == null || this.end == undefined) this.end = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 2,13,30,1); 

    this.fillForm();

    if(!(this.defaultCategoryId && !isNaN(this.defaultCategoryId))) this.defaultCategoryId= 0;
    if(!this.numPerson) this.numPerson = 2;
    
    this.filterForm = this.formBuilder.group({
      title: [''],
      city: [''],
      category: [''],
      minPrice: [''],
      maxPrice: [''],
      checkWifi:[false],
      checkLift:[false],
      checkKlima:[false],
      checkTv:[false],
      checkDjakuzi:[false],
      checkTerasa:[false],
      checkSef:[false],
      checkParking:[false],
      numPerson:[parseInt(this.numPerson)],
      start: [this.start],
      end: [this.end ] 
    });


  }

  toggleBlock() {
    this.blockState = this.blockState === 'hidden' ? 'visible' : 'hidden';
  }

  fillForm(){
    this.cityService.get().subscribe({
      next: response =>{
          this.cities = response;
          var tmp = this.cities[0];
          this.cities[this.cities.length] = tmp
          this.cities[0] = {
            id:0,
            name:"Svi"
          };
      },
      error: xhr => {
          alert("Doslo je do greske prilikom ucitavanja gradova");
          // console.log(xhr);
      }
    });

    this.categoryService.get().subscribe({
      next: response =>{
        this.categories = response;
        var tmp = this.categories[0];
          this.categories[this.categories.length] = tmp
          this.categories[0] = {
            id:0,
            name:"Sve"
          };
          if(this.defaultCategoryId > 0) this.checkDefaultValueForDropDown(this.defaultCategoryId);
      },
      error:xhr=>{
        alert("Doslo je do greske prilikom ucitavanja kategorija!")
        // console.log(xhr);
      }
    });
  }

  onDateStartChange() {
    var tmp = new Date(this.start);
    tmp.setDate(this.start.getDate() + 3);
    this.minEndDate =  tmp.toISOString().split('T')[0];
  }

  submitForm(): void {
    var params = this.filterForm.value;

    var specs = new Array();
    if(params.checkDjakuzi) specs.push(this.checkDjakuziId);
    if(params.checkKlima) specs.push(this.checkKlimaId);
    if(params.checkLift) specs.push(this.checkLiftId);
    if(params.checkSef) specs.push(this.checkSefId);
    if(params.checkTerasa) specs.push(this.checkTerasaId);
    if(params.checkTv) specs.push(this.checkTvId);
    params.specificationIds = specs;

    if(params.checkParking)
    {
      params.garage = true;
    }
    else 
    {
      params.garage = false;
    }

    if(!params.city) params.city = [];
    if(!params.start) params.start = null;
    if(!params.end) params.end = null;

    //UKOLIKO NE RADI FILTRIRANJE PO BROJU OSOBA POGLEDATI OVAJ KOD
    // if(this.selectedNumberOfPerson == null || this.selectedNumberOfPerson ==0)
    // {
    //    params.numPerson = null;
    // }
    // else{
    //     params.numPerson = this.filterForm.value.numPerson;
    // }

    if(!params.category) params.category = [];
    if(!params.title) params.title = "";
    if(!params.minPrice) params.minPrice = 0;
    if(!params.maxPrice) params.maxPrice = 0;

    this.filterEmiter.emit(params);
  }

  checkDefaultValueForDropDown(idCat: number){
    var Id =  parseInt(idCat.toString());
    this.filterForm.get("category").setValue([Id]);
    this.filterForm.get("city").setValue([0]);
  }

  formatDateToYYYYMMDD(date: Date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }



}
