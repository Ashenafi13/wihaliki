import {trigger, state, animate, style, transition} from '@angular/animations';

// Fade animation
export const fade = trigger('fade', [
  state('void', style({opacity: 0})),
  transition(':enter, :leave', [
    animate(700)
  ])
]);

// Slide animation  
export const slide = trigger('slide', [
  state('void', style({transform: 'translateY(100%)'})),
  state('*', style({transform: 'translateY(0)'})),
  transition(':enter', [
    animate(300)
  ])
]);