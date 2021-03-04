<template >
    <div v-if="reloadHack" id="countdown" @mouseover="hover = true" @mouseleave="hover = false" @click="forceUpdate">
    <div  id="countdown-number">{{ countdownTxt }}</div>
    <svg>
        <circle r="18" cx="20" cy="20"></circle>
    </svg>
    </div>
</template>

<script>
export default {
    name: "Counter",
    data() {
        return {
            countdownNumberEl: "getElementById('countdown-number')",
            countdownTxt: 20,
            countdown: 20,
            p: 50,
            hover: false,
            reloadHack: true,
        }
    },
    watch: {
        hover: function(val) {
            this.countdownTxt = "↻"
        }
    },
    mounted() {
        this.startCounter();
    },
    methods: {
        startCounter() {
            var vm = this;
            setInterval(function() {
                vm.countdown = --vm.countdown <= 0 ? 20 : vm.countdown;
                if(vm.countdown === 1) {
                    //vm.$emit('reloadEvent', "reloadEvent");
                }
                vm.countdownTxt = vm.countdown;
            }, 1000);
        },
        forceUpdate() {
            //this.$emit('reloadEvent', "reloadEvent");
            this.countdown = 20;
            this.countdownTxt = 20;
            this.reloadHack = false;
            this.$nextTick(() => {
                this.reloadHack = true;
            });

        }
    }
}
</script>

<style>

#countdown {
  position:absolute;
  top:10px;
  right: 10px;
  height: 40px;
  width: 40px;
  text-align: center;
}

#countdown-number {
  color: white;
  display: inline-block;
  line-height: 40px;
}

svg {
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
  transform: rotateY(-180deg) rotateZ(-90deg);
}

svg circle {
  stroke-dasharray: 113px;
  stroke-dashoffset: 0px;
  stroke-linecap: round;
  stroke-width: 2px;
  stroke: white;
  fill: none;
  animation: countdown 10s linear infinite forwards;
}

@keyframes countdown {
  from {
    stroke-dashoffset: 0px;
  }
  to {
    stroke-dashoffset: 113px;
  }
}
</style>