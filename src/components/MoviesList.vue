<template>
    <div v-infinite-scroll="paginate" infinite-scroll-disabled="busy" infinite-scroll-distance="300">
        <transition-group name="list" tag="ul" class="movies-list">
            <MoviesListItem class="list" v-for="(movie, i) in movies" :key="movie.id + '-' + i" :movie="movie"/>
        </transition-group>
        <Ripple v-show="loading" />
        <h2 v-if="error">Something went wrong...</h2>
        <h2 v-if="finished">Amazing! You've seen all the movies from this page.</h2>
    </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
  import {MoviesService} from '@/services/MoviesService';
  import {MovieType} from '@/types/MovieType';
  import MoviesListItem from '@/components/MoviesListItem.vue';
  import infiniteScroll from 'vue-infinite-scroll';
  import Ripple from '@/components/Ripple.vue';
  import {delay} from 'rxjs/operators';

  @Component({
    components: {Ripple, MoviesListItem},
    directives: {infiniteScroll},
    props: {
      path: String,
      opts: Object,
    },
  })
  export default class MoviesList extends Vue {
    @Prop() public path!: string;
    @Prop() public opts!: object;

    public movies: MovieType[] = [];
    public page: number = 1;
    public busy: boolean = false;
    public loading: boolean = false;
    public error: boolean = false;
    public finished: boolean = false;

    @Watch('opts')
    public refresh() {
      this.page = 1;
      this.finished = false;
      this.error = false;
      this.movies = [];
      this.paginate();
    }

    public paginate() {
      this.busy = true;
      this.loading = true;
      MoviesService.list$(this.path, {page: this.page, ...(this.opts || {})})
        .pipe(delay(1000))
        .subscribe((ajax) => {
          this.loading = false;
          this.movies.push(...ajax.response.results);
          if (ajax.response.results.length) {
            this.busy = false;
            this.page++;
          } else {
            this.finished = true;
          }
        }, () => {
          this.error = true;
          this.loading = false;
          this.finished = false;
        });
    }

  }
</script>

<style scoped lang="scss">
    @import "../assets/scss/theme";

    ul.movies-list {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        margin: 0;
        padding: 0;

        .list-enter-active {
            transition: all 1s;
        }

        .list-enter, .list-leave-to {
            opacity: 0;
        }
    }
</style>
