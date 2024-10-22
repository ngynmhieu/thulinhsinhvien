<script>
import ViewContestant from "./ViewContestant.vue";

export default {
  name: "ViewHoaiKhanh",
  components: {
    ViewContestant,
  },
  data() {
    return {
      contestant: {
        name: "HOÀI KHANH",
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