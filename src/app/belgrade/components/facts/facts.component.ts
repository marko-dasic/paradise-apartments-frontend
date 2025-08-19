import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/admin/blog/services/BlogService';
import { IBlog } from 'src/app/shared/interface/i-blog';

@Component({
  selector: 'app-facts',
  templateUrl: './facts.component.html',
  styleUrls: ['./facts.component.scss']
})
export class FactsComponent implements OnInit{
  blogs: IBlog[];

  constructor(private blogService: BlogService){

  }

  ngOnInit(): void {
    this.loadBlogs();
  }

  loadBlogs()
  {
    this.blogService.get().subscribe({
      next: response=>{
        this.blogs= response;
      },
      error: xhr => {
        alert("Doslo je do greske prilikom ucitavanja blogova.")
      }
    })
  }

}
