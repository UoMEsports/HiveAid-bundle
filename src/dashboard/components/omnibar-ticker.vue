<template>
  <v-container
    fluid
    grid-list-lg
  >
    <v-layout
      row
      wrap
    >
      <v-flex xs12>
        <v-form
          ref="form"
          v-model="valid"
        >
          <v-text-field
            v-model="message"
            label="Message"
            :rules="[required]"
            dark
          ></v-text-field>
          
          <v-btn
            color="green"
            @click="add"
          >
            Add
          </v-btn>
        </v-form>
      </v-flex>

      <v-list
        v-show="Object.keys(omnibarTicks).length > 0"
        two-line
      >
        <template v-for="(item, index) in omnibarTicks">
          <v-flex
            :key="index"
            xs12
          >
            <v-card
              class="current"
              dark
            >
              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0">
                    {{ item.id }}
                  </h3>
                  <h3>{{ item.message }}</h3>
                </div>
              </v-card-title>

              <v-btn
                fab
                dark
                small
                color="red"
                @click="del(item.id)"
              >
                <v-icon>delete</v-icon>
              </v-btn>
            </v-card>
          </v-flex>
        </template>
      </v-list>
    </v-layout>
  </v-container>
</template>

<script>
const clone = require('clone');

const omnibarTicks = nodecg.Replicant('omnibarTicks');
export default {
    data() {
        return {
            omnibarTicks: {},
            message: '',
            valid: false,
            required: value => !!value || 'Required.'
        };
    },
    created() {
        NodeCG.waitForReplicants(omnibarTicks).then(this.listen);
    },
    methods: {
        listen() {
            omnibarTicks.on('change', newVal => {
                this.omnibarTicks = clone(newVal.items);
            });
        },
        add() {
            if (this.$refs.form.validate()) {
                nodecg.sendMessage('addOmnibarTick', {
                    message: this.message
                });
            }
        },
        del(id) {
            nodecg.sendMessage('delOmnibarTick', id);
        }
    }
};
</script>

<style lang="scss" scoped>
.time {
	font-size: 96px;
}
.text {
	width: 100%;
	text-align: center;
}
</style>