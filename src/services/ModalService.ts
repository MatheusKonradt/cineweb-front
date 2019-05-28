import {Subject} from 'rxjs';
import {ModalEvent, ModalEventCmd} from '@/types/ModalEvent';
import {DOMService} from '@/services/DOMService';
import {filter} from 'rxjs/internal/operators/filter';
import {MovieType} from '@/types/MovieType';

const bus$ = new Subject<ModalEvent>();

export const ModalService = {
  modal$: bus$.asObservable(),

  open(movie: MovieType) {
    bus$.next({
      cmd: ModalEventCmd.Open,
      movie,
    });
  },

  close() {
    bus$.next({
      cmd: ModalEventCmd.Close,
    });
  },
};

DOMService.windowKeyup$
  .pipe(filter((event) => event.key === 'Escape'))
  .subscribe(() => ModalService.close());
