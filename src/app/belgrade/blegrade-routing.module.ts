import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BelgradeComponent } from './belgrade/belgrade.component';


const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: BelgradeComponent,
    data: { title: "O Beogradu" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BelgradeRoutingModule { }
