import { Component, OnInit, Input } from '@angular/core';
import { GlobalVar } from 'src/app/global';

@Component({
  selector: 'app-home-carousel',
  templateUrl: './home-carousel.component.html',
  styleUrls: ['./home-carousel.component.scss'],
})
export class HomeCarouselComponent implements OnInit {

  @Input() images:any[];
  imageUrl = GlobalVar.backend_image_url;

  constructor() { }
  slideOpts = {
    initialSlide: 1,
    speed: 400,
    loop: true,

  };
  
  ngOnInit() { }

}
