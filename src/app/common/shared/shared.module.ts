import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchCardComponent } from 'src/app/componenets/match-card/match-card.component';



@NgModule({
  declarations: [MatchCardComponent,MatchCardComponent],
  exports:[MatchCardComponent,MatchCardComponent],
  imports: [
    CommonModule
  ],
  
})
export class SharedModule { }
