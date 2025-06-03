import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewCampaignBaseComponent } from './create-new-campaign-base.component';

describe('CreateNewCampaignBaseComponent', () => {
  let component: CreateNewCampaignBaseComponent;
  let fixture: ComponentFixture<CreateNewCampaignBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewCampaignBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewCampaignBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
