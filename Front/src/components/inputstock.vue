<template>
  <div>
    <input class="inputtable" v-model="name" placeholder="Name" />
    <input class="inputtable" v-model="description" placeholder="Description" />
    <input class="inputtable" v-model="price" placeholder="Price" />
    <input class="inputtable" v-model="currency" placeholder="Currency" />
    <input class="inputtable" v-model="quantity" placeholder="Quantity" />
    <br />
    <button id="submitbutton" v-on:click="submit">Submit</button>
    <br />
    <p>{{error}}</p>
    <p></p>
  </div>
</template>

<script>
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
      response: [],
      error: ""
    };
  },

  methods: {
    submit: function() {
      if (
        this.formValidation(
          this.name,
          this.description,
          this.price,
          this.currency,
          this.quantity
        )
      ) {
        this.$http
          .post("stock", {
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
    },
    formValidation: function(name, description, price, currency, quantity) {
      var nameRegex = /\w+$/;
      var desRegex = /\w+$/;
      var priceRegex = /^\d+\.\d{0,2}$/;
      var quantityRegex = /^\d+$/;
      this.error = "";
      if (nameRegex.test(name)) {
        if (desRegex.test(description)) {
          if (priceRegex.test(price)) {
            if (currency == "EUR" || currency == "USD" || currency == "GBP") {
              if (quantityRegex.test(quantity)) {
                return true;
              } else {
                this.error = "Invalid quantity";
                return false;
              }
            } else {
              this.error = "Currency must be EUR, USD of GBP";
              return false;
            }
          } else {
            this.error = "Invalid price. Use form x.xx";
            return false;
          }
        } else {
          this.error = "Invalid description";
          return false;
        }
      } else {
        this.error = "Invalid Name";
        return false;
      }
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