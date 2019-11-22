<template>
  <div>€{{value}}</div>
</template>

<script>
import axios from "axios";
export default {
  name: "stockvalue",
  data() {
    return {
      value: 0
    };
  },
  created: function() {
    //this.getValue();
    
  },
  mounted() {
      Event.$on('reloadcost', () => {
          this.getValue();
      })
      this.getValue();
  },
  methods: {
      getValue: function() {
      axios.get("http://localhost:5000/api/stockvalue").then(response => {
        if (response.status >= 200 && response.status < 300) {
          this.value = response.data.data;
        }
      });
    }
  }
};
</script>

<style scoped>
</style>