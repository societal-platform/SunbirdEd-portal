import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorePdfViewComponent } from './explore-pdf-view.component';

describe('ExplorePdfViewComponent', () => {
  let component: ExplorePdfViewComponent;
  let fixture: ComponentFixture<ExplorePdfViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExplorePdfViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplorePdfViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
