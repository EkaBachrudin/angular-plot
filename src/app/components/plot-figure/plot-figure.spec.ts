import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotFigure } from './plot-figure';

describe('PlotFigure', () => {
  let component: PlotFigure;
  let fixture: ComponentFixture<PlotFigure>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlotFigure]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlotFigure);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
