<template>
  <div class="coin-main">

        From
          <v-selectize v-model="selectedA" :options="coinsList" key-by="name" label="name" @search="coinsMarket"> <!---->
            <template v-slot:option="{ option }">
              <div class="text-base">
                <i class="fa fa-code-fork"></i>
                <b class="ml-1">{{ option.name }}</b>
                <small class="ml-1"> $ {{ option.current_price }}</small>
                <div class="price-change-box">
                  <table>
                    <tr>
                      <th>1h</th>
                      <th>24h</th>
                      <th>7d</th>
                    </tr>
                    <tr>
                      <td>{{ round(option.price_change_percentage_1h_in_currency) }}%</td>
                      <td>{{ round(option.price_change_percentage_24h_in_currency) }}%</td>
                      <td>{{ round(option.price_change_percentage_7d_in_currency) }}%</td>
                    </tr>
                  </table>
                </div>
                <img :src="option.image" :alt="name" width="25" height="25">

                <small class="ml-1"> </small><br>
                <small class="ml-1"> </small><br>
                <small class="ml-1"> </small><br>
              </div>

            </template>

          </v-selectize>

        To
        <v-selectize v-model="selectedB" :options="vsCurrencies"/>

    <div class="Input">
        <input type="text" id="input" class="Input-text" placeholder="1000" v-model="coinAmount" v-on:keyup="converter">
        <input class="button3 bouncy" type="button" value="Convert" @click="converter">
    </div>

  <currency-input v-model="coinB_converted" :currency="selectedB" :precision="precision"  />
    
  </div>
</template>

<script>
import coinsJson from '../assets/coinList.json'

export default {
  name: "Conversor",
  default: {
    coinsJson: coinsJson,
  },
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
      coinsList: [{"id":"bitcoin","symbol":"btc","name":"Bitcoin","image":"https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579","current_price":55542,"market_cap":1036521729009,"market_cap_rank":1,"fully_diluted_valuation":1167158000180,"total_volume":58784513790,"high_24h":55749,"low_24h":52052,"price_change_24h":3489.78,"price_change_percentage_24h":6.70442,"market_cap_change_24h":66226556817,"market_cap_change_percentage_24h":6.8254,"circulating_supply":18649537,"total_supply":21000000,"max_supply":21000000,"ath":58641,"ath_change_percentage":-5.2213,"ath_date":"2021-02-21T19:07:32.042Z","atl":67.81,"atl_change_percentage":81863.97586,"atl_date":"2013-07-06T00:00:00.000Z","roi":null,"last_updated":"2021-03-10T01:01:42.103Z","price_change_percentage_1h_in_currency":1.0443366379334609,"price_change_percentage_24h_in_currency":6.7044171494263285,"price_change_percentage_7d_in_currency":14.442837490150579},{"id":"ethereum","symbol":"eth","name":"Ethereum","image":"https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880","current_price":1869.45,"market_cap":215101084825,"market_cap_rank":2,"fully_diluted_valuation":null,"total_volume":30961726091,"high_24h":1883.85,"low_24h":1808.76,"price_change_24h":51.94,"price_change_percentage_24h":2.85789,"market_cap_change_24h":6344266139,"market_cap_change_percentage_24h":3.03907,"circulating_supply":114985561.249,"total_supply":null,"max_supply":null,"ath":2042.93,"ath_change_percentage":-8.4314,"ath_date":"2021-02-20T12:24:12.315Z","atl":0.432979,"atl_change_percentage":431948.85691,"atl_date":"2015-10-20T00:00:00.000Z","roi":{"times":43.95251279989554,"currency":"btc","percentage":4395.251279989554},"last_updated":"2021-03-10T01:01:45.851Z","price_change_percentage_1h_in_currency":-0.287823893855529,"price_change_percentage_24h_in_currency":2.8578875655384377,"price_change_percentage_7d_in_currency":24.872159441015064},{"id":"binancecoin","symbol":"bnb","name":"Binance Coin","image":"https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png?1547034615","current_price":287.52,"market_cap":44430997258,"market_cap_rank":3,"fully_diluted_valuation":49031263591,"total_volume":7262951367,"high_24h":296.44,"low_24h":237.29,"price_change_24h":50.23,"price_change_percentage_24h":21.1677,"market_cap_change_24h":7766060511,"market_cap_change_percentage_24h":21.18116,"circulating_supply":154533651.9,"total_supply":170533651.9,"max_supply":170533651.9,"ath":339.94,"ath_change_percentage":-15.4202,"ath_date":"2021-02-19T23:41:54.286Z","atl":0.0398177,"atl_change_percentage":721982.55652,"atl_date":"2017-10-19T00:00:00.000Z","roi":null,"last_updated":"2021-03-10T01:00:39.179Z","price_change_percentage_1h_in_currency":-2.414452180043829,"price_change_percentage_24h_in_currency":21.16770404195196,"price_change_percentage_7d_in_currency":19.33411854138756},{"id":"cardano","symbol":"ada","name":"Cardano","image":"https://assets.coingecko.com/coins/images/975/large/cardano.png?1547034860","current_price":1.19,"market_cap":38190116286,"market_cap_rank":4,"fully_diluted_valuation":null,"total_volume":5234264458,"high_24h":1.21,"low_24h":1.12,"price_change_24h":0.075204,"price_change_percentage_24h":6.71695,"market_cap_change_24h":2458992598,"market_cap_change_percentage_24h":6.88193,"circulating_supply":31963214946.664,"total_supply":45000000000,"max_supply":null,"ath":1.48,"ath_change_percentage":-19.11892,"ath_date":"2021-02-27T09:42:28.019Z","atl":0.01925275,"atl_change_percentage":6105.94358,"atl_date":"2020-03-13T02:22:55.044Z","roi":null,"last_updated":"2021-03-10T01:00:23.142Z","price_change_percentage_1h_in_currency":-0.6938175362068686,"price_change_percentage_24h_in_currency":6.716952152588459,"price_change_percentage_7d_in_currency":-2.7675910229152034},{"id":"polkadot","symbol":"dot","name":"Polkadot","image":"https://assets.coingecko.com/coins/images/12171/large/aJGBjJFU_400x400.jpg?1597804776","current_price":38.33,"market_cap":37391674565,"market_cap_rank":5,"fully_diluted_valuation":null,"total_volume":2190695335,"high_24h":39.04,"low_24h":35.11,"price_change_24h":3.22,"price_change_percentage_24h":9.18299,"market_cap_change_24h":3503942149,"market_cap_change_percentage_24h":10.33985,"circulating_supply":973272763.12464,"total_supply":1054221142.11272,"max_supply":null,"ath":42.25,"ath_change_percentage":-8.86821,"ath_date":"2021-02-20T18:37:07.487Z","atl":2.7,"atl_change_percentage":1327.47536,"atl_date":"2020-08-20T05:48:11.359Z","roi":null,"last_updated":"2021-03-10T01:00:23.488Z","price_change_percentage_1h_in_currency":-0.24142469842784336,"price_change_percentage_24h_in_currency":9.182994098379693,"price_change_percentage_7d_in_currency":5.667463757283672}],
      vsCurrencies: ["btc", "eth", "ltc", "bch", "bnb", "eos", "xrp", "xlm"],
      precision: {
        min: 0,
        max: 8
      },
    };
  },
  mounted() {
    console.log(coinsJson)
   // this.coinsMarket();
    //this.supportedVsCurrencies();
  },
  methods: {

         
    async geckoGetCoinsList(vsCurrency, ids, category, order, perPage, page, sparkline, priceChangePercentage) {
      const resp = 
            await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${vsCurrency}&ids=${ids}&category=${category}&order=${order}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePercentage}`)
      return resp.json();
    },
    coinsMarket(searchCoin) {
      var vm = this;
      let coinsToBeSearched;
      if(searchCoin === undefined) {
        coinsToBeSearched = "";
      }else{
        coinsToBeSearched = coinsJson.filter(coin => coin.id.includes(searchCoin.toLowerCase()));
        coinsToBeSearched = coinsToBeSearched.slice(0, 10);
        coinsToBeSearched = this.idsArrayToString(coinsToBeSearched, ', ')
      }
      this.geckoGetCoinsList(this.selectedB, coinsToBeSearched, "", "market_cap_desc", "10", "1", false, "1h,24h,7d").then(function(result){
        vm.coinsList = result;
      });
    },
    idsArrayToString(coins, separator) {
      let returnString;
      if(coins.length === 0) {
        returnString = "";
      } else
      if(coins.length === 1) {
         returnString = coins[0].id;
      } else
      {
        returnString = coins[0].id;
        let i = 1;
        while(i < coins.length) {
          returnString += separator + coins[i].id;
          i++;
        }
      }
      return returnString
    },

    async price(coinFrom, coinTo) {
       const resp = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${this.selectedA.id}&vs_currencies=${this.selectedB}`)
       return resp.json();
    },
    converter() {
      this.price().then((value) => {
        this.coinB_converted = this.coinAmount * value[this.selectedA.id][this.selectedB];
      })
    },

    async geckoGetAllCoins() { //not in use
      const resp = await fetch('https://api.coingecko.com/api/v3/coins/list')
      return resp.json();
    },

    supportedVsCurrencies(word) {
      this.geckoGetVsCurrencies(word).then(data => {
        this.vsCurrencies = data;
      })
    },
    async geckoGetVsCurrencies() {
      const resp = await fetch('https://api.coingecko.com/api/v3/simple/supported_vs_currencies')
      return resp.json();
    },
    round(num) {
      return (Math.round(num * 100) / 100).toFixed(1)
    }
  }
};


/*
      var temp;
      chrome.storage.local.get(['supportedCoins'], function (result) {
        console.log('Value currently is ', result.supportedCoins[5]);
        this.coinsList = result.supportedCoins;
        if ( false && this.coinsList !== undefined && this.coinsList.length > 0) {
          console.log("etnrou no primeiruo");
          temp = this.coinsList;
        } else {
          let result =  [];
          let list = result.data;
          console.log('list: ', list)

          list.forEach(function (item, i) {
            if (['bitcoin', 'ethereum', 'cardano', 'xrp', 'xrp', 'polkadot', 'binance coin', 'litecoin', 'bitcoin cash', 'chainlink', 'stellar'].indexOf(item.id) >= 0) {
              list.splice(i, 1);
              list.unshift(item);
            }
          });
          this.coinsList = result.data;
          chrome.storage.local.set({
            'supportedCoins': this.coinsList
          }, function () {
            console.log('Settings saved');
          });
        }
        this.coinsList = temp ;
      console.log(this.coinsList);
      })
*/
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

table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}
th, td {
  padding: 1px;
  text-align: center;
}
</style>
