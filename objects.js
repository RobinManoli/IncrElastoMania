var lcol = [];
var rcol = [];
var hcol = []; // hidden column


hcol.push(
	{
		name: "gotFirstFlower",
		value: 0,
	},
	{
		name: "gotBike",
		value: 0,
	},
	{
		name: "playedFirstWorldCup",
		value: 0,
	},

	{
		name: "elmaCupActive",
		value: 0,
	},
	{
		name: "elmaCupVersion",
		value: 0,
	},
	{
		name: "elmaCupPositionPerSecond",
		value: 1,
	},

	{
		name: "worldCupActive",
		value: 0,
	},
	{
		name: "worldCupVersion",
		value: 0,
	},
	{
		name: "worldCupPositionPerSecond",
		value: 1,
	},

	{
		name: "battleActive",
		value: 0,
	},
	{
		name: "battleVersion",
		value: 0,
	},
	{
		name: "battlePositionPerSecond",
		value: 1,
	},

	{
		name: "chatSkintor1",
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
				label: "Find Bike",
				perform: function(obj)
				{
					obj.vue.objs.gotBike.value = 1;
					obj.vue.objs.year.action.next();
					obj.vue.headlines.push("Found a bike! Now I can touch a flower with my wheels or my head after I have taken some apples. Brilliant! This activity will be a game called Elasto Mania!!!");
					obj.vue.scrollHeadlines(); // scroll to end
				},
				visibleWhen: function(obj){ return obj.vue.objs.gotFirstFlower.value > 0 && obj.vue.objs.gotBike.value == 0; },
			},
			{
				label: "Get level",
				perform: function(obj)
				{
					obj.value--;
					obj.vue.objValChange('levels', 1);
					if ( obj.vue.objVal('levels') == 55 ) obj.vue.headlines.push("I found this website called moposite. It has more levels to download! Hmmm... who's Abula?");
					if ( obj.vue.objVal('levels') == 60 ) obj.vue.headlines.push("There are some quite fun levels to download! Maybe I should get more?");
					if ( obj.vue.objVal('levels') == 70 )
					{
						obj.vue.headlines.push("Hmm, moposite has some Elasto Mania competitions. Maybe I should try it out? But why is it so expensive to participate?");
						obj.vue.objs.elmaCupPosition.value = 0;
						obj.vue.objs.elmaCupActive.value = 1;
						obj.vue.objs.elmaCupVersion.value += 1;
					}
					if ( obj.vue.objVal('levels') == 100 )
					{
						obj.vue.headlines.push("<BarTek> You got 100 levs! Maybe you are a level maker?");
					}
					obj.vue.scrollHeadlines(); // scroll to end
				},
				visibleWhen: function(obj){ return obj.vue.objs.gotBike.value > 0 && obj.vue.objs.levels.value < 100; },
				disabledWhen: function(obj, action){ return obj.vue.objVal('flowers') < 1; },
			},
			{
				label: "Make level",
				perform: function(obj)
				{
					obj.value--;
					obj.vue.objValChange('levels', 1);
					if ( obj.vue.objVal('levels') > 100 || obj.vue.objVal('levels') % 5 == 0 ) obj.vue.objs.applesPerSecond.value += 1;
					if ( obj.vue.objVal('levels') > 110 || obj.vue.objVal('levels') % 5 == 0 ) obj.vue.objs.applesPerSecond.value += 1;
					if ( obj.vue.objVal('levels') > 120 || obj.vue.objVal('levels') % 5 == 0 ) obj.vue.objs.applesPerSecond.value += 1;
					if ( obj.vue.objVal('levels') > 125 || obj.vue.objVal('levels') % 5 == 0 ) obj.vue.objs.applesPerSecond.value += 1;
					if ( obj.vue.objVal('levels') == 110 ) obj.vue.headlines.push("<CovBoy> good, make more levels!");
					if ( obj.vue.objVal('levels') == 120 ) obj.vue.headlines.push("<Ramone> make a hundred more levels!");
					if ( obj.vue.objVal('levels') == 130 ) obj.vue.headlines.push("<nmo> you've now made 30 levels");
					if ( obj.vue.objVal('levels') == 140 ) obj.vue.headlines.push("<barryp> all my levels are memorable");
					if ( obj.vue.objVal('levels') == 150 ) obj.vue.headlines.push("<Zebra> you should spend more time on your levels");
					if ( obj.vue.objVal('levels') == 151 ) obj.vue.headlines.push("<tl> you know what happened to me 10 years ago?");
					if ( obj.vue.objVal('levels') == 152 ) obj.vue.headlines.push("<Ramone> People are starting to appreciate your levels");
					if ( obj.vue.objVal('levels') == 155 ) obj.vue.headlines.push("<jblaze> my shirt is broccoli shaped");
					if ( obj.vue.objVal('levels') == 156 ) obj.vue.headlines.push("<jblaze> but I smell like onions");
					if ( obj.vue.objVal('levels') == 160 ) obj.vue.headlines.push("<ribot> there is a reason why flowers are expensive");
					if ( obj.vue.objVal('levels') == 165 ) obj.vue.headlines.push("<ribot> think about it, why do you even touch flowers?");
					if ( obj.vue.objVal('levels') == 170 ) obj.vue.headlines.push("<ribot> flower = someone who flows?");
					if ( obj.vue.objVal('levels') == 175 ) obj.vue.headlines.push("<ribot> there is a secret behind touching flowers");
					if ( obj.vue.objVal('levels') == 180 ) obj.vue.headlines.push("<jokke> you expect me to say something?");
					if ( obj.vue.objVal('levels') == 185 ) obj.vue.headlines.push("<Abula> you create a thread about this and i cant lock/delete it. please do it well so its sense to let it alive");
					if ( obj.vue.objVal('levels') == 190 ) obj.vue.headlines.push("<GuyB[rdk]> I like your levels");
					if ( obj.vue.objVal('levels') == 195 ) obj.vue.headlines.push("<ribot> there is another secret, about gravity");
					if ( obj.vue.objVal('levels') == 200 ) obj.vue.headlines.push("<ribot> and another secret");
					if ( obj.vue.objVal('levels') == 205 ) obj.vue.headlines.push("<ribot> about you, who you are");
					if ( obj.vue.objVal('levels') == 210 ) obj.vue.headlines.push("<Nin> So you ever know what happened to RoniMox?");
					if ( obj.vue.objVal('levels') == 215 ) obj.vue.headlines.push("<RoniMox> o,o");
					if ( obj.vue.objVal('levels') == 220 ) obj.vue.headlines.push("<RoniMox> Why you talk about me like that?");
					if ( obj.vue.objVal('levels') == 225 ) obj.vue.headlines.push("<RoniMox> Nin?");
					if ( obj.vue.objVal('levels') == 230 ) obj.vue.headlines.push("<RoniMox> You should help me out more at home");
					if ( obj.vue.objVal('levels') == 235 ) obj.vue.headlines.push("<AKB> :woozycat:");
					if ( obj.vue.objVal('levels') == 240 ) obj.vue.headlines.push("I've made a pie");
					if ( obj.vue.objVal('levels') == 245 ) obj.vue.headlines.push("<ville_j> I'm not saying that your level sux. But your level sux!");
					if ( obj.vue.objVal('levels') == 260 ) obj.vue.headlines.push("<ribot> so a flower is someone who flows");
					if ( obj.vue.objVal('levels') == 265 ) obj.vue.headlines.push("<ribot> and the Elasto Mania bike floats in water...	");
					if ( obj.vue.objVal('levels') == 270 ) obj.vue.headlines.push("<Sathy> don't listen to ribot, he thinks he knows everything");
				
					obj.vue.scrollHeadlines(); // scroll to end
				},
				visibleWhen: function(obj){ return obj.vue.objs.levels.value >= 100; },
				disabledWhen: function(obj, action){ return obj.vue.objVal('flowers') < 1; },
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
						if ( obj.vue.objVal('finishedLevels') == 1 ) obj.vue.headlines.push("Ok, I completed a level - one round of Elasto Mania. Let's see where this goes...");
						if ( obj.vue.objVal('finishedLevels') == 5 ) obj.vue.headlines.push("Finished 5 levels! I'm getting the hang of this.");
						if ( obj.vue.objVal('finishedLevels') == 10 ) obj.vue.headlines.push("Yay! Finished 10 levels! Only a few more to go?");
						if ( obj.vue.objVal('finishedLevels') == 20 ) obj.vue.headlines.push("Yay! Finished 20 levels! A random guy on the street said it's about half way there.");
						if ( obj.vue.objVal('finishedLevels') == 30 ) obj.vue.headlines.push("Yay! Finished 30 levels! For sure more than half way there.");
						if ( obj.vue.objVal('finishedLevels') == 40 ) obj.vue.headlines.push("Yay! Finished 40 levels! Someone named Csaba said it's 54 in total.");
						if ( obj.vue.objVal('finishedLevels') == 50 ) obj.vue.headlines.push("Finished 50 levels!!! Seems like there are 55 in total?");
						if ( obj.vue.objVal('finishedLevels') == 54 ) obj.vue.headlines.push("YEAH!!! 54!!! It seems like there is a total time for the first 54 completed levels. I guess I should improve my total time? And there is more? Oh, you can download more levels?");
					}
					else if (obj.value && obj.vue.objVal('finishedLevels') > 53 && completed)
					{
						// the chance of completed being true increases over time
						// improve total time
						var totalTimeBefore = obj.vue.objVal('totalTime');

						var diff = Math.random() * 0.001; // relative change of total time, an arbitrary weighted number
						if (n_plays > 2) diff *= Math.log(n_plays); // increase slowly in time
						difficulty = 3;
						if (totalTimeBefore >= 55) diff = diff;
						else if (totalTimeBefore > 50) diff /= Math.pow(difficulty, 2);
						else if (totalTimeBefore > 47) diff /= Math.pow(difficulty, 2);
						else if (totalTimeBefore > 45) diff /= Math.pow(difficulty, 2);
						else if (totalTimeBefore > 43) diff /= Math.pow(difficulty, 2);
						else if (totalTimeBefore > 42) diff /= Math.pow(difficulty, 2);
						else if (totalTimeBefore > 41) diff /= Math.pow(difficulty, 2);
						else if (totalTimeBefore > 40) diff /= Math.pow(difficulty, 2);
						else if (totalTimeBefore > 39) diff /= Math.pow(difficulty, 2);
						else if (totalTimeBefore > 38) diff /= Math.pow(difficulty, 2);
						else if (totalTimeBefore > 37.5) diff /= Math.pow(difficulty, 2);
						else if (totalTimeBefore > 37) diff /= Math.pow(difficulty, 2);
						else if (totalTimeBefore > 36.5) diff /= Math.pow(difficulty, 2);
						else if (totalTimeBefore > 36) diff /= Math.pow(difficulty, 2);
						else if (totalTimeBefore > 35.5) diff /= Math.pow(difficulty, 2);
						else if (totalTimeBefore > 35) diff /= Math.pow(difficulty, 2);
						else if (totalTimeBefore > 34.5) diff /= Math.pow(difficulty, 2);
						else if (totalTimeBefore > 34) diff /= Math.pow(difficulty, 2);
						obj.vue.objValRelativeChange('totalTime', 1 - diff);

						var totalTimeAfter = obj.vue.objVal('totalTime');
						if ( Math.ceil(totalTimeBefore) != Math.ceil(totalTimeAfter) && totalTimeBefore.toFixed(2) != totalTimeAfter.toFixed(2))
						{
							var minutebreak = Math.ceil(totalTimeAfter);
							if (minutebreak > 50 && minutebreak != 55)
							{
								obj.vue.objValChange('applesPerSecond', Math.pow(60-minutebreak, 2));
								obj.vue.headlines.push("Great! Total time under " + minutebreak);
							}
							else if (minutebreak == 55)
							{
								obj.vue.objValChange('applesPerSecond', 7);
								obj.vue.headlines.push("YEAH!!! Total time under 55!!!");
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

					if (obj.vue.objVal('plays') == 400) obj.vue.headlines.push("Unlocked Höylä! A more costly and manic way to play.");
					else if (obj.vue.objVal('plays') >= 5000 && obj.vue.objVal('plays') - n_plays < 5000 ) obj.vue.objs.year.action.next();
					else if (obj.vue.objVal('plays') >= 20000 && obj.vue.objVal('plays') - n_plays < 20000 )
					{
						obj.vue.objs.elmaCupActive.value = 1;
						obj.vue.objs.elmaCupVersion.value += 1;
						obj.vue.objs.elmaCupPosition.value = 0;
						obj.vue.objs.year.action.next();
						obj.vue.headlines.push("Oh Elma Cup " +obj.vue.objs.elmaCupVersion.value+ " is coming up. Maybe I can do better this time?");
					}
					else if (obj.vue.objVal('plays') >= 40000 && obj.vue.objVal('plays') - n_plays < 40000 )
					{
						obj.vue.objs.elmaCupActive.value = 1;
						obj.vue.objs.elmaCupVersion.value += 1;
						obj.vue.objs.elmaCupPosition.value = 0;
						obj.vue.headlines.push("Ooh Elma Cup " + obj.vue.objs.elmaCupVersion.value);
					}
					else if (obj.vue.objVal('plays') >= 80000 && obj.vue.objVal('plays') - n_plays < 80000 )
					{
						obj.vue.objs.elmaCupActive.value = 1;
						obj.vue.objs.elmaCupVersion.value += 1;
						obj.vue.objs.elmaCupPosition.value = 0;
						obj.vue.objs.year.action.next();
						obj.vue.headlines.push("Ooh Elma Cup " + obj.vue.objs.elmaCupVersion.value);
					}
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
				visibleWhen: function(obj, action){ return obj.vue.objVal('plays') > 399; },
				//disabledWhen: function(obj, action){ return obj.vue.objVal('apples') < obj.value * 10; },
			},
		],
	},

	{
		name: "battlePosition",
		label: "Battle Position",
		caption: "This is the arena where you meet other players and compete face to face. Everyone who has set their wheels here for sure has touched flowers.",
		value: 0,
		visibleWhen: function(obj, action){ return obj.vue.objs.battleVersion.value > 0; },
		actions: [
			{
				label: "Start",
				appleCost: function(obj){ return -obj.vue.objs.battleVersion.value * 500; },
				perform: function(obj)
				{
					obj.action.getPrize(); // so that prize is not lost
					obj.value = 15;
					obj.vue.objs.battleTimeLeft.value = 3;
					obj.vue.objs.battlePlays.value += 1;
				},
				disabledWhen: function(obj, action){ return obj.vue.objs.battleTimeLeft.value > 0; },
				//disabledWhen: function(obj, action){ return obj.value > 0; },
			},
			{
				label: "Play",
				appleCost: function(obj){ return -obj.vue.objs.battleVersion.value * 50; },
				perform: function(obj)
				{
					obj.value -= parseInt(Math.random() * obj.vue.objs.battleVersion.value * Math.log10( obj.vue.objs.plays.value )/2);
					if ( obj.value < 1 ) obj.value = 1;
					obj.vue.objs.plays.value += 1;
				},
				visibleWhen: function(obj, action){ return obj.vue.objs.battleTimeLeft.value > 0 },
			},
			{
				name: "getPrize",
				label: "Get prize",
				perform: function(obj)
				{
					if (obj.vue.objs.battlePosition.value > 0)
					{
						// get prize from last battle
						flowers = 10 - obj.vue.objs.battlePosition.value;
						if (flowers < 0) flowers = 0;
						obj.vue.objs.flowers.value += flowers;
						obj.vue.objs.applesPerSecond.value += flowers;
						if (obj.vue.objs.battlePosition.value == 1)
						{
							// won battle
							obj.vue.objs.battleWins.value += 1;
							if (obj.vue.objs.battleWins.value == 1) obj.vue.headlines.push("<Ramone> won your first battle, YEAH");
						}
						if (obj.vue.objs.battlePlays.value == 1) obj.vue.headlines.push("So that was my first battle? Fierce!");
						if (obj.vue.objs.battlePlays.value == 2) obj.vue.headlines.push("Am I doing this battle thing correctly?");
						if (obj.vue.objs.battlePlays.value == 10) obj.vue.headlines.push("<GodFater> If you can't improve in battles, improve your total time. If you can't improve total time maybe you should become a level maker?");
						if (obj.vue.objs.battlePlays.value == 15) obj.vue.headlines.push("<Skint0r> i made the first battle bot (a copy of ribot's)");
						obj.vue.scrollHeadlines(); // scroll to end
						obj.vue.objs.battlePosition.value = 0;
					}
				},
				visibleWhen: function(obj, action){ return obj.vue.objs.battleTimeLeft.value == 0; },
			},
		],
	},
	{
		name: "battleTimeLeft",
		label: "Battle Time Left",
		value: -1,
		visibleWhen: function(obj){ return obj.value > 0 },
	},
	{
		name: "battleWins",
		label: "Battle Wins",
		value: 0,
		visibleWhen: function(obj){ return obj.value > 0 },
	},

	{
		name: "totalTime",
		label: "Total Time (in Minutes)",
		caption: "This is the combined total time of all your best times of the internal levels of Elasto Mania. The first 54 levels. When the total time decreases it means you have improved your personal record on an internal level.",
		value: 60.0,
		visibleWhen: function(obj){ return obj.vue.objVal('finishedLevels') > 53; },
	},
	{
		name: "finishedLevels",
		label: "Completed Levels",
		value: 0,
		visibleWhen: function(obj){ return obj.value > 0 && obj.value < 54; },
	},

	{
		name: "elmaCupPosition",
		label: "Elma Cup Position",
		caption: "This is a cup in which you compete with community created levels. Try to get to first position (and remain there) before the cup is over!",
		value: 0,
		actions: [
			{
				label: "Start",
				appleCost: function(obj){ return -obj.vue.objs.elmaCupVersion.value * 2500; },
				perform: function(obj)
				{
					obj.value = 25;
					obj.vue.objs.elmaCupEventsLeft.value = 10;
				},
				disabledWhen: function(obj, action){ return obj.value > 0; },
				//disabledWhen: function(obj, action){ return obj.value > 0; },
			},
			{
				label: "Höylä",
				appleCost: function(obj){ return -obj.vue.objs.elmaCupVersion.value * 500; },
				perform: function(obj)
				{
					var posChange = parseInt(Math.random() * obj.vue.objs.elmaCupVersion.value * 2);
					if (obj.vue.objs.elmaCupVersion.value == 4) posChange = parseInt( posChange/4 )
					obj.value -= posChange;
					if ( obj.value < 1 ) obj.value = 1;
					obj.vue.objs.plays.value += 50;
				},
				disabledWhen: function(obj, action){ return obj.vue.objs.elmaCupEventsLeft.value < 1 },
			},
			{
				label: "Get Prize",
				perform: function(obj)
				{
					flowers = 25 - obj.vue.objs.elmaCupPosition.value;
					if (flowers < 0) flowers = 0;
					flowers *= obj.vue.objs.elmaCupVersion.value;
					obj.vue.objs.flowers.value += flowers;
					obj.vue.objs.elmaCupActive.value = 0;
					obj.vue.objs.applesPerSecond.value += flowers;
					obj.vue.headlines.push("Elma Cup " +obj.vue.objs.elmaCupVersion.value+ " Ended! Position: " +obj.vue.objs.elmaCupPosition.value+ ". Won " +flowers+ " flowers." );
					if ( obj.vue.objs.elmaCupVersion.value == 1 ) obj.vue.headlines.push("Wow that was a tough cup! It seems like there is an Elasto Mania chat room...");

					if (obj.vue.objs.elmaCupPosition.value == 1)
					{
						// won cup
						obj.vue.objs.elmaCupWins.value += 1;
						if (obj.vue.objs.elmaCupWins.value == 1) obj.vue.headlines.push("<rawl> won your first cup, YEAH");
					}

					obj.vue.scrollHeadlines(); // scroll to end
					obj.vue.objs.chat.value += 1; // activate chat first cup
				},
				visibleWhen: function(obj, action){ return obj.vue.objs.elmaCupEventsLeft.value == 0 && obj.vue.objs.elmaCupPosition.value > 0},
			},
		],
		visibleWhen: function(obj){ return obj.vue.objs.elmaCupActive.value == 1 },
	},
	{
		name: "elmaCupEventsLeft",
		label: "Elma Cup Events Left",
		value: -1,
		visibleWhen: function(obj){ return obj.vue.objs.elmaCupActive.value == 1 && obj.value >= 0 },
	},
	{
		name: "elmaCupWins",
		label: "Elma Cup Wins",
		value: 0,
		visibleWhen: function(obj){ return obj.value > 0 },
	},


	{
		name: "worldCupPosition",
		label: "World Cup Position",
		caption: "This is the world cup in which you compete with community created levels. Try to get to first position (and remain there) before the cup is over!",
		value: 0,
		actions: [
			{
				label: "Start",
				appleCost: function(obj){ return -obj.vue.objs.worldCupVersion.value * 5000; },
				perform: function(obj)
				{
					obj.value = 75;
					obj.vue.objs.worldCupEventsLeft.value = 20;
				},
				disabledWhen: function(obj, action){ return obj.value > 0; },
			},
			{
				label: "Höylä",
				appleCost: function(obj){ return -obj.vue.objs.worldCupVersion.value * 500; },
				perform: function(obj)
				{
					obj.value -= parseInt(Math.random() * obj.vue.objs.worldCupVersion.value * 2);
					if ( obj.value < 1 ) obj.value = 1;
					obj.vue.objs.plays.value += 50;
				},
				disabledWhen: function(obj, action){ return obj.vue.objs.worldCupEventsLeft.value < 1 },
			},
			{
				label: "Get Prize",
				perform: function(obj)
				{
					flowers = 75 - obj.vue.objs.worldCupPosition.value;
					if (flowers < 0) flowers = 0;
					obj.vue.objs.flowers.value += flowers;
					obj.vue.objs.worldCupActive.value = 0;
					obj.vue.objs.applesPerSecond.value += flowers;
					obj.vue.headlines.push("World Cup " +obj.vue.objs.worldCupVersion.value+ " Ended! Position: " +obj.vue.objs.worldCupPosition.value+ ". Won " +flowers+ " flowers." );
					obj.vue.scrollHeadlines(); // scroll to end

					if (obj.vue.objs.worldCupVersion.value == 1) obj.vue.objs.playedFirstWorldCup.value = 1;
				},
				visibleWhen: function(obj, action){ return obj.vue.objs.worldCupEventsLeft.value == 0 },
			},
		],
		visibleWhen: function(obj){ return obj.vue.objs.worldCupActive.value == 1 },
	},
	{
		name: "worldCupEventsLeft",
		label: "World Cup Events Left",
		value: -1,
		visibleWhen: function(obj){ return obj.vue.objs.worldCupActive.value == 1 && obj.value >= 0 },
	},
);

// team c0ol
rcol.push(
	{
		name: "team",
		label: "Team",
		value: "",
		visibleWhen: function(obj, action){ return obj.value.length > 0 },
	},
	{
		name: "time",
		label: "Time",
		value: 0,
		//visibleWhen: function(obj, action){ return obj.value > 500 },
	},
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
		//visibleWhen: function(obj, action){ return obj.value > 500 },
	},
	{
		name: "battlePlays",
		label: "Battle plays",
		value: 0,
		visibleWhen: function(obj, action){ return obj.value > 0 },
	},
	{
		name: "chat",
		label: "Chat",
		value: -1,
		visibleWhen: function(obj){ return obj.value > -1; },
		actions: [
			{
				label: "Join team: ODP",
				appleCost: function(obj){ return -2500; },
				perform: function(obj)
				{
					obj.value++;
					if ( obj.vue.objs.levels.value >= 90 )
					{
						obj.vue.objs.team.value = "[ODP]";
						obj.vue.headlines.push("Wow you've joined a team: [ODP] - Opulenti Directi Pugili! Your team is quite good, holding one world record!");
						obj.vue.headlines.push("And now the first world cup is coming up!");
						obj.vue.objs.applesPerSecond.value += 5;
						obj.vue.objs.worldCupActive.value = 1;
						obj.vue.objs.worldCupVersion.value = 1;
					}
					else
					{
						obj.vue.headlines.push("[ODP] You need more levels to join our team.");
						obj.vue.objs.apples.value += 2500;
					}
					obj.vue.scrollHeadlines(); // scroll to end
				},
				visibleWhen: function(obj, action){ return obj.vue.objs.team.value != "[ODP]"; },
			},
			{
				label: "Join team: PRA",
				appleCost: function(obj){ return -50000; },
				perform: function(obj)
				{
					obj.value++;
					if ( obj.vue.objs.totalTime.value > 44 )
					{
						obj.vue.headlines.push("[PRA] Can't accept your apples. Your total time is too low.");
						obj.vue.objs.apples.value += 50000;
					}
					obj.vue.scrollHeadlines(); // scroll to end
				},
				//visibleWhen: function(obj, action){ return obj.value < 1; },
			},
			{
				label: "Join team: FM",
				appleCost: function(obj){ return -50000; },
				perform: function(obj)
				{
					obj.value++;
					if ( true )
					{
						obj.vue.headlines.push("[FM] Do you even touch flowers?");
						obj.vue.objs.apples.value += 40000;
					}
					obj.vue.scrollHeadlines(); // scroll to end
				},
				//visibleWhen: function(obj, action){ return obj.value < 1; },
			},
			{
				label: "Join team: BAP",
				perform: function(obj)
				{
					obj.value++;
					if ( true )
					{
						obj.vue.headlines.push("[BAP] oke");
						obj.vue.objs.team.value = "[BAP]";
					}
					obj.vue.scrollHeadlines(); // scroll to end
				},
				visibleWhen: function(obj, action){ return obj.vue.objs.elmaCupWins.value == 1; },
			},
			{
				label: "Join team: c0ol",
				appleCost: function(obj){ return -10000; },
				perform: function(obj)
				{
					obj.value++;
					if ( true )
					{
						obj.vue.headlines.push("[c0ol] You haven't done anything c0ol, so you can't join the team");
						obj.vue.headlines.push("It is now time to get serious. The world of battle begins.");
						obj.vue.objs.apples.value += 10000;
						obj.vue.objs.battleVersion.value = 1;
					}
					obj.vue.scrollHeadlines(); // scroll to end
				},
				visibleWhen: function(obj, action){ return obj.vue.objs.playedFirstWorldCup.value == 1 && obj.vue.objs.battleVersion.value == 0; },
			},

			{
				label: "Chat with: skint0r",
				appleCost: function(obj){ return -1500; },
				perform: function(obj)
				{
					obj.value++;
					if ( true )
					{
						obj.vue.headlines.push("<skint0r> Better get a lot of apples before wcup...");
						obj.vue.objs.chatSkintor1.value = 1;
					}
					obj.vue.scrollHeadlines(); // scroll to end
				},
				visibleWhen: function(obj, action){ return obj.vue.objs.chatSkintor1.value < 1; },
			},
			{
				label: "Chat with: Abula",
				//appleCost: function(obj){ return -1500; },
				perform: function(obj)
				{
					obj.value++;
					if ( true )
					{
						obj.vue.headlines.push("<Abula> do everything exactly as I tell you, or ban");
					}
					obj.vue.scrollHeadlines(); // scroll to end
				},
				visibleWhen: function(obj, action){ return obj.vue.objs.playedFirstWorldCup.value == 1 && obj.vue.objs.battleVersion.value == 0; },
			},
		],
	},
);
