<template>
    <div class="omnibar">
        <img
            id="logo"
            src="../img/omnibar-logo.png"
        >
        <div id="main">
            <div id="label"></div>
            <div
                id="body"
                ref="body"
            >
                <div
                    id="content"
                    ref="content"
                ></div>
            </div>
            <div id="cta">
                <div id="cta-1">
                    <span style="color: #f47425;">HiveAid 2019</span> supports <span style="font-weight: 800;">SpecialEffect</span>
                </div>

                <div id="cta-2">
                    Donate now at <span style="color: #f47425; font-weight: 800;">honeypot.uomesports.co.uk</span>
                </div>
            </div>
        </div>
        <div id="total">
            <div id="total-currency">
                £
            </div>
            <div
                id="total-amount"
                ref="totalAmount"
            ></div>
        </div>
    </div>
</template>

<script>
const total = nodecg.Replicant('total');
import {TweenMax} from "gsap/TweenMax";

export default {
    data () {
        return {
            total: 0,
        }
    },
    created () {
    },
    mounted () {
        this.$refs.totalAmount.setAttribute("rawvalue", 0);
        total.on('change', this.totalChanged);
    },
    methods: {
        totalChanged (newVal) {
            const TIME_PER_POUND = 0.03;
            const totalAmountEl = this.$refs.totalAmount;
            const delta = newVal.raw - totalAmountEl.getAttribute("rawvalue");
            const duration = Math.min(delta * TIME_PER_POUND, 5);
            let strLen = totalAmountEl.textContent.length;
            console.log(strLen);
            TweenLite.to(this, duration, {
                total: newVal.raw,
                ease: Power2.easeOut,
                onUpdate: function () {
                    let text = this.total.toLocaleString('en-GB', {
                        maximumFractionDigits: 0
                    });

                    console.log(text);

                    totalAmountEl.textContent = text;

                    if (totalAmountEl.textContent.length !== strLen) {
                        //this.fitContent();
                        strLen = totalAmountEl.textContent.length;
                    }
                }.bind(this)
            });
        },

        fitContent () {
            const maxWidth = this.$refs.body.clientWidth - 32;
            const contentWidth = this.$refs.content.clientWidth;
            const delta = contentWidth - maxWidth;
            if (delta > 1) {
                TweenLite.set(this.$refs.content, {scaleX: maxWidth / contentWidth});
            } else {
                TweenLite.set(this.$refs.content, {scaleX: 1});
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../../shared/style/main.scss';

.omnibar {
    height: 50px;
    
    display: flex;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    border-top: 3px solid $secondary;
    background-color: #151515;
    font-family: 'proxima-nova';
    color: white;
    white-space: nowrap;
    align-items: flex-end;
}

#logo {
    position: relative;
    padding-left: 9px;
    padding-right: 15px;
    bottom: 5px;
    width: 163px;
    z-index: 2;
}

#main {
    position: relative;
    display: flex;
    flex-grow: 1;
    min-width: 1px;
    align-items: flex-end;
    overflow: hidden;
    height: 100%;

    #label {
        position: relative;
        top: 3px;
        height: 35px;
        padding: 0 21px;
        background-color: var(--toth-ticker-content-color);
        text-transform: uppercase;
        font-size: 34px;
        font-weight: 800;
        font-family: 'proxima-nova-condensed';
        line-height: 38px;
        transform: translateY(100%);
        z-index: 1;
    }

    #label:before {
        content: '';
        position: absolute;
        right: 100%;
        height: 100%;
        background-color: #151515;
        width: 1200px;
    }

    #body {
        border-bottom: 4px solid var(--toth-ticker-content-color);
        padding: 0 16px;
        height: 30px;
        display: flex;
        align-items: center;
        transform-origin: left;
        transform: scaleX(0);
        overflow: hidden;

        #content {
            transform-origin: left;
            font-size: 24px;
            font-weight: 400;
            will-change: transform;
            text-shadow: 2.828px 2.828px 0 black;

            #content b {
                font-weight: 700;
            }
        }
    }

    #cta {
        position: absolute;
        height: 38px;
        width: 100%;
        text-align: center;
        font-size: 30px;
        text-shadow: 2.828px 2.828px 0 black;
        transform: translateY(100%);
        left: 0;
        top: -2px;

        #cta-1,
        #cta-2 {
            height: 100%;
            line-height: 50px;
        }
    }
}

#total {
    display: flex;
    align-items: baseline;
    background-color: $secondary;
    padding: 0 14px;
    flex-shrink: 0;
    font-weight: 700;
    margin-left: 24px;
    height: 54px;
    color: black;

    #total-currency {
        font-size: 39px;
        position: relative;
        bottom: 5px;
    }

    #total-amount {
        position: relative;
        bottom: 2px;
        font-size: 48px;
        font-variant-numeric: tabular-nums;
        font-feature-settings: "tnum";
    }
}

</style>
