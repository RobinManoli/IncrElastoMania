var lcol = [];
var rcol = [];
var hcol = []; // hidden column


hcol.push(
	{
		name: "gotFirstFlower",
		value: 0,
	},
);

// touch flower
lcol.push(
	{
		name: "apples",
		label: "Apples",
		//caption: "",
		value: 0,
		actions: [
		],
	},

	{
		name: "applesPerSecond",
		label: "Apple/s",
		//caption: "",
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
						obj.vue.headlines.push("You decided to trade for some flowers. Quite expensive though.");
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
				name: "play",
				label: "Play",
				appleCost: function(obj){ return -10; },
				perform: function(obj, action, n_plays=1)
				{
					n_plays = parseInt(n_plays);
					var p = 1/(2 + (obj.vue.objVal('finishedLevels')/5))
					// the probability p of one run completing in n_plays:
					p = 1 - Math.pow(1-p, n_plays);
					//console.log("probability of completing a level/total time improvement of " +n_plays+ " tries:", p);

					obj.vue.objValChange('plays', n_plays);
					var completed = Math.random() < p;
					if ( obj.vue.objVal('finishedLevels') < obj.value && obj.vue.objVal('finishedLevels') < 54 && completed )
					{
						// finish internal
						obj.vue.objValChange('applesPerSecond', 1);
						obj.vue.objValChange('finishedLevels', 1);
						if ( obj.vue.objVal('finishedLevels') == 10 ) obj.vue.headlines.push("Yay! Finished 10 levels! Only a few more to go?");
						if ( obj.vue.objVal('finishedLevels') == 20 ) obj.vue.headlines.push("Yay! Finished 20 levels! About half way there?");
						if ( obj.vue.objVal('finishedLevels') == 30 ) obj.vue.headlines.push("Yay! Finished 30 levels! For sure more than half way there.");
						if ( obj.vue.objVal('finishedLevels') == 40 ) obj.vue.headlines.push("Yay! Finished 40 levels! Seems like there are 54 in total.");
						if ( obj.vue.objVal('finishedLevels') == 50 ) obj.vue.headlines.push("Finished 50 levels!!! Seems like there are 55 in total?");
						if ( obj.vue.objVal('finishedLevels') == 54 ) obj.vue.headlines.push("YEAH!!! 54!!! It seems like there is a total time for the first 54 completed levels. I guess I should improve my total time? And there is more? Oh, you can download more levels?");
					}
					else if (obj.value && obj.vue.objVal('finishedLevels') > 53 && completed)
					{
						// improve total time
						var totalTimeBefore = obj.vue.objVal('totalTime');

						var diff = Math.random() * 0.005; // relative change of total time, an arbitrary weighted number
						diff *= obj.vue.objs.plays.value; // increase gain by a factor skill (number of plays)
						diff *= n_plays; // increase gain by a factor of the number of plays
						var difficulty_exp = 111; // arbitrary exponent to increase difficulty with
						//var difficulty_k = 111; // arbitrary constant to increase difficulty with
						if (totalTimeBefore >= 55) diff /= Math.pow(difficulty_exp * 2, 2); // decrease gain with difficulty
						else if (totalTimeBefore < 55) diff /= Math.pow(difficulty_exp * 15, 2);
						else if (totalTimeBefore < 50) diff /= Math.pow(difficulty_exp * 15, 2);
						else if (totalTimeBefore < 47) diff /= Math.pow(difficulty_exp * 15, 2);
						else if (totalTimeBefore < 45) diff /= Math.pow(difficulty_exp * 15, 2);
						else if (totalTimeBefore < 43) diff /= Math.pow(difficulty_exp * 15, 2);
						else if (totalTimeBefore < 42) diff /= Math.pow(difficulty_exp * 15, 2);
						else if (totalTimeBefore < 41) diff /= Math.pow(difficulty_exp * 15, 2);
						else if (totalTimeBefore < 40) diff /= Math.pow(difficulty_exp * 15, 2);
						else if (totalTimeBefore < 39) diff /= Math.pow(difficulty_exp * 15, 2);
						else if (totalTimeBefore < 38) diff /= Math.pow(difficulty_exp * 15, 2);
						else if (totalTimeBefore < 37.5) diff /= Math.pow(difficulty_exp * 15, 2);
						else if (totalTimeBefore < 37) diff /= Math.pow(difficulty_exp * 15, 2);
						else if (totalTimeBefore < 36.5) diff /= Math.pow(difficulty_exp * 15, 2);
						else if (totalTimeBefore < 36) diff /= Math.pow(difficulty_exp * 15, 2);
						else if (totalTimeBefore < 35.5) diff /= Math.pow(difficulty_exp * 15, 2);
						else if (totalTimeBefore < 35) diff /= Math.pow(difficulty_exp * 15, 2);
						else if (totalTimeBefore < 34.5) diff /= Math.pow(difficulty_exp * 15, 2);
						else if (totalTimeBefore < 34) diff /= Math.pow(difficulty_exp * 15, 2);
						obj.vue.objValRelativeChange('totalTime', 1 - diff);

						var totalTimeAfter = obj.vue.objVal('totalTime');
						if ( Math.ceil(totalTimeBefore) != Math.ceil(totalTimeAfter) && totalTimeBefore.toFixed(2) != totalTimeAfter.toFixed(2))
						{
							var minutebreak = Math.ceil(totalTimeAfter);
							if (minutebreak > 50 && minutebreak != 55) obj.vue.objValChange('applesPerSecond', 5);
							else if (minutebreak == 55)
							{
								obj.vue.objValChange('applesPerSecond', 5);
								obj.vue.headlines.push("Total time under 55!!!");
							}
							else if (minutebreak == 50)
							{
								obj.vue.objValChange('applesPerSecond', 10);
								obj.vue.headlines.push("Total time under 50!!!");
							}
							else if (minutebreak < 47)
							{
								obj.vue.objValChange('applesPerSecond', 15);
								obj.vue.headlines.push("Limit Break " +(minutebreak-1)+ "!!!");
							}
							else if (minutebreak < 40)
							{
								obj.vue.objValChange('applesPerSecond', 25);
								obj.vue.headlines.push("Mega LIMIT Break " +(minutebreak-1)+ "!!!!!");
							}
						}
					}

					if (obj.vue.objVal('plays') == 500) obj.vue.headlines.push("Unlocked Höylä! A more costly and manic way to play.");
					else if (obj.vue.objVal('plays') >= 5000 && obj.vue.objVal('plays') - n_plays < 5000 ) obj.vue.objs.year.action.next();
					obj.vue.scrollHeadlines(); // scroll to end

				},
				//disabledWhen: function(obj, action){ return obj.vue.objVal('apples') < obj.value * 10; },
			},
			{
				label: "Höylä",
				appleCost: function(obj){ return -obj.vue.objVal('plays')/4; },
				perform: function(obj)
				{
					var n_plays = obj.vue.objVal('plays')/50;
					obj.vue.objs.levels.action.play(n_plays);
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
		label: "Total Time (in Minutes)",
		caption: "This is the combined total time of all your best times of the internal levels of Elasto Mania. The first 54 levels. When the total time decreases it means you have improved your personal record on an internal level.",
		value: 60.0,
		visibleWhen: function(obj){ return obj.vue.objVal('finishedLevels') > 53; },
	},
);

// chat
// join team ODP for 50k apples, team c0ol for 500k
// elma cup n, world cup n
rcol.push(
	{
		name: "year",
		label: "Year",
		value: 1999,
		actions: [
			{
				name: "next",
				label: "Incr year",
				perform: function(obj)
				{
					obj.value++;
					obj.vue.headlines.push("Year " + obj.vue.objs.year.value);
					obj.vue.scrollHeadlines(); // scroll to end
				},
				visibleWhen: function(obj, action){ return false },
			},
		],
	},
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
					if ( obj.value == 1 )
					{
						obj.vue.objValChange('year', 1);
						obj.vue.headlines.push("Year " + obj.vue.objs.year.value);
						obj.vue.headlines.push("Woohoo! I got Elasto Mania!!! Now I can pick apples faster with my bike!");
					}
					obj.vue.scrollHeadlines(); // scroll to end
				},
				visibleWhen: function(obj, action){ return obj.value < 1; },
				disabledWhen: function(obj, action){ return obj.value > 0; },
			},
		],
	},
);
