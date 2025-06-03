import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailEditorRecomendationsComponent } from './email-editor-recomendations.component';

describe('EmailEditorRecomendationsComponent', () => {
  let component: EmailEditorRecomendationsComponent;
  let fixture: ComponentFixture<EmailEditorRecomendationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailEditorRecomendationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailEditorRecomendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
