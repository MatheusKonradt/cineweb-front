import {MovieType} from '@/types/MovieType';

export enum ModalEventCmd {
  Open,
  Close,
  Toggle,
}

export interface ModalEvent {
  cmd: ModalEventCmd;
  movie?: MovieType;
}
