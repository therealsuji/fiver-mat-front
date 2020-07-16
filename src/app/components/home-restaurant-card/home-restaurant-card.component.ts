import { Component, OnInit, Input } from '@angular/core';
import { GlobalVar } from 'src/app/global';

@Component({
  selector: 'app-home-restaurant-card',
  templateUrl: './home-restaurant-card.component.html',
  styleUrls: ['./home-restaurant-card.component.scss'],
})
export class HomeRestaurantCardComponent implements OnInit {

  @Input() mbbrName: string;
  @Input() mbbrStatus: number;
  @Input() mbbrLogopath: string;
  @Input() availableHours: string;
  @Input() starRate: string;
  @Input() brandCategories: any[];
  imageUrl = GlobalVar.backend_image_url;


  constructor() { }

  ngOnInit() { }

}
