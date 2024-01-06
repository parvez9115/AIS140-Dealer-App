import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RenewalRequestPage } from './renewal-request.page';

describe('RenewalRequestPage', () => {
  let component: RenewalRequestPage;
  let fixture: ComponentFixture<RenewalRequestPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RenewalRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
