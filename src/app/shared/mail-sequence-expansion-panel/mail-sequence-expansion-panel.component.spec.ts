import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailSequenceExpansionPanelComponent } from './mail-sequence-expansion-panel.component';

describe('MailSequenceExpansionPanelComponent', () => {
  let component: MailSequenceExpansionPanelComponent;
  let fixture: ComponentFixture<MailSequenceExpansionPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailSequenceExpansionPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MailSequenceExpansionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
