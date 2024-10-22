<script>
import ViewContestant from './ViewContestant.vue';

export default {
  name: 'ViewThaoVi',
  components: {
    ViewContestant,
  },
  data() {
    return {
      contestant: {
        name: "THẢO VI",
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