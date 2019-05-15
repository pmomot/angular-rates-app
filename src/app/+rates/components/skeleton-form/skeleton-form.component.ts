import { Component, ChangeDetectionStrategy } from '@angular/core';
import { trackByIndex } from '../../../shared/utils/track-by-index';

@Component({
  selector: 'app-skeleton-form',
  template: `
    <div
      class="form-group"
      *ngFor="let i of 4 | numberToArray; trackBy: trackByIndex"
    >
      <div class="form-group__label skeleton-block skeleton-block--low"></div>
      <div class="skeleton-block skeleton-block--normal"></div>
    </div>
  `,
  styleUrls: ['./skeleton-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkeletonFormComponent {
  readonly trackByIndex = trackByIndex;
}
