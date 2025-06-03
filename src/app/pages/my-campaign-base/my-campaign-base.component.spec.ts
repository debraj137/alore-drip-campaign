import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCampaignBaseComponent } from './my-campaign-base.component';

describe('MyCampaignBaseComponent', () => {
  let component: MyCampaignBaseComponent;
  let fixture: ComponentFixture<MyCampaignBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCampaignBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCampaignBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
