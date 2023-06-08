import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BundleCrudComponent } from './bundle-crud.component';

describe('BundleCrudComponent', () => {
  let component: BundleCrudComponent;
  let fixture: ComponentFixture<BundleCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BundleCrudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BundleCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
