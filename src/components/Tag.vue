<template>
    <span class="tag"><slot></slot></span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  props: {
    type: {
      type: String,
    },
  },
})
export default class Tag extends Vue {
  @Prop() public type!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    @import "../assets/scss/theme";

    .tag {
        padding: 5px;
        border-radius: 7px;
        color: $color-text-secondary;
        background-color: white;
        margin: 0 5px 0 0;
        border: 1px solid $color-text-secondary;
        font-size: .9em;
    }
</style>
