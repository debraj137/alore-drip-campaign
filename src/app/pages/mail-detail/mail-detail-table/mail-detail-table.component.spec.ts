import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailDetailTableComponent } from './mail-detail-table.component';

describe('MailDetailTableComponent', () => {
  let component: MailDetailTableComponent;
  let fixture: ComponentFixture<MailDetailTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailDetailTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MailDetailTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
