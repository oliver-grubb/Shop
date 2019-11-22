<template>
  <div id="frontend">
    <h1> Christmas Store</h1>
    <stockform id="listofstock" />
    <h4> Total Value:</h4>
    <stockvalue id='valueofstock'/>
    <h2>Input stock Form</h2>
    <inputstock id='input '/>
    <h2> Delete Stock </h2>
    <deletestock/>

  </div>
</template>

<script>
import stockform from "./components/stockform.vue"
import stockvalue from "./components/stockvalue.vue"
import inputstock from "./components/inputstock.vue"
import deletestock from "./components/deletestock.vue"

export default {
  name: "frontend",
  components: {
    stockform,
    stockvalue,
    inputstock,
    deletestock
  }
};
</script>

<style>
#frontend {
  text-align: center;
  background-color: rgb(92, 218, 201);
}
#listofstock {
  text-align: center;
}
</style>
