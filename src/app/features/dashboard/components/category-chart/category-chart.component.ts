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
import { isPlatformBrowser } from '@angular/common';
import { ThemeService } from '../../../../shared/services/theme.service';
import {
  FinanceMockService,
  CategorySpending,
} from '../../../../shared/services/finance-mock.service';
import ApexCharts from 'apexcharts';

@Component({
  selector: 'app-category-chart',
  templateUrl: './category-chart.component.html',
  standalone: true,
})
export class CategoryChartComponent implements AfterViewInit, OnDestroy {
  @ViewChild('chartEl') chartEl!: ElementRef;

  private themeService = inject(ThemeService);
  private financeService = inject(FinanceMockService);
  private platformId = inject(PLATFORM_ID);
  private chart: ApexCharts | null = null;

  protected categories: CategorySpending[] = this.financeService.getCategorySpending();
  protected total = this.categories.reduce((s, c) => s + c.amount, 0);

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
    return {
      chart: { background: 'transparent' },
      legend: { labels: { colors: labelColor } },
      tooltip: { theme: isDark ? 'dark' : 'light' },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              total: {
                label: 'Total Spent',
                color: labelColor,
              },
              value: { color: isDark ? '#f9fafb' : '#111827' },
            },
          },
        },
      },
    };
  }

  private initChart(): void {
    const isDark = this.themeService.darkMode();
    const labelColor = isDark ? '#9ca3af' : '#6b7280';

    const options = {
      series: this.categories.map((c) => c.amount),
      labels: this.categories.map((c) => c.category),
      colors: this.categories.map((c) => c.color),
      chart: {
        type: 'donut',
        height: 300,
        background: 'transparent',
        fontFamily: 'inherit',
        toolbar: { show: false },
        animations: { enabled: true, easing: 'easeinout', speed: 700 },
      },
      plotOptions: {
        pie: {
          donut: {
            size: '68%',
            labels: {
              show: true,
              name: { show: true, fontSize: '13px', color: labelColor },
              value: {
                show: true,
                fontSize: '18px',
                fontWeight: 700,
                color: isDark ? '#f9fafb' : '#111827',
                formatter: (val: string) => `$${parseFloat(val).toFixed(0)}`,
              },
              total: {
                show: true,
                label: 'Total Spent',
                fontSize: '12px',
                color: labelColor,
                formatter: () => `$${this.total.toFixed(0)}`,
              },
            },
          },
        },
      },
      dataLabels: { enabled: false },
      legend: {
        show: true,
        position: 'bottom',
        fontSize: '12px',
        labels: { colors: labelColor },
        itemMargin: { horizontal: 6, vertical: 2 },
      },
      tooltip: {
        theme: isDark ? 'dark' : 'light',
        y: {
          formatter: (val: number) => {
            const pct = ((val / this.total) * 100).toFixed(1);
            return `$${val.toFixed(2)} (${pct}%)`;
          },
        },
      },
      stroke: { width: 2, colors: [isDark ? '#1f2937' : '#ffffff'] },
    };

    this.chart = new ApexCharts(this.chartEl.nativeElement, options);
    this.chart.render();
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }
}
