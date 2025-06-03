import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyLinksClickComponent } from './daily-links-click.component';

describe('DailyLinksClickComponent', () => {
  let component: DailyLinksClickComponent;
  let fixture: ComponentFixture<DailyLinksClickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyLinksClickComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyLinksClickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
