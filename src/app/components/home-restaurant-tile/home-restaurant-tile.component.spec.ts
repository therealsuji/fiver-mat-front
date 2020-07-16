import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeRestaurantTileComponent } from './home-restaurant-tile.component';

describe('HomeResturantTileComponent', () => {
  let component: HomeRestaurantTileComponent;
  let fixture: ComponentFixture<HomeRestaurantTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeRestaurantTileComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeRestaurantTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
