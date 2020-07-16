import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-category-restaurant',
  templateUrl: './category-restaurant.page.html',
  styleUrls: ['./category-restaurant.page.scss'],
})
export class CategoryRestaurantPage implements OnInit {

  constructor(private route: ActivatedRoute, private homeService: HomeService) { }

  catId;
  brandList;
  ngOnInit() {
    this.catId = this.route.snapshot.params.id;
    this.getRestaurants();
  }

  getRestaurants() {
    const access_token = localStorage.getItem('access_token');

    this.homeService.getRestaurantFromCategory(access_token, this.catId).subscribe(res => {
      this.brandList = res;
      console.log(res);

    })
  }
}
