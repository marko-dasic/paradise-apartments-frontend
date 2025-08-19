import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/shared/services/categories/category.service';
import { CitiesService } from 'src/app/shared/services/cities/cities.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IPrice } from 'src/app/shared/interface/i-price';
import { HttpHeaders } from '@angular/common/http';
import { SpecificationsService } from 'src/app/shared/services/specifications/specifications.service';
import { ISpecificationsToSend } from 'src/app/shared/interface/i-specification-to-send';
import { Router } from '@angular/router';
import { ISpecPrice } from 'src/app/shared/interface/i-spec-price';
import { RoomsService } from 'src/app/shared/services/rooms/rooms.service';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { IBlog } from 'src/app/shared/interface/i-blog';
import { BlogService } from '../../services/BlogService';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  editBlogForm: FormGroup = new FormGroup([]);
  appearance: MatFormFieldAppearance = 'fill';
  fileBase64: string;
  submiting: boolean =false;
  path: string;


  currentBlog: IBlog;


  // CKEditor
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
    public dialogRef: MatDialogRef<UpdateComponent>,
    private formBuilder: FormBuilder,
    private blogService: BlogService,
    private snackBar: MatSnackBar,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }

  ngOnInit(): void {
    this.currentBlog = this.data.currentBlog;
    this.createForm();
    this.initialize()

  }

  createForm(): void {
    this.editBlogForm = this.formBuilder.group({
      title: [this.currentBlog.title, Validators.required],
      content: [this.currentBlog.content, Validators.required],
      googleMap: [this.currentBlog.googleMap],
      FileId: [this.currentBlog.fileId],
    });
  }

  initialize(){
    this.path = this.currentBlog.path;

  }


  handleThumbImageInput(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
    if (file) {
    const reader = new FileReader();

    reader.onload = (event: any) => {
      let base64String = event.target.result;
      base64String = base64String.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
      this.fileBase64 = base64String;
    };

    reader.onerror = (error) => {
      console.error('Greška prilikom konverzije slike:', error);
    };

    reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.editBlogForm.invalid) {
      return;
    }

    var body = this.editBlogForm.value; // kopiramo sve podatke iz forme u boy pa cemo u daljem kod formatirati body u isptavnom formatui za API

    body.id = this.currentBlog.id;

    if(this.fileBase64){
      body.fileBase64 = this.fileBase64; // ukoliko je kor. otpremio sliku zapisujemo njen base64 u body
      body.fileId = 0;
    }
    else{
      body.fileBase64 = "";
      body.fileId = this.currentBlog.fileId;  // ukoliko je korisnik sacuvao staru sliku upisujemo id te slike
    }
    this.submiting = true;
    this.updateBlog(body);
  }

  updateBlog(body: any){
    const token = localStorage.getItem("token");
    this.blogService.headers = new HttpHeaders().set("Authorization","Bearer " + token);
    this.blogService.patch(body).subscribe({
      next: ()=>{
        this.snackBar.open("Uspesno ste azurirali blog. Podaci su sacuvani.", 'Zatvori', {
          duration: 10000,  // Vreme trajanja obaveštenja (u milisekundama)
          panelClass: "error-snackbar"
        });
        this.submiting = false;
        
        this.success();
      },
      error: (xhr) => {
        this.submiting = false;
        var text = "Doslo je do greske prilikom azuriranja bloga. Pokusajte kasnije.";
        if(xhr.status == 422){
          text = xhr.error.errors[0].error;
        }else if( xhr.status == 401){
          this.router.navigate(['/login']);
        }else if(xhr.status == 400){
          text = xhr.error.error;
        }
        this.snackBar.open(text, 'Zatvori', {
          duration: 10000,  // Vreme trajanja obaveštenja (u milisekundama)
          panelClass: "error-snackbar"
        });
        
      }
    });
  }

  success(){
    this.dialogRef.close("success"); // vracamo Id kako bismo u glavnoji tabeli azurirali samo onaj blog koji je editovan
  }

  close(){
    this.dialogRef.close("dismiss");
  }
  
}
