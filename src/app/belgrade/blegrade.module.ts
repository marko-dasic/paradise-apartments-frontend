import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoverBelgradeComponent } from './components/cover-belgrade/cover-belgrade.component';
import { BelgradeRoutingModule } from './blegrade-routing.module';
import { AboutComponent } from './components/about/about.component';
import { BelgradeComponent } from './belgrade/belgrade.component';
import { RestaurantsComponent } from './components/restaurants/restaurants.component';
import { AboutBelgradeComponent } from './components/about-belgrade/about-belgrade.component';
import { FactsComponent } from './components/facts/facts.component';



@NgModule({
  declarations: [
    CoverBelgradeComponent,
    AboutComponent,
    BelgradeComponent,
    RestaurantsComponent,
    AboutBelgradeComponent,
    FactsComponent
  ],
  imports: [
    CommonModule,
    BelgradeRoutingModule,
  ]
})
export class BlegradeModule { }
