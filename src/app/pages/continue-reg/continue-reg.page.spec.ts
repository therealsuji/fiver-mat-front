import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContinueRegPage } from './continue-reg.page';

describe('ContinueRegPage', () => {
  let component: ContinueRegPage;
  let fixture: ComponentFixture<ContinueRegPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContinueRegPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContinueRegPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
