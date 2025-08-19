import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';  
import { HttpClient, HttpParams } from '@angular/common/http';
import { API } from 'src/app/constants/Api';
import { CONFIGURATION } from 'src/app/constants/config';
import { Observable } from 'rxjs';
import { IBlog } from 'src/app/shared/interface/i-blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService extends ApiService<IBlog> {

  constructor(client: HttpClient) { 
    super(client, CONFIGURATION.APIURL+API.BLOGS);
    
  }
}