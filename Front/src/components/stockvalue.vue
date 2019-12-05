<template>
<div>
  <div>€{{value}}</div>
  <p>{{error}}</p>
</div>
</template>

<script>
export default {
  name: "stockvalue",
  data() {
    return {
      value: 0,
      error: ''
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
      this.$http.get("stockvalue").then(response => {
        if (response.status >= 200 && response.status < 300) {
          this.value = response.data.data;
        }
        else {
          this.error = 'Something went wrong, please reload the page'
        }
      });
    }
  }
};
</script>

<style scoped>
</style>