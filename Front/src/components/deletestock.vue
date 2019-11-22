<template>
  <div>
    <input class="deleteinput" v-model="id" placeholder="Stock ID" />
    <button id="deletebutton" v-on:click="deletestock">Delete</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "deletestock",
  data() {
    return {
      id: null,
      response: null
    };
  },
  methods: {
    deletestock: function() {
        if(this.id!=null) {
      axios
        .delete("http://localhost:5000/api/stock/" + this.id )
        .then(response => {
        this.response = response;
        Event.$emit("reloadstock");
        Event.$emit("reloadcost");
        this.id = null});
        }
        }
    }
  
};
</script>

<style scoped>
</style>