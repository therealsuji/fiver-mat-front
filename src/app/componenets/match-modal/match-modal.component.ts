import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-match-modal',
  templateUrl: './match-modal.component.html',
  styleUrls: ['./match-modal.component.scss'],
})
export class MatchModalComponent implements OnInit {

  constructor(private modalCtrl:ModalController) { }
  @Input() item;
  ngOnInit() {}
  
  dismiss(){
    this.modalCtrl.dismiss();
  }
}
