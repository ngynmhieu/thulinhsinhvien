<script>
import ViewBackGround from './components/ViewBackGround.vue';

export default {
  name: 'App',
  components: {
    ViewBackGround,
  }
}
</script>

<template>
  <div id="app">
    <router-view></router-view>
    <ViewBackGround></ViewBackGround>
  </div>
</template>