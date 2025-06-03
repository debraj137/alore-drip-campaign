import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastNotificationItemComponent } from './toast-notification-item.component';

describe('ToastNotificationItemComponent', () => {
  let component: ToastNotificationItemComponent;
  let fixture: ComponentFixture<ToastNotificationItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToastNotificationItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastNotificationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
