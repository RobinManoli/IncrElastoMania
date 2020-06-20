Vue.component('object-item', {
	props:['obj', 'debug', 'gameover'],
	data: function () {
		return {
			count: 0
		}
	},
	template: `<div v-if="!('visibleWhen' in obj) || obj.visibleWhen(obj) || debug">
					{{ obj.label }}: {{ displayValue(obj) }}
					<span v-for="action in obj.actions">
						<b-button v-if="!('visibleWhen' in action) || action.visibleWhen(obj, action)" @click="actionPerform(obj, action)" :disabled="isDisabled(obj, action)" size="sm" style="margin:0 1em;">
							{{ action.label }} {{ ('appleCost' in action) ? "(" +Math.round(action.appleCost(obj)).toLocaleString()+ " apples)":"" }}
						</b-button>
					</span>
					<!--<b-button v-if="debug" @click="obj.value++" size="sm">+</b-button>
					<b-button v-if="debug" @click="obj.value--" size="sm">-</b-button>-->
					<input v-if="debug && isNumeric(obj.value)" v-model.number="obj.value" />
					<input v-if="debug && !isNumeric(obj.value)" v-model="obj.value" />
					<a v-if="obj.caption" :title="obj.caption"><b-icon class="pointer" icon="question" v-b-toggle="'caption-' + obj.name"></b-icon></a>
					<b-collapse :id="'caption-' + obj.name" class="container">{{ obj.caption }}</b-collapse>
				</div>`,
	methods: {
		actionPerform(obj, action){
			//console.log(obj);
			//console.log( obj.getObj('elma') );
			if ('appleCost' in action)
			{
				var appleCost = action.appleCost(obj, action);
				obj.vue.objValChange('apples', Math.round(appleCost));
			}

			action.perform(obj, action);
		},

		isDisabled(obj, action){
			if ( this.gameover ) return true;
			if ('disabledWhen' in action && action.disabledWhen(obj, action)) return true;

			if ('appleCost' in action)
			{
				var appleCost = action.appleCost(obj, action);
				if (obj.vue.objVal('apples') + appleCost < 0) return true;
			}
			return false;
		},
		
		displayValue(obj) {
			// works but rounds
			//var val = (value/1).toFixed(1);
			//return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
			if (obj.name == 'totalTime')
			{
				var minutes = Math.floor(obj.value);
				//truncate to make sure minute breaks make sense
				var minutesFraction = Math.trunc(obj.value * 100) / 100;
				var seconds = (minutesFraction - minutes) * 60;
				seconds = Math.trunc(seconds * 100) / 100;
				if (seconds < 10) seconds = '0' + seconds;
				return minutes + ":" + seconds;
			}
			//https://stackoverflow.com/a/41652921
			else if (this.isNumeric(obj.value) && obj.name != 'year')
			{
				var n = Math.trunc(obj.value * 100) / 100;
				return n.toLocaleString()
			}
			return obj.value;
		},
		
		isNumeric(n) {
			// https://stackoverflow.com/a/9716488/942621
			return !isNaN(parseFloat(n)) && isFinite(n);
		}
	},
})