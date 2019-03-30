<template>
    <span>
        <slot></slot>
    </span>
</template>

<script>
export default {
    props: {
        targetWidth: {
            'default': 20,
            type: Number,
        },
        unit: {
            'default': 'em',
            type: String,
        },
        min: {
            'default': 0.5,
            type: Number,
        },
        max: {
            'default': 1,
            type: Number,
        }
    },
    data() {
        return {
            observer: null,
        }
    },
    mounted() {
        this.calculate();

        if ('MutationObserver' in window && this.observer === null) {
            console.log('MutationObserver found');

            // Create the observer (and what to do on changes...)
            this.observer = new MutationObserver(this.calculate);

            // Setup the observer
            this.observer.observe(
                this.$el,
                { subtree: true, characterData: true }
            );
        }
    },
    beforeDestroy: function() {
        // Clean up
        this.observer.disconnect();
    },
    methods: {
        calculate() {
            console.log('mutation found');

            let element = this.$el;
            // first make it an inline block and set the line height to a fixed pixel value
            element.style.display = 'inline-block';
            element.style.lineHeight = '1px';

            // then keep trying untill it fits
            let fontSize = this.max;
            let stepSize = (this.unit === 'px') ? 1 : 0.05;
            element.style.fontSize = fontSize + this.unit;

            console.log(element.offsetWidth);
            console.log(this.targetWidth);

            while (element.offsetWidth > this.targetWidth && fontSize > this.min) {
                console.log(element.offsetWidth);
                console.log(this.targetWidth);
                fontSize -= stepSize;
                element.style.fontSize = fontSize + this.unit;
            }
            // found it!!

            // reset the styles
            element.style.display = null;
            element.style.lineHeight = null;
        }
    }
}
</script>
