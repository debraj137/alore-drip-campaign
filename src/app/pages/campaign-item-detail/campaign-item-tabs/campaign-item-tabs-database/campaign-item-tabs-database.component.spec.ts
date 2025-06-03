import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignItemTabsDatabaseComponent } from './campaign-item-tabs-database.component';

describe('CampaignItemTabsDatabaseComponent', () => {
  let component: CampaignItemTabsDatabaseComponent;
  let fixture: ComponentFixture<CampaignItemTabsDatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignItemTabsDatabaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignItemTabsDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
