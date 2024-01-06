import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeviceActivationRequestPage } from './device-activation-request.page';

describe('DeviceActivationRequestPage', () => {
  let component: DeviceActivationRequestPage;
  let fixture: ComponentFixture<DeviceActivationRequestPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DeviceActivationRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
