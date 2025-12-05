import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild, AfterViewInit } from '@angular/core';
import * as Plot from '@observablehq/plot';

@Component({
  selector: 'app-line-chart',
  imports: [],
  templateUrl: './line-chart.html',
  styleUrl: './line-chart.scss',
  standalone: true
})
export class LineChart {
  @Input() options: any;
  @ViewChild('container') containerRef!: ElementRef;

  ngOnInit(): void {
    console.log('PlotFigure initialized with options:', this.options);
  }

  ngAfterViewInit(): void {
    this.renderPlot();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options'] && this.containerRef) {
      this.renderPlot();
    }
  }

  private renderPlot() {
    if (!this.containerRef || !this.options) {
      console.log('Cannot render plot - missing container or options');
      return;
    }

    try {
      // Clear existing content
      this.containerRef.nativeElement.innerHTML = '';

      // Generate and append the plot
      console.log('Rendering plot with options:', this.options);
      const plot = Plot.plot(this.options);
      this.containerRef.nativeElement.appendChild(plot);
      console.log('Plot rendered successfully');
    } catch (error) {
      console.error('Error rendering plot:', error);
    }
  }
}
