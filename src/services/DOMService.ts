import {fromEvent} from 'rxjs';

export const DOMService = {
  windowScroll$: fromEvent<Event>(window, 'scroll'),
  windowKeyup$: fromEvent<KeyboardEvent>(window, 'keyup'),
  disableBodyScroll() {
    const $body  = document.getElementById('app-body');
    if ($body) {
      $body.style.overflowY = 'hidden';
    }
  },
  enableBodyScroll() {
    const $body  = document.getElementById('app-body');
    if ($body) {
      $body.style.overflowY = 'scroll';
    }
  },
};
