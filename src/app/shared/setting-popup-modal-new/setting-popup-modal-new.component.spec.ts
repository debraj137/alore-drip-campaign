import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingPopupModalNewComponent } from './setting-popup-modal-new.component';

describe('SettingPopupModalNewComponent', () => {
  let component: SettingPopupModalNewComponent;
  let fixture: ComponentFixture<SettingPopupModalNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingPopupModalNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingPopupModalNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
