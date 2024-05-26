import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPricesBusinessComponent } from './product-prices-business.component';

describe('ProductPricesBusinessComponent', () => {
  let component: ProductPricesBusinessComponent;
  let fixture: ComponentFixture<ProductPricesBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductPricesBusinessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductPricesBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
