import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrderlineComponent } from './edit-orderline.component';

describe('EditOrderlineComponent', () => {
  let component: EditOrderlineComponent;
  let fixture: ComponentFixture<EditOrderlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditOrderlineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditOrderlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
