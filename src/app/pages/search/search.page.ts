import { Component, OnInit } from "@angular/core";
import { MatchesService } from "src/app/services/matches.service";
import { ModalController } from "@ionic/angular";
import { MatchModalComponent } from "src/app/componenets/match-modal/match-modal.component";
import { FilterModalComponent } from "src/app/componenets/filter-modal/filter-modal.component";
import { UserDetailsService } from "src/app/services/user-details.service";
import { UserAuth } from "src/app/services/user-auth.service";
import * as moment from "moment";

@Component({
  selector: "app-search",
  templateUrl: "./search.page.html",
  styleUrls: ["./search.page.scss"],
})
export class SearchPage implements OnInit {
  constructor(private authService: UserAuth, private matchService: MatchesService, private modalCtrl: ModalController, private userDetails: UserDetailsService) {}
  matches = [];
  masterMatches;

  martialStatus;
  motherTongue;
  loading = true;
  ngOnInit() {
    this.loadFilters();
    this.getMatches();
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
    const modal = await this.modalCtrl.create({
      component: FilterModalComponent,
      componentProps: {
        martialStatusDropDownValues: this.martialStatus,
        motherTongueDropDownValues: this.motherTongue,
      },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    console.log(data);

    if (data != undefined) {
      this.matches = this.masterMatches.filter((res) => {
        let regexExpression = new RegExp(data.nameValue, "g");
        if (res.name.match(regexExpression) && data.nameValue != undefined) {
          return res;
        }
        if (res.martial_status == data.martialValue  && data.martialValue != undefined) {
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
    this.userDetails.getMartialStatus().subscribe((res) => {
      this.martialStatus = res;
    });
    this.userDetails.getLanguage().subscribe((res) => {
      this.motherTongue = res;
    });
  }

  async getMatches() {
    const userId = await this.authService.getUserId();
    this.masterMatches = this.matchService.getAllUsers(userId).subscribe((res) => {
      this.masterMatches = res;
      this.matches = res;
      this.loading = false;
    });
  }

  async doRefresh(event) {
    await this.getMatches();
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }
}
