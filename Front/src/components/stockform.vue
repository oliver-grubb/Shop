<template>
<div>
    <p>{{error}}</p>
    <li class='list' v-for='item in stock' v-bind:key='item.name'>
        ID:{{item.id}} - {{item.name}} costs {{item.price}} {{item.currency}} x{{item.quantity}}
    </li>
</div>
</template>

<script>

export default {
    name: 'stockform',
    data() {
        return {
            stock : [],
            error : '',
        }
    },
    
    mounted() {
      Event.$on('reloadstock', () => {
          this.getStock();
      });
            this.getStock();

      Event.$on('getStockLength', () => {
          Event.$emit('stockLength', this.stock.length);
      })

  },
    methods: {
        getStock: function() {
            this.$http.get("stock").then((response) => {
                this.error = '';
                if(response.status>=200 && response.status<300) {
                this.stock = response.data.data;
                }
                else {
                    this.error = 'Something went wrong, please try again later'
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