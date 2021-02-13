<template>
  <div class="conversor">
    <h2>{{ moedaA }} To {{ moedaB }}</h2>
    <input 
      v-model="moedaA_value" 
      type="text" 
      :placeholder="moedaA"
    >
    <input
      type="button"
      value="Converter" 
      @click="converter"
    >
    <h2>{{ moedaB_value }}</h2>
  </div>
</template>

<script>
export default {
  name: "Conversor",
  props: {
    moedaA: {
      type: Number,
      required: true,
    },
    moedaB: {
      type: Number,
      required: true,
    }
  },
  data() {
    return {
      moedaA_value: "",
      moedaB_value: 0
    };
  },
  methods: {
    converter() {
      const dePara = `${this.moedaA  }_${  this.moedaB}`;
      const url =
        `https://free.currencyconverterapi.com/api/v6/convert?q=${dePara}&compact=ultra&apiKey=c2c43cf5a33d53604dfb`;
      fetch(url)
        .then(res => {
          return res.json();
        })
        .then(json => {
          const cotacao = json[dePara];
          this.moedaB_value = (cotacao * parseFloat(this.moedaA_value)).toFixed(
            2
          );
          console.log(this.moedaB_value);
        });
    }
  }
};
</script>

<style scoped>
.conversor{
    max-width: 300px;
    padding: 20px;
    box-shadow: 0px 4px 8px rgba(0,0,0,0.2);
}
</style>
