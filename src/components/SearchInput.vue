<template>
    <div class="search-input">
        <label>
            <Icon class="icon" type="search" />
            <input class="search-input-field" type="text" name="search">
        </label>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Icon from '@/components/Icon.vue';
import {Subject} from 'rxjs';
import {stream} from '@/directives/stream';

@Component({
  components: {Icon},
  props: {

  },
  directives: {
    stream,
  },
})
export default class SearchInput extends Vue {

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    @import "../assets/scss/theme";

    .search-input {
        cursor: pointer;
        border: 1px solid $color-text-primary;
        height: 30px;
        border-radius: 15px;
        padding: 0 5px;
        width: 200px;

        label {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 100%;

            .icon {
                margin: auto 0;
            }

            input {
                margin: 0;
                width: 100%;
                color: $color-text-primary;
                background: none;
                border: none;

                &:focus {
                    border: none;
                    outline: none;
                }
            }
        }
    }


</style>
