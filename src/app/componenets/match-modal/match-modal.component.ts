import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ConstantsService } from 'src/app/services/constants.service';

@Component({
  selector: 'app-match-modal',
  templateUrl: './match-modal.component.html',
  styleUrls: ['./match-modal.component.scss'],
})
export class MatchModalComponent implements OnInit {

  constructor(private modalCtrl:ModalController,private constant: ConstantsService) { }
  @Input() item;
  baseImageUrl = "";

  ngOnInit() {
    this.baseImageUrl = this.constant.baseImageUrl;        
  }
  
  dismiss(){
    this.modalCtrl.dismiss();
  }


  slideOpts = {
    initialSlide: 1,
    loop:true,
    pager:true,
    speed: 400
  };
}
