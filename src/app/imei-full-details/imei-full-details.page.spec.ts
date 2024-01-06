import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImeiFullDetailsPage } from './imei-full-details.page';

describe('ImeiFullDetailsPage', () => {
  let component: ImeiFullDetailsPage;
  let fixture: ComponentFixture<ImeiFullDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ImeiFullDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
