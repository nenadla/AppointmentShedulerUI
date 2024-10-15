import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUslugaComponent } from './add-usluga.component';

describe('AddUslugaComponent', () => {
  let component: AddUslugaComponent;
  let fixture: ComponentFixture<AddUslugaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddUslugaComponent]
    });
    fixture = TestBed.createComponent(AddUslugaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
