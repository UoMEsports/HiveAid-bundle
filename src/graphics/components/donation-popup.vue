<template>
    <div ref="popup" class="popup">
        <h1 class="name">
            <fit-text
                ref="name"
                :unit="'px'"
                :targetWidth="380"
                :max="45" 
            >
                {{ name }}
            </fit-text>
        </h1>
        <h1 class="amount">
            <fit-text
                ref="amount"
                :unit="'px'"
                :targetWidth="380"
                :max="54" 
            >
                {{ amount }}
            </fit-text>
        </h1>
        <video
            autoplay
            loop
            src="../img/clippedsmol.mp4"
            class="video"
        >
        </video>
    </div>
</template>

<script>
const countdownRep = nodecg.Replicant('countdown');

import {TweenMax} from "gsap/TweenMax";

export default {
    data() {
        return {
            tl: new TimelineLite({autoRemoveChildren: true}),
            name: null,
            amount: null
        };
    },
  
    created() {
        nodecg.listenFor('donation', this.newDonation);
    },

    mounted() {
        this.tl.set(this.$refs.popup, {x: '400'});
    },

    methods: {
        newDonation(data) {
            this.tl.call(() => {
                console.log(data);
                this.amount = data.amount;
                this.name = data.name;
            }, null, null, '+= 0.5');

            this.tl.to(this.$refs.popup, 1.5, {
                x: '0',
                ease: Back.easeOut.config(0.9)
            });

            this.tl.to(this.$refs.popup, 1.5, {
                x: '400',
                ease: Back.easeIn.config(0.9)
            }, '+=5');
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../../shared/style/main.scss';

.popup {
    width: 400px;
    height: 130px;
    background-color: rgba(0,0,0,0);

    position: absolute;
    bottom: 0;
    right: 0;
    margin-bottom: 130px;
    color: $background;

    .video {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -50;
    }

    h1 {
        width: 100%;
        text-align: center;
        margin-bottom: 10px;
    }

    .amount {
        margin-top: 0px;
        margin-bottom: 0px;
    }

    .name {
        margin-top: 18px;
    }
}


</style>