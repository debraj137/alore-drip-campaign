import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyStateMsgComponent } from './empty-state-msg.component';

describe('EmptyStateMsgComponent', () => {
  let component: EmptyStateMsgComponent;
  let fixture: ComponentFixture<EmptyStateMsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyStateMsgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyStateMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
