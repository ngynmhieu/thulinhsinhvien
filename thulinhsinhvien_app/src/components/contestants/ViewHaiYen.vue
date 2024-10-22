<script>
import ViewContestant from './ViewContestant.vue';

export default {
  name: 'ViewHaiYen',
  components: {
    ViewContestant,
  },
  data() {
    return {
      contestant: {
        name: "HẢI YẾN",
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