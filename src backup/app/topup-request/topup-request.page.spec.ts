import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopupRequestPage } from './topup-request.page';

describe('TopupRequestPage', () => {
  let component: TopupRequestPage;
  let fixture: ComponentFixture<TopupRequestPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TopupRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
