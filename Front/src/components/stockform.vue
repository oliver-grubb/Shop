<template>
<div>
    <li class='list' v-for='item in stock' v-bind:key='item.name'>
        ID:{{item.id}} - {{item.name}} costs {{item.price}} {{item.currency}} x{{item.quantity}}
    </li>
</div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'stockform',
    data() {
        return {
            stock : []
        }
    },
    created: function () {
        //this.getStock()
        
    },
    mounted() {
      Event.$on('reloadstock', () => {
          this.getStock();
      })

      this.getStock();
  },
    methods: {
        getStock: function() {
            axios.get('http://localhost:5000/api/stock').then((response) => {
                if(response.status>=200 && response.status<300) {
                this.stock = response.data.data;
                }
                
            });
        }
    }
  };
</script>

<style scoped>
.list {
    list-style: none;
}
</style>