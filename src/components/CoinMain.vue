<template>
  <div class="coin-main">
    <row>
      <column :xs="2" class="text-h2">
        From
      </column>
      <column :xs="4">
        <multiselect class="coin-selector" :options="coinsList" v-model="selectedA" label="name" track-by="name" v-on:keyup="converter"></multiselect>
      </column>
      <column :xs="2" class="text-h2">
        To
      </column>
      <column :xs="4">
        <multiselect class="coin-selector" :options="vsCurrencies" v-model="selectedB" @select="converter"></multiselect>
      </column>
    </row>
    <div class="Input">
        <input type="text" id="input" class="Input-text" placeholder="1000" v-model="coinAmount" v-on:keyup="converter">
        <input class="button3 bouncy" type="button" value="Convert" @click="converter">
    </div>

  <currency-input v-model="coinB_converted" :currency="selectedB" :precision="precision"  />
    
  </div>
</template>

<script>
import CoinGecko from "coingecko-api";

export default {
  name: "Conversor",
  data() {
    return {
      selectedA: {
        id: "bitcoin",
        name: "Bitcoin",
        symbol: "btc"
      },
      selectedB: "usd",
      coinAmount: "1",
      coinB_converted: 0,
      CoinGeckoClient: new CoinGecko(),
      coinsList: [],
      vsCurrencies: [],
      precision: { min: 0, max: 8 },
    };
  },
  mounted() {
    this.supportedCoins();
    this.supportedVsCurrencies();
  },
  methods: {
    async supportedCoins() {
      let result = await this.CoinGeckoClient.coins.list();
      let lista = result.data;
      let mainCoins = [];
    //   mainCoins.push(lista.splice(lista.findIndex(item => item.id === 'ripple'), 1));
    //   mainCoins.push(lista.splice(lista.findIndex(item => item.id === 'ethereum'), 1));
    //   mainCoins.push(lista.splice(lista.findIndex(item => item.id === 'bitcoin'), 1));
    //   console.log(mainCoins)
    //   lista.unshift(mainCoins[0].pop())
    //   lista.unshift(mainCoins[0].pop())
    //   lista.unshift(mainCoins[0].pop())

       lista.forEach(function(item,i){
           if(['bitcoin', 'ethereum', 'cardano', 'xrp', 'xrp', 'polkadot', 'binance coin', 'litecoin', 'bitcoin cash', 'chainlink', 'stellar'].indexOf(item.id) >= 0){
               lista.splice(i, 1);
             lista.unshift(item);
         }
     });
      this.coinsList = result.data;
    },
    async supportedVsCurrencies() {
      let result = await this.CoinGeckoClient.simple.supportedVsCurrencies();
      this.vsCurrencies = result.data;
    },
    async price(coinFrom, coinTo) {
      return await this.CoinGeckoClient.simple.price({
        ids: [this.selectedA.id],
        vs_currencies: [this.selectedB],
      });
    },
    converter() {
      this.price().then((value) => {
        console.log(value)
        this.coinB_converted = this.coinAmount * value.data[this.selectedA.id][this.selectedB];
      })
    }
  }
};
</script>

<style scoped lang="scss">
.coin-selector {
    /* max-width: 110px; */
}
.coin-main {
    width: 500px;
    box-shadow: 0px 4px 8px rgba(0,0,0,0.2);
}

.text-h2 {
	padding-left: 25px;
	width: 0px;
}

// Input css -- https://freefrontend.com/css-input-text/ - Nick Salloum
@import url('https://fonts.googleapis.com/css?family=Dosis');
:root {
  /* generic */
  --gutterSm: 0.4rem;
  --gutterMd: 0.8rem;
  --gutterLg: 1.6rem;
  --gutterXl: 2.4rem;
  --gutterXx: 7.2rem;
  --colorPrimary400: #7e57c2;
  --colorPrimary600: #5e35b1;
  --colorPrimary800: #4527a0;
  --fontFamily: "Dosis", sans-serif;
  --fontSizeSm: 1.2rem;
  --fontSizeMd: 1.6rem;
  --fontSizeLg: 2.1rem;
  --fontSizeXl: 2.8rem;
  --fontSizeXx: 3.6rem;
  --lineHeightSm: 1.1;
  --lineHeightMd: 1.8;
  --transitionDuration: 300ms;
  --transitionTF: cubic-bezier(0.645, 0.045, 0.355, 1);
  
  /* floated labels */
  --inputPaddingV: var(--gutterMd);
  --inputPaddingH: var(--gutterLg);
  --inputFontSize: var(--fontSizeLg);
  --inputLineHeight: var(--lineHeightMd);
  --labelScaleFactor: 0.8;
  --labelDefaultPosY: 50%;
  --labelTransformedPosY: calc(
    (var(--labelDefaultPosY)) - 
    (var(--inputPaddingV) * var(--labelScaleFactor)) - 
    (var(--inputFontSize) * var(--inputLineHeight))
  );
  --inputTransitionDuration: var(--transitionDuration);
  --inputTransitionTF: var(--transitionTF);
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.Wrapper {
  flex: 0 0 80%;
  max-width: 80%;
}

.Title {
  margin: 0 0 var(--gutterXx) 0;
  padding: 0;
  color: #fff;
  font-size: var(--fontSizeXx);
  font-weight: 400;
  line-height: var(--lineHeightSm);
  text-align: center;
  text-shadow: -0.1rem 0.1rem 0.2rem var(--colorPrimary800);
}

.Input {
  position: relative;
}

.Input-text {
  margin: 0;
  padding: var(--inputPaddingV) var(--inputPaddingH);
  margin-top: 15px;
  color: inherit;
  width: 40%;
  font-family: inherit;
  font-size: var(--inputFontSize);
  font-weight: inherit;
  line-height: var(--inputLineHeight);
  border: none;
  border-radius: 0.4rem;
  transition: box-shadow var(--transitionDuration);
}

.Input-text::placeholder {
  color: #B0BEC5;
}

.Input-text:focus {
  outline: none;
  box-shadow: 0.2rem 0.8rem 1.6rem var(--colorPrimary600);
}

.Input-label {
  display: block;
  position: absolute;
  bottom: 50%;
  left: 1rem;
  color: #fff;
  font-family: inherit;
  font-size: var(--inputFontSize);
  font-weight: inherit;
  line-height: var(--inputLineHeight);
  opacity: 0;
  transform: 
    translate3d(0, var(--labelDefaultPosY), 0)
    scale(1);
  transform-origin: 0 0;
  transition:
    opacity var(--inputTransitionDuration) var(--inputTransitionTF),
    transform var(--inputTransitionDuration) var(--inputTransitionTF),
    visibility 0ms var(--inputTransitionDuration) var(--inputTransitionTF),
    z-index 0ms var(--inputTransitionDuration) var(--inputTransitionTF);
}

.Input-text:placeholder-shown + .Input-label {
  visibility: hidden;
  z-index: -1;
}

.Input-text:not(:placeholder-shown) + .Input-label,
.Input-text:focus:not(:placeholder-shown) + .Input-label {
  visibility: visible;
  z-index: 1;
  opacity: 1;
  transform:
    translate3d(0, var(--labelTransformedPosY), 0)
    scale(var(--labelScaleFactor));
  transition:
    transform var(--inputTransitionDuration),
    visibility 0ms,
    z-index 0ms;
}

// button css - https://fdossena.com/?p=html5cool/buttons/i.frag
.button3 {
	display: inline-block;
	padding: 0.3em 1.2em;
	margin: 0 0.3em 0.3em 0;
	border-radius: 2em;
	box-sizing: border-box;
	text-decoration: none;
	font-family: 'Roboto',sans-serif;
	font-weight: 300;
	color: #FFFFFF;
	background-color: #4ef184;
	text-align: center;
	transition: all 0.2s;
	&:hover {
		background-color: #299223;
	}
}
@media all and (max-width:30em) {
	 .button3 {
		display: block;
		margin: 0.2em auto;
	}
}

.bouncy{
 animation:bouncy 5s infinite linear;
 position:relative;
}
@keyframes bouncy {
 0%{top:0em}
 40%{top:0em}
 43%{top:-0.9em}
 46%{top:0em}
 48%{top:-0.4em}
 50%{top:0em}
 100%{top:0em;}
}

</style>
