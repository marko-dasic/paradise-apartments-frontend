import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BlogService } from '../../services/BlogService';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  insertError: string;
  insertBlogForm: FormGroup;
  submiting: boolean = false;
  fileBase64: string;

  constructor(
    public dialogRef: MatDialogRef<CreateComponent>,
    private formBuilder: FormBuilder,
    private blogService: BlogService,
    private snackBar: MatSnackBar,
    private router: Router

  ){
    const screenWidth = window.innerWidth;
    if (screenWidth < 600) {
      dialogRef.updateSize('95%');
    } else {
      dialogRef.updateSize('80%');
    }
  }
  public editorConfig: AngularEditorConfig = {
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
  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.insertBlogForm = this.formBuilder.group({
      title: ["", Validators.required],
      content: ["", Validators.required],
      workTime: [""],
      googleMap: [""],
      adress: ["" ],
      fileBase64: [""],
    });
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
    
    if (this.insertBlogForm.invalid)
    {
      return;
    }
    this.submiting =true;
    var body = this.insertBlogForm.value; // kopiramo sve podatke iz forme u boy pa cemo u daljem kod formatirati body u isptavnom formatui za API
    body.fileBase64 = this.fileBase64;
    const token = localStorage.getItem("token");
    this.blogService.headers = new HttpHeaders().set("Authorization","Bearer " + token);

    this.blogService.put(body).subscribe({
      next:response=>{
        this.submiting =false;
        this.snackBar.open("Uspesno ste kreirali blog. Podaci su sacuvani.", 'Zatvori', {
          duration: 10000,  // Vreme trajanja obaveštenja (u milisekundama)
          panelClass: "success-snackbar"
        });
        this.dialogRef.close("success");
      },
      error:xhr=>{
        this.submiting =false;
        if(xhr.status == 422){
          this.insertError = xhr.error.errors[0].error;
        }
        else if(xhr.status == 401){
          this.router.navigate(['/login']);
        }
        else{
          this.insertError = "Doslo je do greske prilikom kreiranja novog bloga!!! Pokjusajte kasnije!!!";
        }
        this.snackBar.open(this.insertError, 'Zatvori', {
          duration: 10000,  
          panelClass: "success-snackbar"
        });
        // console.log(xhr);
      }
    });


  }

  close(){
    this.dialogRef.close("dismiss")
  }



}