<template>
    <select class="select-field" v-model="selectedCoin" @change="onChange($event)">
        <option  v-for="data in $options.coinData" v-bind:key="data.id">
            {{ data.id }}
        </option>
    </select>  
</template>

<script>
import coinData from "../assets/coinsMetadataShort.json"
export default {
  name: "CoinInput",
  coinData: coinData,
    data() {
      return {
        selectedCoin: "",
        options: [
            {text: 'One', value: 'A'},
            {text: 'Two', value: 'B'},
            {text: 'Three', value: 'C'}
        ],
      }
    }   ,
    methods: {
        onChange(event) {
            console.log("Emiting selectedValue: ", this.selectedCoin);
            this.$emit('selectedValue', this.selectedCoin);
        }
    }
  }
</script>

<style>
.select-field {
    max-width: 30%;
}
</style>



