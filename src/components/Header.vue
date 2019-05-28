<template>
  <section class="header">
    <Logo />
    <Menu />
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Logo from '@/components/Logo.vue';
import Menu from '@/components/Menu.vue';

@Component({
  components: {Menu, Logo},
})
export default class Header extends Vue {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 20px;
    box-sizing: border-box;
  }
</style>
z
