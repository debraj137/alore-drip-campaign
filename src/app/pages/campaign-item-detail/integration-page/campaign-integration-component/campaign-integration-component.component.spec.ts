import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignIntegrationComponentComponent } from './campaign-integration-component.component';

describe('CampaignIntegrationComponentComponent', () => {
  let component: CampaignIntegrationComponentComponent;
  let fixture: ComponentFixture<CampaignIntegrationComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignIntegrationComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignIntegrationComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
