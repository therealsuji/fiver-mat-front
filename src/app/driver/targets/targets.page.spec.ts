import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TargetsPage } from './targets.page';

describe('TargetsPage', () => {
  let component: TargetsPage;
  let fixture: ComponentFixture<TargetsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TargetsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
