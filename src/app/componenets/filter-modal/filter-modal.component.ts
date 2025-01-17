import { Component, OnInit, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-filter-modal",
  templateUrl: "./filter-modal.component.html",
  styleUrls: ["./filter-modal.component.scss"],
})
export class FilterModalComponent implements OnInit {
  @Input() martialStatusDropDownValues;
  @Input() motherTongueDropDownValues;
  age;
  @Input() maritalStatus;
  martialValue;
  nameValue;
  motherTongue;
  ageValue;
  clearFilter = false;
  constructor(private modalCtrl: ModalController) {}
  customAlertOptions= {
    header: 'Please select your preferred max age',
  };
  ngOnInit() {
    this.age = [...Array(100).keys()];
    this.age = this.age.slice(18,100);   
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
  clearFilters(){
    this.clearFilter = true;
    this.save();
  }
  save(){
    this.modalCtrl.dismiss({
      martialValue:this.martialValue,
      nameValue:this.nameValue,
      motherTongue:this.motherTongue,
      ageValue:this.ageValue,
      clearFilter:this.clearFilter
    });
  }
}
