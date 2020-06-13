var app = new Vue({
	el: '#vue-app',
	data: {
		headlines: [
			"You decided to collect some apples. Who knows what they can be good for?",
		],
		headlineCursor: 0,
		headlinesShown: 3,
		lcol: lcol,
		rcol: rcol,
		hcol: hcol,
		objs: {},
	},
	
	methods: {
		getObj(obj){
			if (typeof obj === 'string' || obj instanceof String)
			{
				if (obj in this.objs) return this.objs[obj];
			}
			return obj;
		},
		
		objVal(obj){
			obj = this.getObj(obj);
			if (obj === null) return;
			return obj.value;
		},

		objValChange(obj, diff){
			obj = this.getObj(obj);
			if (obj === null) return;
			obj.value += diff;
		},

		objValRelativeChange(obj, rel){
			obj = this.getObj(obj);
			if (obj === null) return;
			obj.value *= rel;
		},

		scrollHeadlines(index=-1){
			if (index == -1 ) this.headlineCursor = this.headlines.length - this.headlinesShown; // scroll to bottom
		}
	},
	
	mounted () {
		var vue = this;

		setInterval(() => {
			vue.objValChange('apples', vue.objVal('applesPerSecond') );
		}, 1000);
	},
	
	created () {
		var vue = this;
	
		vue.lcol.forEach( function(obj){
			obj.vue = vue;
			vue.objs[obj.name] = obj;
		});
		vue.rcol.forEach( function(obj){
			obj.vue = vue;
			vue.objs[obj.name] = obj;
		});
		vue.hcol.forEach( function(obj){
			obj.vue = vue;
			vue.objs[obj.name] = obj;
		});
		
	},
  
});