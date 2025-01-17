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
    if(this.loading){return;}
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

  async getMatches() {
    const userId = await this.authService.getUserId();
    await this.loadFilters();
    this.masterMatches = this.matchService.getAllUsers(userId).subscribe((res) => {
      this.masterMatches = res;
      this.matches = res;
      this.loading = false;
    });
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
