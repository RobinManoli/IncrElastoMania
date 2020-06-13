var lcol = [];
var rcol = [];
var hcol = []; // hidden column


hcol.push(
	{
		name: "gotFirstFlower",
		value: 0,
	},
);

lcol.push(
	{
		name: "apples",
		label: "Apples",
		//caption: "Amount of CO₂ left before 50% chance of...",
		value: 0,
		actions: [
		],
	},

	{
		name: "applesPerSecond",
		label: "Apple/s",
		//caption: "Amount of CO₂ left before 50% chance of...",
		value: 1,
		visibleWhen: function(obj){ return obj.value > 1; },
		actions: [
		],
	},

	{
		name: "flowers",
		label: "Flowers",
		value: 0,
		visibleWhen: function(obj){ return obj.vue.objVal('apples') > 10 || obj.vue.objVal('gotFirstFlower') > 0; },
		actions: [
			{
				label: "Get flower",
				appleCost: function(obj){ return (obj.value + obj.vue.objVal('levels') + 1) * -10; },
				perform: function(obj)
				{
					obj.value++;
					if ( obj.vue.objVal('gotFirstFlower') == 0 )
					{
						obj.vue.headlines.push("You decided to collect some flowers. Quite expensive though.");
						obj.vue.objValChange('gotFirstFlower', 1);
					}
				},
				//disabledWhen: function(obj, action){ return obj.vue.objVal('apples') < obj.value * 10; },
			},
			{
				label: "Get level",
				perform: function(obj)
				{
					obj.value--;
					obj.vue.objValChange('levels', 1);
					if ( obj.vue.objVal('levels') == 10 ) obj.vue.headlines.push("Yay! Got 10 levels! Only a few more to go?");
					if ( obj.vue.objVal('levels') == 20 ) obj.vue.headlines.push("Yay! Got 20 levels! About half way there?");
					if ( obj.vue.objVal('levels') == 30 ) obj.vue.headlines.push("Yay! Got 30 levels! For sure more than half way there.");
					if ( obj.vue.objVal('levels') == 40 ) obj.vue.headlines.push("Yay! Got 40 levels! Seems like there are 54 in total.");
					if ( obj.vue.objVal('levels') == 50 ) obj.vue.headlines.push("Got 50 levels!!! Seems like there are 55 in total?");
					if ( obj.vue.objVal('levels') == 54 ) obj.vue.headlines.push("YEAH!!! 54!!! It seems like there is a total time for all your completed levels. How many minutes total time should I aim for? What? Oh, you can download more levels?");
					if ( obj.vue.objVal('levels') == 60 ) obj.vue.headlines.push("There are some quite fun levels to download!");
					if ( obj.vue.objVal('levels') == 70 ) obj.vue.headlines.push("Hmm, seems there are some competitions in this game!");
					obj.vue.scrollHeadlines(); // scroll to end
				},
				visibleWhen: function(obj){ return obj.vue.objVal('elma') > 0; },
				disabledWhen: function(obj, action){ return obj.vue.objVal('elma') < 1 || obj.vue.objVal('flowers') < 1; },
			},
		],
	},

	{
		name: "levels",
		label: "Levels",
		value: 0,
		visibleWhen: function(obj){ return obj.value > 0; },
		actions: [
			{
				label: "Play",
				appleCost: function(obj){ return -10; },
				perform: function(obj)
				{
					obj.vue.objValChange('plays', 1);
					var completed = Math.random() < 1/(2 + (obj.vue.objVal('finishedLevels')/5))
					if ( obj.vue.objVal('finishedLevels') < obj.value && obj.vue.objVal('finishedLevels') < 54 && completed )
					{
						obj.vue.objValChange('applesPerSecond', 1);
						obj.vue.objValChange('finishedLevels', 1);
					}
				},
				//disabledWhen: function(obj, action){ return obj.vue.objVal('apples') < obj.value * 10; },
			},
			{
				label: "Höylä",
				appleCost: function(obj){ return -100; },
				perform: function(obj)
				{
					obj.vue.objValChange('plays', 10);
					if ( obj.vue.objVal('finishedLevels') < obj.value && obj.vue.objVal('finishedLevels') < 54 && Math.random() < 1/(1 + obj.vue.objVal('finishedLevels')) )
					{
						obj.vue.objValChange('applesPerSecond', 1);
						obj.vue.objValChange('finishedLevels', 1);
					}
				},
				visibleWhen: function(obj, action){ return obj.vue.objVal('plays') > 499; },
				//disabledWhen: function(obj, action){ return obj.vue.objVal('apples') < obj.value * 10; },
			},
		],
	},
	{
		name: "finishedLevels",
		label: "Completed Levels",
		value: 0,
		visibleWhen: function(obj){ return obj.value > 0 && obj.value < 54; },
	},
	{
		name: "totalTime",
		label: "Total Time",
		value: 60,
		visibleWhen: function(obj){ return obj.vue.objVal('finishedLevels') > 53; },
	},
);

rcol.push(
	{
		name: "plays",
		label: "Plays",
		value: 0,
	},
	{
		name: "elma",
		label: "Elasto Mania",
		value: 0,
		visibleWhen: function(obj){ return obj.vue.objVal('gotFirstFlower') > 0 && obj.value < 2; },
		actions: [
			{
				label: "Get Elasto Mania",
				perform: function(obj)
				{
					obj.value++;
					if ( obj.value == 1 ) obj.vue.headlines.push("Woohoo! You got Elasto Mania!!!");
				},
				visibleWhen: function(obj, action){ return obj.value < 1; },
				disabledWhen: function(obj, action){ return obj.value > 0; },
			},
		],
	},

);