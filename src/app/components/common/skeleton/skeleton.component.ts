import { Component, computed, input } from '@angular/core';
import { SkeletonTheme, SkeletonVariant } from './skeleton.component.types';

// every attribute should be a string, no normalizing done on the default theme
const defaultTheme = {
  height: '16px',
  width: '100%',
  margin: '8px 0',
};

@Component({
  selector: 'app-skeleton',
  imports: [],
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.scss',
})
export class SkeletonComponent {
  theme = input<SkeletonTheme>(defaultTheme);
  variant = input<SkeletonVariant>('rounded');

  computedTheme = computed(() => {
    let normalizedTheme = Object.entries(this.theme()).reduce(
      (acc, [key, value]) => {
        acc[key as keyof SkeletonTheme] =
          typeof value === 'number' ? `${value}px` : value;
        return acc;
      },
      {} as SkeletonTheme
    );

    switch (this.variant()) {
      case 'rounded':
        normalizedTheme.borderRadius = '6px';
        break;
      case 'circular':
        normalizedTheme.borderRadius = '50%';
        break;
      case 'rectangular':
        normalizedTheme.borderRadius = '0';
        break;
    }

    return { ...defaultTheme, ...normalizedTheme } as SkeletonTheme;
  });
}
