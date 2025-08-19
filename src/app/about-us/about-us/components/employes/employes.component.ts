import { Component, OnInit } from '@angular/core';
import { EmployesService } from '../../services/employes.service';
import { IEmploye } from '../../interface/i-employe';

@Component({
  selector: 'app-employes',
  templateUrl: './employes.component.html',
  styleUrls: ['./employes.component.css']
})
export class EmployesComponent implements OnInit {

  constructor(){

  }


  ngOnInit(): void {

  }



}
