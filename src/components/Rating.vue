<template>
    <div class="rating">
        <div class="star-group" v-for="i in stars">
            <Icon type="star_rate" class="star-empty"/>
            <Icon type="star_rate" class="star-filled" :style="{width: computeStarWidth(i) + '%'}"/>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import Icon from '@/components/Icon.vue';

@Component({
  components: {Icon},
  props: {
    val: Number,
    max: Number,
    stars: Number,
  },
})
export default class Rating extends Vue {
  @Prop() public val!: number;
  @Prop() public max!: number;
  @Prop() public stars!: number;

  public computeStarWidth(index: number) {
    const starMaxVal = this.max / this.stars;
    const starVal = Math.min(this.val - ((index - 1) * starMaxVal), starMaxVal);
    return (Math.max(starVal, 0) / starMaxVal) * 100;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .rating {
        display: inline-block;
        padding: 0;
        margin: 0;
        height: 20px;

        .star-group {
            display: inline-block;
            height: 20px;
            width: 20px;
            position: relative;

            .icon {
                height: 100%;
                width: 100%;
                font-size: 20px;
                position: absolute;
                top: 0;
                left: 0;
                overflow: hidden;
            }

            .star-filled {
                color: gold;
            }

            .star-empty {
                color: gray;
            }
        }
    }
</style>
