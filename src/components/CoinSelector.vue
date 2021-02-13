<template>
  <div class="coin-selector">
    <h3>From <CoinInput @selectedValue="selectedValueA"/> to <CoinInput @selectedValue="selectedValueB"/></h3>
    <input 
      v-model="moedaA_value" 
      type="text" 
      :placeholder="'Amount'"
    >
    <input
      type="button"
      value="Convert" 
      @click="converter"
    >
    <h2>{{ moedaB_value }}</h2>
  </div>
</template>

<script>
import CoinInput from "./CoinInput.vue";

export default {
  components: {
    CoinInput,
  },

  name: "CoinSelector",
  props: {
    moedaA: {
      type: String,
      required: true,
    },
    moedaB: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      modA: "BTC",
      modB: "USD",
      moedaA_value: "",
      moedaB_value: 0
    };
  },
  methods: {
    selectedValueA(valueA) {
      console.log("CHEGOU A MSG A: ", valueA);
      this.modA = valueA;
    },
    selectedValueB(valueB) {
      console.log("CHEGOU A MSG B: ", valueB);
      this.modB = valueB;
    },
    converter() {
      console.log("converter()")
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
       };
       const api_key = "4338ae3419af3c7c5500e38ec7399a53" // Please dont abuse. Or better yet, create your own at nomics.com
       const url = `https://api.nomics.com/v1/currencies/ticker?convert=${this.modA}&ids=${this.modB}&key=${api_key}`
       
       fetch(url, requestOptions)
       .then(response => {
         response.json().then(res => {
           console.log("res: ", res)
           console.log("res[0]: ", res[0])
           console.log("res[0].price: ", res[0].price)

           console.log("this.moedaA_value: ", this.moedaA_value)
           this.moedaB_value = this.moedaA_value / res[0].price;
           console.log("this.moedaB_value: ", this.moedaB_value)
              }
            );
          }
       )
       .catch(error => console.log('error', error))
       
    }
  }
};
</script>

<style scoped>
.coin-selector{
    max-width: 300px;
    padding: 20px;
    box-shadow: 0px 4px 8px rgba(0,0,0,0.2);
}
</style>
