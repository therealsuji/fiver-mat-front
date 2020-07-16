import { Component, OnInit } from "@angular/core";
import { MatchesService } from "src/app/services/matches.service";
import { ModalController } from "@ionic/angular";
import { MatchModalComponent } from "src/app/componenets/match-modal/match-modal.component";
import { UserAuth } from "src/app/services/user-auth.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  constructor(private authService: UserAuth, private matchService: MatchesService, private modalCtrl: ModalController) {}

  matches;
  loading = true;
  ngOnInit() {
     this.getMatches();
  }

  async getMatches() {
    const userId = await this.authService.getUserId();
    this.matches = await this.matchService.getAllOppositeGenderUsers(userId).toPromise();
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
}
