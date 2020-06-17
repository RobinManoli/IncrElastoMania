var app = new Vue({
	el: '#vue-app',
	data: {
		headlines: [
			"Year 1999",
			"You decided to collect some apples. Who knows what they can be good for?",
		],
		headlineCursor: 0,
		headlinesShown: 3,
		appleWarp: 1,
		debug: false,
		lcol: lcol,
		rcol: rcol,
		hcol: hcol,
		objs: {},
	},
	
	methods: {
		// getObj and objVal methods are probably redundant, as they can be accesses as vue.objs.objName.value
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
		},

		save(){
			var allCols = [];
			allCols.push.apply(allCols, this.lcol);
			allCols.push.apply(allCols, this.rcol);
			allCols.push.apply(allCols, this.hcol);
		
			allCols.forEach( function(obj){
				localStorage[obj.name] = JSON.stringify(obj.value); // stringify to store type if non-string, also avoid storing [object Object]
			});
			localStorage['headlines'] = JSON.stringify(this.headlines);
		},

		load(){
			var allCols = [];
			allCols.push.apply(allCols, this.lcol);
			allCols.push.apply(allCols, this.rcol);
			allCols.push.apply(allCols, this.hcol);
		
			allCols.forEach( function(obj){
				obj.value = JSON.parse(localStorage[obj.name]);
			});
			this.headlines = JSON.parse(localStorage['headlines']);
			//console.log(this.headlines);
			this.scrollHeadlines();
		},

		reset(){
			var allCols = [];
			allCols.push.apply(allCols, this.lcol);
			allCols.push.apply(allCols, this.rcol);
			allCols.push.apply(allCols, this.hcol);
		
			allCols.forEach( function(obj){
				if ( ['worldCupPositionPerSecond', 'elmaCupPositionPerSecond', 'applesPerSecond'].includes(obj.name) ) obj.value = 1;
				else if ( ['elmaCupEventsLeft', 'worldCupEventsLeft', 'battleTimeLeft', 'chat'].includes(obj.name) ) obj.value = -1;
				else if ( obj.name == "totalTime" ) obj.value = 60.0;
				else if ( obj.name == "team" ) obj.value = "";
				else if ( obj.name == "year" ) obj.value = 1999;
				else obj.value = 0;
			});
		},
	},
	
	mounted () {
		var vue = this;

		setInterval(() => {
			vue.objValChange('apples', vue.objVal('applesPerSecond')*this.appleWarp );
			vue.objValChange('time', 1 );
			if ( vue.objs.elmaCupEventsLeft.value > 0 )
			{
				vue.objs.elmaCupEventsLeft.value -= 1;
				vue.objs.elmaCupPosition.value += vue.objs.elmaCupPositionPerSecond.value;
				// it's impossible to win without code below
				if (vue.objs.elmaCupEventsLeft.value == 0 && vue.objs.elmaCupPosition.value == 2) vue.objs.elmaCupPosition.value = 1;
			}
			if ( vue.objs.worldCupEventsLeft.value > 0 )
			{
				vue.objs.worldCupEventsLeft.value -= 1;
				vue.objs.worldCupPosition.value += vue.objs.worldCupPositionPerSecond.value;
				// it's impossible to win without code below
				if (vue.objs.worldCupEventsLeft.value == 0 && vue.objs.worldCupPosition.value == 2) vue.objs.worldCupPosition.value = 1;
			}
			if ( vue.objs.battleTimeLeft.value > 0 )
			{
				vue.objs.battleTimeLeft.value -= 1;
				vue.objs.battlePosition.value += vue.objs.battlePositionPerSecond.value;
				// it's impossible to win without code below
				if (vue.objs.battleTimeLeft.value == 0 && vue.objs.battlePosition.value == 2) vue.objs.battlePosition.value = 1;
			}
		}, 1000);

		// cheat to phase finished internals
		//*
		vue.objValChange('applesPerSecond', 54);
		vue.objValChange('flowers', 1);
		vue.objValChange('gotFirstFlower', 1);
		vue.objValChange('gotBike', 1);
		vue.objValChange('year', 1);
		vue.objValChange('time', 300);
		vue.objValChange('levels', 54);
		vue.objValChange('finishedLevels', 53);
		vue.objValChange('plays', 499);
		//*/
		/*
		// realistic cheat to phase unlock battle
		vue.objValChange('apples', 16532);
		vue.objValChange('applesPerSecond', 93);
		vue.objValChange('flowers', 1);
		vue.objValChange('gotFirstFlower', 1);
		vue.objValChange('gotBike', 1);
		vue.objValChange('year', 3);
		vue.objValChange('levels', 90);
		vue.objValChange('finishedLevels', 54);
		vue.objValChange('plays', 10708);
		vue.objValChange('elmaCupVersion', 1);
		vue.objValChange('chat', 1);
		vue.objValChange('battleVersion', 1);
		vue.objs.totalTime.value = 53.94;
		//*/
		/*
		// realistic cheat to phase level maker 467 applesPerSecond
		vue.objValChange('apples', 16532);
		vue.objValChange('applesPerSecond', 467);
		vue.objValChange('flowers', 1);
		vue.objValChange('gotFirstFlower', 1);
		vue.objValChange('gotBike', 1);
		vue.objValChange('year', 3);
		vue.objValChange('levels', 204);
		vue.objValChange('finishedLevels', 54);
		vue.objValChange('plays', 10708);
		vue.objValChange('elmaCupVersion', 1);
		vue.objValChange('chat', 1);
		vue.objValChange('battleVersion', 1);
		vue.objs.totalTime.value = 53.94;
		//*/
		/*
		// realistic cheat to phase elma cup 2
		vue.objValChange('apples', 36532);
		vue.objValChange('applesPerSecond', 523);
		vue.objValChange('flowers', 1);
		vue.objValChange('gotFirstFlower', 1);
		vue.objValChange('gotBike', 1);
		vue.objValChange('year', 3);
		vue.objValChange('levels', 217);
		vue.objValChange('finishedLevels', 54);
		vue.objValChange('plays', 20250);
		vue.objValChange('battlePlays', 20);
		vue.objValChange('elmaCupVersion', 2);
		vue.objValChange('elmaCupActive', 1);
		vue.objValChange('chat', 1);
		vue.objValChange('battleVersion', 1);
		vue.objs.totalTime.value = 53.38;
		//*/
		/*
		// realistic cheat to phase elma cup 4 - not sure aobut elmaCupVersion
		vue.objValChange('apples', 36532);
		vue.objValChange('applesPerSecond', 1473);
		vue.objValChange('flowers', 1);
		vue.objValChange('gotFirstFlower', 1);
		vue.objValChange('gotBike', 1);
		vue.objValChange('year', 3);
		vue.objValChange('levels', 323);
		vue.objValChange('finishedLevels', 54);
		vue.objValChange('plays', 79998);
		vue.objValChange('battlePlays', 20);
		vue.objValChange('elmaCupVersion', 4);
		vue.objValChange('elmaCupActive', 0);
		vue.objValChange('chat', 1);
		vue.objValChange('battleVersion', 1);
		vue.objs.totalTime.value = 52.62;
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