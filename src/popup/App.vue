/* eslint-disable vue/attribute-hyphenation */
<template>
  <div id="app">
    <br>
    <br><Counter @reloadEvent="reloadEvent"></Counter>
    <row>
      <column>
        <h1>Coin converter</h1>
      </column>
    </row>
    <row>
      <column>
        <CoinMain ref="coinMainRef"></CoinMain>
      </column>
    </row>
    <div class="linha" />
    <div class="linha" />
    <div class="linha">
      <Conversor moedaA="USD" moedaB="BRL"></Conversor>
      <Conversor moedaA="BRL" moedaB="USD"></Conversor>
    </div>
    <div class="linha">
      <Conversor moedaA="USD" moedaB="EUR"></Conversor>
      <Conversor moedaA="EUR" moedaB="USD"></Conversor>
    </div>
    <div class="linha">
      <Conversor moedaA="EUR" moedaB="BRL"></Conversor>
      <Conversor moedaA="BRL" moedaB="EUR"></Conversor>
    </div> 
  </div>
</template>


<script>
import Conversor from "../components/Conversor.vue";
import CoinMain from "../components/CoinMain.vue";
import Counter from "../components/Counter.vue"
export default {
  components: {
    Conversor,
    CoinMain,
    Counter,
  },
  methods: {
    reloadEvent(val) {
      console.log("App.vue reload event");

      var coinMainRef = this.$refs.coinMainRef
      console.log(coinMainRef);
      coinMainRef.converter();
    } 
  }
}

</script>

<style>
#app {
  max-width: 2080px;
  margin: auto;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: rgb(70,87,130);
  background: linear-gradient(0deg, rgba(70,87,130,1) 0%, rgba(106,136,182,1) 30%, rgba(91,145,212,1) 65%, rgba(0,212,255,1) 100%);
  /* https://cssgradient.io/ */
}
.linha {
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
}
/* .coin-main {
  position: absolute;
  width: ;
  height: fit-content;
  z-index: 15;
  top: 10%;
  left: 50%;
  margin: -100px 0 0 -150px;
}  */
</style>
