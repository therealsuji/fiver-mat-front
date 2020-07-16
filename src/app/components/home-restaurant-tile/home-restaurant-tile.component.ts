import { Component, OnInit, Input } from '@angular/core';
import { GlobalVar } from 'src/app/global';

@Component({
  selector: 'app-home-restaurant-tile',
  templateUrl: './home-restaurant-tile.component.html',
  styleUrls: ['./home-restaurant-tile.component.scss'],
})
export class HomeRestaurantTileComponent implements OnInit {

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
