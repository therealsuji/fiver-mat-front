import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home-cuisine-tile',
  templateUrl: './home-cuisine-tile.component.html',
  styleUrls: ['./home-cuisine-tile.component.scss'],
})
export class HomeCuisineTileComponent implements OnInit {

  @Input() groceryName:string;

  constructor() { }

  ngOnInit() { }

}
