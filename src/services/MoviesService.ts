import {ajax} from 'rxjs/ajax';
import * as QS from 'querystring';

export const MoviesService = {
    list$(path: string, opts?: {page?: number}) {
        const qs = QS.stringify(opts);
        return ajax(`${process.env.VUE_APP_API_URL}/movies/${path}?${qs}`);
    },

    details$(opts: {id: number}) {
        return ajax(`${process.env.VUE_APP_API_URL}/movies/${opts.id}`);
    },
};
