import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GmapAddressPage } from './gmap-address.page';

describe('GmapAddressPage', () => {
  let component: GmapAddressPage;
  let fixture: ComponentFixture<GmapAddressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmapAddressPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GmapAddressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
