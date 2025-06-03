import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignItemTabsMailSequenceComponent } from './campaign-item-tabs-mail-sequence.component';

describe('CampaignItemTabsMailSequenceComponent', () => {
  let component: CampaignItemTabsMailSequenceComponent;
  let fixture: ComponentFixture<CampaignItemTabsMailSequenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignItemTabsMailSequenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignItemTabsMailSequenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
