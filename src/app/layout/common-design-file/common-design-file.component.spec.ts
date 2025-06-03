import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonDesignFileComponent } from './common-design-file.component';

describe('CommonDesignFileComponent', () => {
  let component: CommonDesignFileComponent;
  let fixture: ComponentFixture<CommonDesignFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonDesignFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonDesignFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
