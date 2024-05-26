import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPricesCustomerComponent } from './product-prices-customer.component';

describe('ProductPricesCustomerComponent', () => {
  let component: ProductPricesCustomerComponent;
  let fixture: ComponentFixture<ProductPricesCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductPricesCustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductPricesCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
