import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationComponent } from './components/reservation/reservation.component';




const routes: Routes = [
  {
    path: "",
    component:ReservationComponent,
    data: { title: "Upravljanje Rezervacijama - Admin" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationRoutingModule { }
