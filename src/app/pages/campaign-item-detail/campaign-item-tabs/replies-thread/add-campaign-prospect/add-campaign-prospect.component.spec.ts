import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCampaignProspectComponent } from './add-campaign-prospect.component';

describe('AddCampaignProspectComponent', () => {
  let component: AddCampaignProspectComponent;
  let fixture: ComponentFixture<AddCampaignProspectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCampaignProspectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCampaignProspectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
