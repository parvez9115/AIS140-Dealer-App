import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BulkActivationPage } from './bulk-activation.page';

describe('BulkActivationPage', () => {
  let component: BulkActivationPage;
  let fixture: ComponentFixture<BulkActivationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BulkActivationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
