<template>
    <div class="home">
        <MoviesList path="upcoming" :opts="{}" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MoviesList from '@/components/MoviesList.vue';

@Component({
  components: {
    MoviesList,
  },
})
export default class Home extends Vue {

}
</script>
