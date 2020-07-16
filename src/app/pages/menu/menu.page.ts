import { Component, OnInit } from "@angular/core";
import { UserAuth } from "src/app/services/user-auth.service";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.page.html",
  styleUrls: ["./menu.page.scss"],
})
export class MenuPage implements OnInit {
  constructor(private authService: UserAuth) {}
  userName;

  ngOnInit() {
    this.userName = this.authService.getUserName();
  }

  logout() {
    this.authService.logout();
  }
}
