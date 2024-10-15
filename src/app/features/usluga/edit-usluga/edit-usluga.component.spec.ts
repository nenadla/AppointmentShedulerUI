import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUslugaComponent } from './edit-usluga.component';

describe('EditUslugaComponent', () => {
  let component: EditUslugaComponent;
  let fixture: ComponentFixture<EditUslugaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditUslugaComponent]
    });
    fixture = TestBed.createComponent(EditUslugaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
