import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeCuisineTileComponent } from './home-cuisine-tile.component';

describe('HomeCusineTileComponent', () => {
  let component: HomeCuisineTileComponent;
  let fixture: ComponentFixture<HomeCuisineTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeCuisineTileComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeCuisineTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
