import {
  Component,
  inject,
  OnDestroy,
  AfterViewInit,
  ElementRef,
  ViewChild,
  effect,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser, DecimalPipe } from '@angular/common';
import { ThemeService } from '../../../../shared/services/theme.service';
import { FinanceMockService } from '../../../../shared/services/finance-mock.service';
import ApexCharts from 'apexcharts';

@Component({
  selector: 'app-spending-trend-chart',
  templateUrl: './spending-trend-chart.component.html',
  standalone: true,
  imports: [DecimalPipe],
})
export class SpendingTrendChartComponent implements AfterViewInit, OnDestroy {
  @ViewChild('chartEl') chartEl!: ElementRef;

  private themeService = inject(ThemeService);
  private financeService = inject(FinanceMockService);
  private platformId = inject(PLATFORM_ID);
  private chart: ApexCharts | null = null;

  protected data = this.financeService.getDailySpending();

  constructor() {
    effect(() => {
      const isDark = this.themeService.darkMode();
      if (this.chart) {
        this.chart.updateOptions(this.buildThemeOptions(isDark), false, false);
      }
    });
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initChart();
    }
  }

  private buildThemeOptions(isDark: boolean) {
    const labelColor = isDark ? '#9ca3af' : '#6b7280';
    const gridColor = isDark ? '#374151' : '#f3f4f6';
    return {
      chart: { background: 'transparent' },
      grid: { borderColor: gridColor },
      xaxis: { labels: { style: { colors: labelColor } }, axisBorder: { color: gridColor }, axisTicks: { color: gridColor } },
      yaxis: { labels: { style: { colors: labelColor } } },
      legend: { labels: { colors: labelColor } },
      tooltip: { theme: isDark ? 'dark' : 'light' },
    };
  }

  private initChart(): void {
    const isDark = this.themeService.darkMode();
    const labels = this.data.map(d => d.label);
    const daily = this.data.map(d => d.amount);
    const cumulative = this.data.map(d => d.cumulative);
    const labelColor = isDark ? '#9ca3af' : '#6b7280';
    const gridColor = isDark ? '#374151' : '#f3f4f6';

    const options = {
      series: [
        { name: 'Daily Spending', type: 'bar', data: daily },
        { name: 'Cumulative', type: 'line', data: cumulative },
      ],
      chart: {
        height: 300,
        type: 'line',
        background: 'transparent',
        toolbar: { show: false },
        fontFamily: 'inherit',
        animations: { enabled: true, easing: 'easeinout', speed: 700 },
      },
      colors: ['#14b8a6', '#0d9488'],
      stroke: { width: [0, 2.5], curve: 'smooth' },
      fill: {
        type: ['solid', 'gradient'],
        opacity: [0.85, 1],
      },
      plotOptions: {
        bar: { columnWidth: '55%', borderRadius: 4, borderRadiusApplication: 'end' },
      },
      dataLabels: { enabled: false },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'right',
        labels: { colors: labelColor },
      },
      xaxis: {
        categories: labels,
        tickAmount: 10,
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: { style: { colors: labelColor, fontSize: '11px' }, rotate: 0 },
      },
      yaxis: [
        {
          title: { text: 'Daily ($)', style: { color: labelColor, fontSize: '11px', fontWeight: 400 } },
          labels: {
            style: { colors: labelColor, fontSize: '11px' },
            formatter: (val: number) => `$${val.toFixed(0)}`,
          },
        },
        {
          opposite: true,
          title: { text: 'Cumulative ($)', style: { color: labelColor, fontSize: '11px', fontWeight: 400 } },
          labels: {
            style: { colors: labelColor, fontSize: '11px' },
            formatter: (val: number) => `$${val.toFixed(0)}`,
          },
        },
      ],
      tooltip: {
        shared: true,
        intersect: false,
        theme: isDark ? 'dark' : 'light',
        y: { formatter: (val: number) => `$${val.toFixed(2)}` },
      },
      grid: {
        borderColor: gridColor,
        strokeDashArray: 4,
        padding: { left: 4, right: 4 },
      },
    };

    this.chart = new ApexCharts(this.chartEl.nativeElement, options);
    this.chart.render();
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }
}
