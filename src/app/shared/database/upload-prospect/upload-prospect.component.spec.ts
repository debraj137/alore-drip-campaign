import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadProspectComponent } from './upload-prospect.component';

describe('UploadProspectComponent', () => {
  let component: UploadProspectComponent;
  let fixture: ComponentFixture<UploadProspectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadProspectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadProspectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
