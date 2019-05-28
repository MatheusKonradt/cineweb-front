<template>
  <img src="../assets/logo.png" class="logo"  alt=""/>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  props: {
  },
})
export default class Logo extends Vue {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .logo {
    height: 100px;
    margin: 0 50px;
  }
</style>
