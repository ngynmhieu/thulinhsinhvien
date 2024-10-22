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