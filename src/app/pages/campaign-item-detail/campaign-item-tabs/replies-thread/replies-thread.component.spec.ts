import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepliesThreadComponent } from './replies-thread.component';

describe('RepliesThreadComponent', () => {
  let component: RepliesThreadComponent;
  let fixture: ComponentFixture<RepliesThreadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepliesThreadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepliesThreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
