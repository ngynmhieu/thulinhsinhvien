<script>
import ViewContestant from './ViewContestant.vue';

export default {
  name: 'ViewNgocQuy',
  components: {
    ViewContestant,
  },
  data() {
    return {
      contestant: {
        name: "NGỌC QUÝ",
      },    
    };
  },
};
</script>

<template>
  <div>
    <ViewContestant :contestant="contestant"/>
  </div>
</template>

<style lang="css">
@import "contestants.css";
</style>