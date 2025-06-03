import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailSequenceDetailComponent } from './mail-sequence-detail.component';

describe('MailSequenceDetailComponent', () => {
  let component: MailSequenceDetailComponent;
  let fixture: ComponentFixture<MailSequenceDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailSequenceDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MailSequenceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
