import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './components/blog/blog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CreateComponent } from './components/create/create.component';
import { UpdateComponent } from './components/update/update.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { BlogRoutingModule } from './blog.routing';
import { BlogService } from './services/BlogService';



@NgModule({
  declarations: [
    BlogComponent,
    CreateComponent,
    UpdateComponent
  ],
  providers:[BlogService],
  imports: [
    BlogRoutingModule,
    AngularEditorModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatRadioModule,
    MatPaginatorModule,
  ]
})
export class BlogModule { }
