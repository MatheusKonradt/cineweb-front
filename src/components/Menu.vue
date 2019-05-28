<template>
  <ul class="menu">
    <li v-for="item in items"><router-link :to="item.to">{{ item.name }}</router-link></li>
    <li><SearchInput @keypress.native="search"/></li>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import SearchInput from '@/components/SearchInput.vue';
import {stream} from '@/directives/stream';

@Component({
  components: {SearchInput},
  props: {
  },
  directives: {
    stream,
  },
})
export default class Menu extends Vue {
  public items = [
    {
      name: 'Upcoming Movies',
      to: '/',
    },
  ];

  public search(event: KeyboardEvent) {
    const search: string = (event.target as any).value;
    if (event.key === 'Enter' && search) {
      this.$router.push('/search?query=' + search);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../assets/scss/theme";

  ul.menu {
    padding: 0;
    display: flex;
    flex-direction: row;
    margin: 0 50px;
    justify-content: space-between;

    li {
      list-style: none;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 0 5px;

      a {
        display: block;
        line-height: 30px;
        height: 30px;
        text-decoration: none;
        color: $color-text-primary;
        padding: 0 15px;
        border-radius: 15px;

        &:hover {
          background: $color-text-primary;
          color: $color-text-secondary
        }
      }
    }
  }
</style>
