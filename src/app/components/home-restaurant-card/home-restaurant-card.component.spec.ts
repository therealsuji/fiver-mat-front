import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeRestaurantCardComponent } from './home-restaurant-card.component';

describe('HomeRestaurantCardComponent', () => {
  let component: HomeRestaurantCardComponent;
  let fixture: ComponentFixture<HomeRestaurantCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeRestaurantCardComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeRestaurantCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
