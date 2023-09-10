<template>
  <div class="dashboard-container">
    <div class="mapDiv"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  components: {
  },
  computed: {
    ...mapGetters(["name"]),
  },
  mounted() {
    // initMap();
  },
  methods: {
    
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
