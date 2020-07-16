import { Component, OnInit } from "@angular/core";
import { MatchesService } from "src/app/services/matches.service";
import { ModalController } from "@ionic/angular";
import { MatchModalComponent } from "src/app/componenets/match-modal/match-modal.component";
import { UserAuth } from "src/app/services/user-auth.service";
import { FilterModalComponent } from "src/app/componenets/filter-modal/filter-modal.component";
import * as moment from "moment";
import { UserDetailsService } from "src/app/services/user-details.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  constructor(private authService: UserAuth, private matchService: MatchesService, private modalCtrl: ModalController, private userDetails: UserDetailsService) {}

  matches;
  loading = true;
  masterMatches;
  martialStatus;
  motherTongue;
  ngOnInit() {
    this.getMatches();
  }

  async getMatches() {
    const userId = await this.authService.getUserId();
    await this.loadFilters();
    this.matches = await this.matchService.getAllOppositeGenderUsers(userId).toPromise();
    this.masterMatches = this.matches;
    this.loading = false;
  }

  async openMatch(item) {
    const modal = await this.modalCtrl.create({
      component: MatchModalComponent,
      componentProps: {
        item,
      },
    });
    return await modal.present();
  }

  async openSearch() {
    if (this.loading) {
      return;
    }
    const modal = await this.modalCtrl.create({
      component: FilterModalComponent,
      componentProps: {
        martialStatusDropDownValues: this.martialStatus,
        motherTongueDropDownValues: this.motherTongue,
      },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
     if(data.clearFilter){
       this.matches = this.masterMatches;
       return;
     } 
    if (data != undefined) {
      this.matches = this.masterMatches.filter((res) => {
        let regexExpression = new RegExp(data.nameValue, "g");
        if (res.name.match(regexExpression) && data.nameValue != undefined) {
          return res;
        }
        if (res.martial_status == data.martialValue && data.martialValue != undefined) {
          return res;
        }
        let age = moment().diff(res.dob, "years");
        if (age == data.ageValue && data.martialValue != undefined) {
          return res;
        }
        regexExpression = new RegExp(data.martialValue, "g");
        if (res.martial_status.match(regexExpression) && data.martialValue != undefined) {
          return res;
        }
      });
    } 
  }
  async loadFilters() {
    this.martialStatus = await this.userDetails.getMartialStatus().toPromise();
    this.motherTongue = await this.userDetails.getLanguage().toPromise();
  }
  async doRefresh(event) {
    this.loading = true;
    await this.getMatches();
    setTimeout(() => {
      this.loading = false;
      event.target.complete();
    }, 500);
  }
}
