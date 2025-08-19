import { Component, OnInit, Inject, ElementRef, AfterViewChecked } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApartmentsService } from 'src/app/shared/services/apartments/apartments.service';
import { CategoryService } from 'src/app/shared/services/categories/category.service';
import { CitiesService } from 'src/app/shared/services/cities/cities.service';
import { ICategory } from 'src/app/shared/interface/i-category';
import { ICity } from 'src/app/shared/interface/i-city';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IPrice } from 'src/app/shared/interface/i-price';
import { HttpHeaders } from '@angular/common/http';
import { SpecificationsService } from 'src/app/shared/services/specifications/specifications.service';
import { IGetSpecification } from 'src/app/shared/interface/i-get-specification';
import { ISpecificationsToSend } from 'src/app/shared/interface/i-specification-to-send';
import { ISpecPrice } from 'src/app/shared/interface/i-spec-price';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { IRooms } from 'src/app/shared/interface/i-rooms';
import { RoomsService } from 'src/app/shared/services/rooms/rooms.service';
import { Ng2ImgMaxService } from 'ng2-img-max';


@Component({
  selector: 'app-edit',
  templateUrl: 'insert.component.html',
  styleUrls: ['insert.component.css']
})

export class InsertComponent implements OnInit, AfterViewChecked  {
  insertError: string;
  insertApartmentForm: FormGroup;
  submiting: boolean =false;

  specPriceControls: any[] = new Array();
  numSpecPriceControls: number = 0;

  categories: ICategory[];
  cities: ICity[]; 
  specifications$: IGetSpecification[];
  rooms: IRooms[];

  selectedCityId: number;
  defaultSelectedCaityId: number;
  
  selectedRoomId: number;
  defaultSelectedRoomId: number;

  selectedCategoryId: number;
  defaultSelectedCategoryId: number;
  
  convertedImages: string[] = [];
  convertedThumbImage: string;


  /*Obrisati posle */
  startDate: Date;
  /*kraj brisanja */

  //CKEDITOR
  isLoadedCkEditor: boolean = false;
  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };

  constructor(
    public dialogRef: MatDialogRef<InsertComponent>,
    private formBuilder: FormBuilder,
    private apartmentService: ApartmentsService,
    private categoryService: CategoryService,
    private cityService: CitiesService,
    private roomService: RoomsService,
    private snackBar: MatSnackBar,
    private specificationService: SpecificationsService,
    private elementRef: ElementRef,
    private ng2ImgMax: Ng2ImgMaxService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    const screenWidth = window.innerWidth;
    if (screenWidth < 600) {
      dialogRef.updateSize('95%');
    } else {
      dialogRef.updateSize('80%');
    }
    
  }

  ngOnInit(): void {
    this.createForm();
    this.fetchCategories();
    this.fetchCities();
    this.fetchSpecifications()
    this.fetchRooms();
  }

  ngAfterViewChecked() {

  }

  createForm(): void {
    this.insertApartmentForm = this.formBuilder.group({
      specPrices: this.formBuilder.array([]),
      title: ["Paradise Apartments Test", Validators.required],
      description: ["Test Description", Validators.required],
      pricePerNight: [50, [Validators.required,Validators.min(1)]],
      priceOnHoliday: [50,[Validators.required,,Validators.min(1)]],
      priceOnNewYear: [80,[Validators.required,,Validators.min(1)]],
      category: ['', [Validators.required,Validators.min(1)]],
      city: ['', [Validators.required,Validators.min(1)]],
      rooms:['',Validators.required],
      street:['Kosovska'],
      streetNumber:['28',Validators.required],
      remoteCalendar:['https://ical.booking.com/v1/export?t=55ba1dfa-0505-46bb-999d-7e3ff8a106a3',Validators.required],
      wiFi:[true,Validators.required],
      garage:[true,Validators.required],
      minPerson: [1,Validators.required],
      maxPerson:[2,Validators.required],
      pricePerPerson:[true,Validators.required],
      floor:["1",Validators.required],
      googleMap: [`<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d90628.94243450358!2d20.4865534882179!3d44.77765646403609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a710ace2ca795%3A0x4c021ce1be1ef985!2s%22MASTEF%22%20Apartman%20Beograd!5e0!3m2!1ssr!2srs!4v1696026092203!5m2!1ssr!2srs" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
      </iframe>
      `],
      cordinateX: ['44.77679533392523'],
      cordinateY:['20.552636161916187'],
      image: [''],
      images: [[]],
      priority:[3,[Validators.required,,Validators.min(1)]],
      surface:[80,[Validators.required,Validators.min(1)]]
    });
  }

  ShowEditorValue(){
  }

  fetchCategories(): void {
    this.categoryService.get().subscribe({
      next: resposne =>{
        this.categories = resposne;
      },
      error: xhr =>{
        this.snackBar.open("Doslo je do greske prilikom ucitavanja kategorija. Pokusajte kasnije.", 'Zatvori', {
          duration: 100000,  // Vreme trajanja obaveštenja (u milisekundama)
          panelClass: "error-snackbar"
        });
      }
    })
  }

  fetchCities(): void {
    this.cityService.get().subscribe({
      next: resposne =>{
        this.cities = resposne;
        
      },
      error: xhr =>{
       const snack  = this.snackBar.open("Doslo je do greske prilikom ucitavanja gradova. Pokusajte kasnije.", 'Zatvori', {
          duration: 10000,  // Vreme trajanja obaveštenja (u milisekundama)
          panelClass: "error-snackbar"
        });
      }
    })
  }

  fetchRooms(){
    this.roomService.get().subscribe({
      next: response =>{
        this.rooms = response;
      },
      error: xhr =>{
        // console.log("Nisu se ucitale sve sobe!")
      }
    })
  }

  fetchSpecifications(){
    this.specificationService.get().subscribe({
      next: response =>{
        this.addControlsSpecifications(response);
        this.specifications$ = response;
      },
      error: xhr=>{
        this.snackBar.open("Doslo je do greske prilikom ucitavanja specifikacija. Pokusajte kasnije.", 'Zatvori', {
          duration: 100000,  // Vreme trajanja obaveštenja (u milisekundama)
          panelClass: "error-snackbar"
        });
        // console.log(xhr);
      }
    })
  }

  addControlsSpecifications(spsecifications:IGetSpecification[]){
    
    spsecifications.forEach(spec => {

      this.insertApartmentForm.addControl(spec.name, this.formBuilder.control(""));
      this.insertApartmentForm.controls[spec.name].setValue("DA");
    });
  }

  addSpecPriceControls() {
      this.specPriceControls.push({
        date:new Date(),
        price :0,
        id: Math.random() * 10000
      })

      this.numSpecPriceControls = this.numSpecPriceControls + 1;
  }

  removeFromSpecPrice(index:number){
    var x = this.specPriceControls.filter(y=>y.id != index);    
    this.specPriceControls = x; 
    this.numSpecPriceControls--;
  }
 

  handleThumbImageInput(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
    if (file) {
    // const reader = new FileReader();

    // reader.onload = (event: any) => {
    //   this.compressThumbImage(file,0.45);
    // };

    // reader.onerror = (error) => {
    //   console.error('Greška prilikom konverzije slike:', error);
    // };

    // reader.readAsDataURL(file);
    // }
      this.compressThumbImage(file,0.5);
    }
  }

  handleImagesInput(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    
    if (files && files.length) {
      for (let i = 0; i < files.length; i++) {
        const file_ = files[i];
        this.compressImage(file_,0.5);
      }
    }
  }

  async convertBase64(file: any): Promise<any>{
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      }
    });
  };

  async uploadImage(file: any){
    // var file2 = this.compressImage(file,0.5);
    // var file3 = await this.kreirajFileIzBlobURL(file2);
    const base64 = await this.convertBase64(file);
    this.convertedImages.push(base64.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
  };


  async uploadThumbImahe(file:any){
    const base64 = await this.convertBase64(file);
    this.convertedThumbImage = base64.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
  }



  onSubmit(): void {


    if (this.insertApartmentForm.invalid) {
      return;
    }

    var specificationToSend: ISpecificationsToSend[] = [];
    const formValue = this.insertApartmentForm.value;
    
    this.specifications$.forEach(x=>{ // popunjavanje objekta koji treba da se posalje na server za update specifikacija
      var obj: ISpecificationsToSend;
      obj = {
        specificationId : x.id,
        apartmentId: 0,
        value : formValue[x.name] 
      }
      specificationToSend.push(obj);
    })

    var body = this.insertApartmentForm.value; // kopiramo sve podatke iz forme u boy pa cemo u daljem kod formatirati body u isptavnom formatui za API
    body.specification = specificationToSend; //dodajemo sve specifikacije body-u koje ce se dodati na novo kreriani objekat
    body.id = this.insertApartmentForm.value.id;
    if(this.convertedThumbImage){
      body.file = this.convertedThumbImage; // ukoliko je kor. otpremio sliku zapisujemo njen base64 u body
      body.fileId = 0;
    }


    var newPrice: IPrice = {
      priceOnHoliday :body.priceOnHoliday,
      pricePerNight : body.pricePerNight,
      priceOnNewYear: body.priceOnNewYear
    }

    var priceSpec: ISpecPrice[] = [];

    this.specPriceControls.forEach(e=>{
      var obj = {
        price:0,
        date:""
      };
      var price = document.getElementById("price"+e.id);
      var price2 = (price as HTMLInputElement);
      if(price2){
        obj.price = parseFloat(price2.value);
      }
      var date = document.getElementById("date"+e.id);
      var date2 = (date as HTMLInputElement);
      if(date2){
        obj.date = this.formatDate(date2.value);
      }
      priceSpec.push({price: obj.price, date: obj.date});
      
    })
    body.specPrices = priceSpec;

    body.price = newPrice; // postavljanje objekta cene u ispravnom formatu (price {pricePerNight:0,priceOnHoliday:0,pricePerNightWeekend:0})

    if(this.convertedImages) body.images = this.convertedImages; // ukoliko je korisnik uploadovao slike one se ubacuju u body
    
    body.cityId = this.insertApartmentForm.value.city; // uzimanje id grada

    body.categoryId = this.insertApartmentForm.value.category; // uzimanbje id kategorije
    // body.minPerson = 2;
    // body.maxPerson = 5;
    body.roomId = this.selectedRoomId;
    this.submiting =true;

    this.createApartment(body);


  }

  createApartment(body: any){
    const token = localStorage.getItem("token");
    this.apartmentService.headers = new HttpHeaders().set("Authorization","Bearer " + token);

    this.apartmentService.put(body).subscribe({
      next: ()=>{
        this.snackBar.open("Uspesno ste kreirali apartman. Podaci su sacuvani.", 'Zatvori', {
          duration: 10000,  // Vreme trajanja obaveštenja (u milisekundama)
          panelClass: "success-snackbar"
        });
        this.submiting =false;
        
        this.success();
      },
      error: (xhr) => {
        this.submiting =false;
        var text = "Doslo je do greske prilikom kreiranja apartmana. Pokusajte kasnije.";
        if(xhr.status == 422){
          text = xhr.error.errors[0].error;
        }else if( xhr.status == 401){
          window.location.replace("/login");
        }else if(xhr.status == 400){
          text = xhr.error.error;
        }
        this.snackBar.open(text, 'Zatvori', {
          duration: 100000,  // Vreme trajanja obaveštenja (u milisekundama)
          panelClass: "error-snackbar"
        });
        
      }
    });
  }

  success(){
    this.dialogRef.close("success");

  }

  close(){
    this.dialogRef.close("dismiss");

  }

  compressImage(file: File, maxSizeInMB: number) {
    this.ng2ImgMax.compressImage(file, maxSizeInMB)
      .subscribe(compressedImage => {
        this.uploadImage(compressedImage);
      }, error => {
        // console.log(error.reason);
     });
  }

  async compressThumbImage(file: File, maxSizeInMB: number) {
    this.ng2ImgMax.compressImage(file, maxSizeInMB)
      .subscribe(compressedImage => {
        this.uploadThumbImahe(compressedImage);
      }, error => {
        // console.log(error.reason);
     });
  }

  formatDate(inputDate: any):string  {
    const parts = inputDate.split('/');
    const year = parts[2];
    const month = parts[0].padStart(2, '0');
    const day = parts[1].padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
