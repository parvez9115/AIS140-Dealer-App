import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExtOneYearPage } from './ext-one-year.page';

describe('ExtOneYearPage', () => {
  let component: ExtOneYearPage;
  let fixture: ComponentFixture<ExtOneYearPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ExtOneYearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
