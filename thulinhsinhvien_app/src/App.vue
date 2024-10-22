<script>
import ViewBackGround from './components/ViewBackGround.vue';

export default {
  name: 'App',
  components: {
    ViewBackGround,
  },
  data() {
    return {
      questionId: 0,
    }
  },
  methods: {
    updateQuesId(id) {
      this.questionId = id;
    }
  }
}
</script>

<template>
  <div id="app">
    <router-view @questionId="updateQuesId"></router-view>
    <ViewBackGround :questionId="this.questionId"></ViewBackGround>
  </div>
</template>


<style>
@font-face {
  font-family: 'utm_avo_bold';
  src: url('assets/utm_avo_bold.ttf') format('truetype');
}
@font-face {
  font-family: 'utm_avo';
  src: url('assets/utm_avo.ttf') format('truetype');
}
</style>