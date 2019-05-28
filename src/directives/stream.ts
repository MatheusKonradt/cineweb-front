import {DirectiveOptions} from 'vue';
import {Subject} from 'rxjs';

export const stream: DirectiveOptions = {
  inserted($el, node) {
    if (!node.arg) {
      throw new Error('Stream directive requires an event name argument.');
    }
    if (!(node.value instanceof Subject) ) {
      throw new Error('Stream directive should receive an RXJS Subject as argument.');
    }
    $el.addEventListener(node.arg, (event) => node.value.next(event));
  },
};
