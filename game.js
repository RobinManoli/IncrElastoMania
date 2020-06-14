var app = new Vue({
	el: '#vue-app',
	data: {
		headlines: [
			"Year 1999",
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
			if (index == -1) this.headlineCursor = this.headlines.length - this.headlinesShown; // scroll to bottom
			//this.headlineCursor = Math.min( this.headlines.length-1,this.headlineCursor); // make sure it's not less than last item
			if (this.headlineCursor < 0) this.headlineCursor = 0;
			//console.log("headlinesShown:", this.headlineCursor);
		}
	},
	
	mounted () {
		var vue = this;

		setInterval(() => {
			vue.objValChange('apples', vue.objVal('applesPerSecond') );
		}, 1000);

		// cheat to phase höylä tt 60
		/*
		vue.objValChange('applesPerSecond', 54);
		vue.objValChange('flowers', 1);
		vue.objValChange('gotFirstFlower', 1);
		vue.objValChange('elma', 1);
		vue.objValChange('year', 1);
		vue.objValChange('levels', 54);
		vue.objValChange('finishedLevels', 53);
		vue.objValChange('plays', 499);
		*/
		//*
		// cheat to phase höylä tt 55
		vue.objValChange('applesPerSecond', 116);
		vue.objValChange('flowers', 1);
		vue.objValChange('gotFirstFlower', 1);
		vue.objValChange('elma', 1);
		vue.objValChange('year', 1);
		vue.objValChange('levels', 54);
		vue.objValChange('finishedLevels', 54);
		vue.objValChange('plays', 2049);
		vue.objs.totalTime.value = 54.94;
		//*/
	},
	
	created () {
		var vue = this;
		
		var allCols = [];
		allCols.push.apply(allCols, vue.lcol);
		allCols.push.apply(allCols, vue.rcol);
		allCols.push.apply(allCols, vue.hcol);
	
		allCols.forEach( function(obj){
			obj.vue = vue;
			vue.objs[obj.name] = obj;
			if ("actions" in obj)
			{
				obj.action = {};
				obj.actions.forEach( function (action){
					// make any named action accessible as [obj.vue.objs.] obj.action.actionName( action_specific_arg1, action_specific_arg2, ...), though without applying appleCost
					if ("name" in action) obj.action[action.name] = function(arg1, arg2, arg3, arg4, arg5){ action.perform(obj, action, arg1, arg2, arg3, arg4, arg5) };
				});
			}
		});
	},
  
});