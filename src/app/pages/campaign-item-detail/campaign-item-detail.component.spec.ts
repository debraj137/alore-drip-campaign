import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignItemDetailComponent } from './campaign-item-detail.component';

describe('CampaignItemDetailComponent', () => {
  let component: CampaignItemDetailComponent;
  let fixture: ComponentFixture<CampaignItemDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignItemDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignItemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
