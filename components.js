Vue.component('object-item', {
	props:['obj'],
	data: function () {
		return {
			count: 0
		}
	},
	template: `<div v-if="!('visibleWhen' in obj) || obj.visibleWhen(obj)">
					{{ obj.label }}: {{ Math.round(obj.value * 100) / 100 }}
					<span v-for="action in obj.actions">
						<b-button v-if="!('visibleWhen' in action) || action.visibleWhen(obj, action)" @click="actionPerform(obj, action)" :disabled="isDisabled(obj, action)" size="sm" style="margin:0 1em;">
						{{ action.label }} {{ ('appleCost' in action) ? "(" +Math.round(action.appleCost(obj))+ " apples)":"" }}
					</b-button>
					</span>
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
			if ('disabledWhen' in action && action.disabledWhen(obj, action)) return true;

			if ('appleCost' in action)
			{
				var appleCost = action.appleCost(obj, action);
				if (obj.vue.objVal('apples') + appleCost < 0) return true;
			}
			return false;
		},
		
		fixedDecimals(value) {
			var val = (value/1).toFixed(1);
			return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
		}
	},
})