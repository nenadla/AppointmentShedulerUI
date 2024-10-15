import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UslugaListComponent } from './usluga-list.component';

describe('UslugaListComponent', () => {
  let component: UslugaListComponent;
  let fixture: ComponentFixture<UslugaListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UslugaListComponent]
    });
    fixture = TestBed.createComponent(UslugaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
