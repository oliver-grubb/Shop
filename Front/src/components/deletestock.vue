<template>
  <div>
    <input class="deleteinput" v-model="id" placeholder="Stock ID" />
    <button id="deletebutton" v-on:click="deletestock">Delete</button>
    <br />
    <p>{{error}}</p>
  </div>
</template>

<script>
export default {
  name: "deletestock",
  data() {
    return {
      id: null,
      response: null,
      error: "",
      stockLength: null
    };
  },
  mounted() {
    Event.$on('stockLength', stockLengh => {
        this.stockLength = stockLengh;
      })
  },
  methods: {
    deletestock: function() {

      if (this.inputValidation(this.id)) {
        this.$http.delete("stock/" + this.id).then(response => {
          this.response = response;
                    this.error = response.body;

          Event.$emit("reloadstock");
          Event.$emit("reloadcost");
          this.id = null;
          
        });
      } 
    },
    inputValidation: function(id) {
      this.error = "";
      var idRegex = /^\d+$/;
      
      Event.$emit('getStockLength');

      if (idRegex.test(id) && id<=this.stockLength) {
        return true;
      } else {
        this.error = 'Invalid ID';
        return false;
      }
    }
  }
};
</script>

<style scoped>
</style>