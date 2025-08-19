import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { animate, style, transition, trigger } from '@angular/animations';
import { SureComponent } from 'src/app/shared/Dialogs/sure/sure.component';
import { IBlog } from 'src/app/shared/interface/i-blog';
import { HttpHeaders } from '@angular/common/http';
import { Route, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BlogService } from '../../services/BlogService';
import { CreateComponent } from '../create/create.component';
import { UpdateComponent } from '../update/update.component';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit{
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  displayedColumns: string[] = ["name","update","delete"];
  blogs :MatTableDataSource<any>;
  hasBlogs: boolean = true;
  loading: boolean = true;
  isSmallScreen:boolean;

  public constructor( private router: Router,private blogService: BlogService ,private snackBar: MatSnackBar,
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,){

  }

  ngOnInit(): void {
    this.isSmallScreen  = this.breakpointObserver.isMatched(Breakpoints.Small);
    this.loadBLogs();
  }

  loadBLogs(){
    this.loading = true;
    this.blogService.get().subscribe({
      next: response=>{
        this.hasBlogs = response.length > 0;
        this.loading = false;
        this.blogs = new MatTableDataSource(response);
        this.blogs.paginator = this.paginator;

      },
      error:xhr=>{
        this.snackBar.open("Doslo je do greske prilikom ucitavanja blogova. Pokusajte kasnije.", 'Zatvori', {
          duration: 100000,  
        });
        // console.log(xhr);
      }
    })
  }

  openCreateBlogDialog(){
    const dialogCreate =  this.dialog.open(CreateComponent,{
      width: "100%",
      maxWidth:"100%"
    })

    dialogCreate.afterClosed().subscribe( result =>{
      if(result == "success"){
        this.loadBLogs();
      }
    })
  }

  deleteBlogDailog(blog: IBlog) {

    const dialogRef = this.dialog.open(SureComponent, {
      width: "100%",
      maxWidth:"100%",
      data: {
        title: "Oprez!!!",
        message:"Da li ste sigurni da zelite da obrisete blog: "+blog.title+" ? Blog ce moci samo DataBase administrator da vrati u upotrebu nakon brisanja!"
      } 
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == "agree"){
        this.deleteBlog(blog);
      }
    });
  }

  deleteBlog(blog: IBlog){
    const token = localStorage.getItem("token");
    this.blogService.headers = new HttpHeaders().set("Authorization","Bearer " + token);
    this.blogService.delete(blog.id).subscribe({
      next: response => {
        const arr = this.blogs.data.filter(x=>x.id != blog.id);
        this.blogs = new MatTableDataSource(arr);
        const snack  = this.snackBar.open("Uspesno ste obrisali blog.", 'Zatvori', {
          duration: 10000,  // Vreme trajanja obaveštenja (u milisekundama)
          panelClass: "error-snackbar"
        });
      },
      error: xhr =>{
        this.loading = false;
        if(xhr.status == 401){
          this.router.navigate(['/login']);
        }
        
       const snack  = this.snackBar.open("Doslo je do greske prilikom brisnaja bloga. Pokusajte kasnije.", 'Zatvori', {
          duration: 10000,  // Vreme trajanja obaveštenja (u milisekundama)
          panelClass: "error-snackbar"
        });
      }
    })
  }

  updateBlogDialog(blog: IBlog){
    const dialogRef = this.dialog.open(UpdateComponent, {
      width: "100%",
      maxWidth:"100%",
      data: {
        currentBlog: blog,
      } 
    });

    dialogRef.afterClosed().subscribe(result => {
        this.loadBLogs();
    });
  }
}
