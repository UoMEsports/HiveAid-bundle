<template>
    <div ref="popup" class="popup">
        <h1 class="amount" ref="amount"></h1>
        <fit-text ref="name" :unit="'px'" :targetWidth="380" :max="50" class="name">
            {{ name }}
        </fit-text>
        <video autoplay loop src="../img/clipped.mp4" class="video">
    </div>
</template>

<script>
const countdownRep = nodecg.Replicant('countdown');

import {TweenMax} from "gsap/TweenMax";

export default {
    data() {
        return {
            tl: new TimelineLite({autoRemoveChildren: true}),
            name: null
        };
    },
  
    created() {
        nodecg.listenFor('donation', this.newDonation);
    },

    mounted() {
        this.tl.set(this.$refs.popup, {x: '-420'});
    },

    methods: {
        newDonation(data) {
            this.tl.call(() => {
                console.log(data);
                this.$refs.amount.textContent = data.amount;
                this.name = data.name;
            }, null, null, '+= 0.5');

            this.tl.to(this.$refs.popup, 1.5, {
                x: '-20',
                ease: Back.easeOut.config(0.9)
            });

            this.tl.to(this.$refs.popup, 1.5, {
                x: '-420',
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
    height: 260px;
    background-color: rgba(0,0,0,0.7);

    position: relative;

    padding-left: 20px;

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
    }

    .amount {
        padding-top: 16px;
        font-size: 80px;
        margin-bottom: 0px;
    }

    .name {
        margin-left: 10px;
    }
}


</style>