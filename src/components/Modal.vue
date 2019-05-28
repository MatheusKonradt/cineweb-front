<template>
    <transition name="fade">
        <div class="modal" v-if="visible">
            <div class="modal-bg" :class="{off: loading}" :style="{backgroundImage: `url(${movie.backdrop})`}"></div>
            <div class="modal-overlay" :class="{off: loading}"></div>
            <section class="modal-content">
                <div class="modal-ripple-section" v-show="loading">
                    <Ripple />
                </div>
                <div class="modal-content-wrapper" v-show="!loading">
                    <div class="content-left">
                        <div class="video-section" v-if="movie.video">
                            <iframe class="video" :src="movie.video" frameborder="0" allow="autoplay; encrypted-media; gyroscope" allowfullscreen></iframe>
                        </div>
                        <img v-if="!movie.video && movie.poster" class="modal-poster" :src="movie.poster" :alt="movie.title">
                        <img v-if="!movie.video && !movie.poster" class="modal-poster" src="../assets/noimage.jpg" :alt="movie.title">
                    </div>
                    <div class="content-right">
                        <h2>{{movie.title}}</h2>
                        <div class="movie-rating">
                            <Rating :stars="5" :val="movie.rating" :max="10" />
                        </div>
                        <div>
                            <Tag v-for="genre in movie.genres" :key="genre.id">{{genre.name}}</Tag>
                        </div>
                        <p>{{movie.overview}}</p>
                    </div>
                </div>
            </section>
            <Icon type="close" class="close-icon" @click.native="close" />
        </div>
    </transition>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {ModalService} from '@/services/ModalService';
  import {ModalEventCmd} from '@/types/ModalEvent';
  import {MovieType} from '@/types/MovieType';
  import Rating from '@/components/Rating.vue';
  import Icon from '@/components/Icon.vue';
  import {DOMService} from '@/services/DOMService';
  import Ripple from '@/components/Ripple.vue';
  import {MoviesService} from '@/services/MoviesService';
  import Tag from '@/components/Tag.vue';

  @Component({
    components: {
      Tag,
      Ripple,
      Icon,
      Rating,
    },
    props: {
    },
  })
  export default class Modal extends Vue {
    public visible: boolean = false;
    public movie?: MovieType;
    public loading: boolean = false;
    public error: boolean = false;

    public created() {
      ModalService.modal$.subscribe((event) => {
        switch (event.cmd) {
          case ModalEventCmd.Open:
            this.movie = event.movie;
            this.open();
            break;
          case ModalEventCmd.Close:
            this.close();
            break;
        }
      });
    }

    public open() {
      if (this.movie) {
        DOMService.disableBodyScroll();
        this.visible = true;
        this.loading = true;
        MoviesService.details$({id: this.movie.id }).subscribe((data) => {
          this.loading = false;
          this.movie = data.response.movie;
        }, () => {
          this.loading = false;
          this.error = true;
        });
      }
    }

    public close() {
      DOMService.enableBodyScroll();
      this.visible = false;
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="scss">

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: black;
    }

    .close-icon {
        position: absolute;
        top: 20px;
        right: 20px;
        cursor: pointer;
    }

    .modal-overlay {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: black;
        opacity: .6;
        transition: all .5s;

        &.off {
            opacity: 0;
        }
    }

    .modal-bg {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center ;
        background-color: black;
    }

    .modal-content {
        display: flex;
        flex-direction: row;
        height: 100%;
        padding: 100px 40px;
        box-sizing: border-box;
        position: relative;
    }

    .modal-content-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: center;
        width: 100%;
    }

    .video-section {
        padding-top: 56.25%;
        width: 100%;
        position: relative;
        overflow: hidden;
        border-radius: 5px;
        box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.9);
        background: black;

        .video {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            right: 0;
        }
    }

    .modal-poster {
        height: auto;
        width: auto;
        display: inline-block;
        max-width: 400px;
        max-height: 600px;
        margin: auto;
        border-radius: 5px;
        box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.9);
        background: black;
    }

    .content-left {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 50%;
        text-align: right;
    }

    .content-right {
        text-align: left;
        padding: 0 20px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 50%;
        max-width: 800px;

        .movie-rating {
            margin: 0 0 10px 0;
        }

        .text-section-title {
            max-width: 600px;
            h2 {
                margin: 15px 0 10px 0;
            }
        }
    }


    .modal-ripple-section {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

</style>
