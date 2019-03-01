<template>
	<v-container
        fluid
        grid-list-lg
      >
        <v-layout row wrap>
			<v-flex xs12>
				<v-form v-model="valid" ref="form">
					<v-text-field
						v-model="firstName"
						label="First Name"
						:rules="[required]"
						dark
					></v-text-field>

					<v-text-field
						v-model="lastName"
						label="Last Name"
						:rules="[required]"
						dark
					></v-text-field>

					<v-text-field
						v-model="alias"
						label="Alias"
						dark
					></v-text-field>

					<v-text-field
						prepend-icon="alternate_email"
						v-model="social"
						label="Twitter Handle"
						dark
					></v-text-field>
					<v-btn @click="add" color="green">Add</v-btn>
				</v-form>
			</v-flex>

			<v-list two-line v-show="Object.keys(this.names).length > 0">
				<template v-for="(item, index) in names">
					<v-flex xs12 :key="index">
						<v-card class="current" :color="runningColour" dark>
							<v-card-title primary-title>
								<div>
									<h3 class="headline mb-0">{{item.fullName}}</h3>
									<h3>{{item.alias}}</h3>
									<h5 v-if="item.social">@{{item.social}}</h5>
								</div>
							</v-card-title>

							<v-btn fab
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

const names = nodecg.Replicant('names');
export default {
	data() {
		return {
			names: {},
			firstName: '',
			lastName: '',
			alias: '',
			social: '',
			valid: false,
			required: value => !!value || 'Required.'
		};
	},
	created() {
		NodeCG.waitForReplicants(names).then(this.listen);
	},
	methods: {
		listen() {
			names.on('change', newVal => {
				this.names = clone(newVal.items);
			});
		},
		add() {
			if (this.$refs.form.validate()) {
				const fullName = this.firstName + ' ' + (this.alias ? `"${this.alias}" ` : '') + this.lastName;
				const realName = this.firstName + ' ' + this.lastName;
				nodecg.sendMessage('addStaff', {
					realName,
					fullName,
					alias: this.alias,
					social: this.social
				});
			}
		},
		del(id) {
			nodecg.sendMessage('delStaff', id);
		}
	},
	computed: {
		runningColour() {
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