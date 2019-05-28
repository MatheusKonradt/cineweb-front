<template>
    <div class="home">
        <MoviesList path="search" :opts="this.$route.query" />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import MoviesList from '@/components/MoviesList.vue';

@Component({
  components: {
    MoviesList,
  },
})
export default class Search extends Vue {

}
</script>
