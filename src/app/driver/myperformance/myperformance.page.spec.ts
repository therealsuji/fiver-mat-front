import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyperformancePage } from './myperformance.page';

describe('MyperformancePage', () => {
  let component: MyperformancePage;
  let fixture: ComponentFixture<MyperformancePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyperformancePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyperformancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
