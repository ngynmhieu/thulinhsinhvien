<script>
import ViewContestant from "./ViewContestant.vue";
export default {
  name: "ViewDinhPhong",
  components: {
    ViewContestant,
  },
  data() {
    return {
      contestant: {
        name: "ĐÌNH PHONG",
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
