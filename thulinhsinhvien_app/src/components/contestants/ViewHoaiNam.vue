<script>
import ViewContestant from './ViewContestant.vue';

export default {
  name: 'ViewHoaiNam',
  components: {
    ViewContestant
  },
  data() {
    return {
      contestant: {
        name: "HOÀI NAM",
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