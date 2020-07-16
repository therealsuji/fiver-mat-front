import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchCardComponent } from 'src/app/componenets/match-card/match-card.component';
import { MatchModalComponent } from 'src/app/componenets/match-modal/match-modal.component';
import { FilterModalComponent } from 'src/app/componenets/filter-modal/filter-modal.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [MatchCardComponent,FilterModalComponent,MatchModalComponent],
  exports:[MatchCardComponent,FilterModalComponent,MatchModalComponent],
  imports: [
    CommonModule,IonicModule,FormsModule
  ],
  
})
export class SharedModule { }
