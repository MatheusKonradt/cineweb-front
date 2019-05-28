import {ModalEventCmd} from "./types/ModalEvent";
<template>
  <div id="app">
    <Header/>
    <router-view/>
    <Modal />
  </div>
</template>

<style lang="scss">
  @import "assets/scss/gradient";
  @import "assets/scss/theme";

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: $color-text-primary;
    max-width: 1300px;
    min-width: 900px;
    margin: auto;
  }

  body, html {
    @include gradient($color-primary, $color-secondary);
    margin: 0;
    padding: 0;
  }
</style>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Header from '@/components/Header.vue';
import Modal from '@/components/Modal.vue';

@Component({
  components: {Modal, Header},
})
export default class App extends Vue {

}
</script>
