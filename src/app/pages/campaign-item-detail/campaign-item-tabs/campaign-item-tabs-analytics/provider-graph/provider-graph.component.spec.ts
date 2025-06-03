import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderGraphComponent } from './provider-graph.component';

describe('ProviderGraphComponent', () => {
  let component: ProviderGraphComponent;
  let fixture: ComponentFixture<ProviderGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
