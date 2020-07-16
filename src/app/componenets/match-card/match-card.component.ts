import { Component, OnInit, Input } from "@angular/core";
import * as moment from "moment";
import { ConstantsService } from "src/app/services/constants.service";
@Component({
  selector: "app-match-card",
  templateUrl: "./match-card.component.html",
  styleUrls: ["./match-card.component.scss"],
})
export class MatchCardComponent implements OnInit {
  constructor(private constants: ConstantsService) {}
  @Input() user;
  dob;
  ngOnInit() {
    this.user.profile_pic = this.constants.baseImageUrl + this.user.profile_pic;
    this.dob = moment().diff(this.user.dob, "years");
  }
}
