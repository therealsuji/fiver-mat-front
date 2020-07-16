import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPageRoutingModule } from './search-routing.module';

import { SearchPage } from './search.page';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { FilterModalComponent } from 'src/app/componenets/filter-modal/filter-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    SearchPageRoutingModule
  ],
  declarations: [SearchPage,FilterModalComponent]
})
export class SearchPageModule {}
