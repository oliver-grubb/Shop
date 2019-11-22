<template>
  <div>
    <input class="inputtable" v-model="name" placeholder="Name" />
    <input class="inputtable" v-model="description" placeholder="Description" />
    <input class="inputtable" v-model="price" placeholder="Price" />
    <input class="inputtable" v-model="currency" placeholder="Currency" />
    <input class="inputtable" v-model="quantity" placeholder="Quantity" />
    <br />
    <button id="submitbutton" v-on:click="submit">Submit</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "inputstock",
  data() {
    return {
      name: "",
      description: "",
      price: null,
      currency: "",
      quantity: null,
      errors: [],
      response: []
    };
  },

  methods: {
    submit: function() {
      axios
        .post("http://localhost:5000/api/stock", {
          data: {
            name: this.name,
            description: this.description,
            price: this.price,
            currency: this.currency,
            quantity: this.quantity
          },
          message: "New stock to input"
        })
        .then(response => {
          Event.$emit("reloadstock");
          Event.$emit("reloadcost");
          this.response.push(response);
          this.name = "";
          this.description = "";
          this.price = null;
          this.currency = "";
          this.quantity = null;
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  }
};
</script>

<style scoped>
.inputtable {
  margin-right: 10px;
}
#submitbutton {
  margin-top: 10px;
}
</style>