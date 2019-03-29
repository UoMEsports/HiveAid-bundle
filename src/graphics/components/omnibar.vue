<template>
    <div class="omnibar">
        <div class="logo-wrapper">
            <img id="logo" src="../img/omnibar-logo.png">
        </div>
        <div id="main">
            <div id="label" ref="label" :style="'background-color: ' + contentColour"></div>
            <div id="body" ref="body" :style="'border-bottom-color: ' + contentColour">
                <div id="content" ref="content"></div>
            </div>
            <div id="cta" ref="cta">
                <div id="cta-1">
                    <span style="color: #FFD421;">HiveAid 2019</span> supports <span style="font-weight: 800;">SpecialEffect</span>
                </div>

                <div id="cta-2">
                    Donate now at <span style="color: #FFD421; font-weight: 800;">honeypot.uomesports.co.uk</span>
                </div>
            </div>
        </div>
        <div id="total">
            <div id="total-currency">
                £
            </div>
            <div id="total-amount" ref="totalAmount"></div>
        </div>
    </div>
</template>

<script>
const INTERVAL = 10;
const onNow = nodecg.Replicant('onNow');
const comingUp = nodecg.Replicant('comingUp');
const total = nodecg.Replicant('total');
import {TweenMax} from "gsap/TweenMax";

export default {
    data () {
        return {
            total: 0,
            tl: new TimelineLite({autoRemoveChildren: true}),
            contentColour: '#FFD421'
        }
    },
    created () {
    },
    mounted () {
        this.tl.set(this.$refs.content, {y: '100%'});

        total.on('change', this.totalChanged);
        setTimeout(() => {
            // Start the rotation
            this.showSchedule();

            // Do this on a delay, otherwise it sometimes freaks out and makes #content have zero width.
        }, 1500);
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
                        this.fitContent();
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
        },

        enter() {
            this.tl.to(this.$refs.label, 0.8, {
                y: '0%',
                ease: Back.easeInOut.config(1.7)
            });

            this.tl.to(this.$refs.body, 0.66, {
                scaleX: '1',
                ease: Power3.easeInOut
            });

            this.tl.to(this.$refs.content, 0.66, {
                y: '0%',
                ease: Power3.easeOut
            }, '-=0.18');
        },

        exit() {
            this.tl.call(() => {
                this.tl.pause();
                let duration = Math.max(this.$refs.body.clientWidth / 500, 0.9);
                duration = Math.min(duration, 1.8);
                TweenLite.to(this.$refs.label, duration, {
                    x: this.$refs.body.clientWidth + 1,
                    ease: Power3.easeInOut,
                    onComplete: function () {
                        this.tl.resume();
                    }.bind(this)
                });
            }, null, null, '+=0.01');

            this.tl.set(this.$refs.body, {scaleX: 0});
            this.tl.set(this.$refs.content, {y: '100%'});

            this.tl.to(this.$refs.label, 0.4, {
                y: '100%',
                ease: Power3.easeIn
            }, '-=0.08');

            this.tl.set(this.$refs.label, {x: 0});
        },

        showSchedule() {
            this.tl.call(() => {
                this.$refs.content.style.width = 'auto';
                
                this.contentColour = '#FFD421';

                this.$refs.label.innerText = 'ON NOW';
                this.$refs.content.innerHTML = onNow.value;
                this.fitContent();
            });
            this.enter();
            this.tl.to({}, INTERVAL, {});
            this.exit();

            if (comingUp.value) {
                this.tl.call(() => {
                    this.$refs.label.innerText = 'UP NEXT';
                    this.$refs.content.innerHTML = comingUp.value;
                    this.fitContent();
                });
                this.enter();
                this.tl.to({}, INTERVAL, {});
                this.exit();
            }

            this.tl.call(this.showCTA, null, this);
        },

        showCTA() {
            this.tl.to(this.$refs.cta, 0.66, {
                y: '0%',
                ease: Back.easeOut.config(0.9)
            });

            this.tl.to(this.$refs.cta, 1, {
                y: '-100%',
                ease: Back.easeInOut.config(0.9)
            }, `+=${INTERVAL}`);

            this.tl.to(this.$refs.cta, 0.66, {
                y: '-200%',
                ease: Back.easeIn.config(0.9)
            }, `+=${INTERVAL}`);

            this.tl.set(this.$refs.cta, {y: '100%'});

            this.tl.call(this.showSchedule, null, this);
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

.logo-wrapper {
    position: relative;
    padding-left: 9px;
    padding-right: 15px;
    z-index: 2;
    height: 60px;
    background-color: #151515;

    border-top: 3px solid $secondary;
    border-right: 3px solid $secondary;

    #logo {
        margin-top: 10px;
        width: 163px;
    }
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
        height: 45px;
        padding: 0 21px;
        background-color: var(--toth-ticker-content-color);
        text-transform: uppercase;
        font-size: 42px;
        font-weight: 800;
        line-height: 45px;
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
        border-bottom-width: 4px;
        border-bottom-style: solid;
        padding: 0 16px;
        height: 36px;
        display: flex;
        align-items: center;
        transform-origin: left;
        transform: scaleX(0);
        overflow: hidden;

        #content {
            transform-origin: left;
            font-size: 30px;
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
        bottom: 0px;
    }

    #total-amount {
        position: relative;
        bottom: -3px;
        font-size: 48px;
        font-variant-numeric: tabular-nums;
        font-feature-settings: "tnum";
    }
}

</style>
