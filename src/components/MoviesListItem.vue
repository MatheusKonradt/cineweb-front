<template>
    <li class="movies-list-item">
        <div class="movie-poster" @click="openModal">
            <img v-if="!movie.poster" src="../assets/noimage.jpg" :alt="movie.title">
            <img v-if="movie.poster" :src="movie.poster" :alt="movie.title">
            <div class="movie-poster-overlay">
                <Rating :stars="5" :val="movie.rating" :max="10" />
                <span>{{ movie.rating }}/10 ({{ movie.votes }} votes)</span>
            </div>
        </div>
        <h3 :title="movie.title">{{ movie.title }}</h3>
        <span title="Release date" class="movie-release-date">{{ movie.release }}</span>
    </li>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {MovieType} from '@/types/MovieType';
import Rating from '@/components/Rating.vue';
import {ModalService} from '@/services/ModalService';

@Component({
  components: {Rating},
  props: {
    movie: Object,
  },
})
export default class MoviesListItem extends Vue {
  @Prop() public movie!: MovieType;

  public openModal() {
    ModalService.open(this.movie);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    @import "../assets/scss/theme";

    $ratio: 150/225;
    $card-width: 210;

    li.movies-list-item {
        width: $card-width + px;
        list-style: none;
        margin: 20px;
        text-overflow: ellipsis;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-around;

        .movie-poster {
            box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.75);
            position: relative;
            width: 100%;
            height: ($card-width / $ratio) + px;
            background-position: center center;
            background-size: 100%;
            cursor: pointer;

            .movie-poster-overlay {
                width: 100%;
                height: 100%;
                background: #000;
                opacity: 0;
                position: absolute;
                top: 0;
                transition: all .3s;
                border: 2px solid #fff;
                box-sizing: border-box;
                border-radius: 3px;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }

            &:hover {
                .movie-poster-overlay {
                    opacity: .7;
                }
            }

            img {
                width: 100%;
                height: 100%;
                box-sizing: border-box;
                cursor: pointer;
                display: block;
                border-radius: 3px;
            }
        }

        h3 {
            margin: 5px 0 0 0;
            padding: 0;
            text-align: left;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 100%;
            overflow: hidden;
            font-size: 1em;
            cursor: default;
        }

        .movie-release-date {
            color: $color-text-disabled;
            text-align: left;
            font-size: .8em;
            cursor: default;
        }
    }
</style>
