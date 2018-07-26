//global variables and initial display


var stats = showStats();
var arch = rollArch();
var hitDie = setHitDie();
var actLvl = getLvl();
var absLvl = actLvl * 2 - 1
updateArchSort();
var statMod = getStatMods();
var hitPoints = getHitPoints (hitDie, absLvl);
var con = stats[0];
var str = stats[1];
var dex = stats[2];
var int =  stats[3];
var wis = stats[4];
var cha = stats[5];
var conMod = statMod[0];
var strMod = statMod[1];
var dexMod = statMod[2];
var intMod =  statMod[3];
var wisMod = statMod[4];
var chaMod = statMod[5];

lockArch();
lockLevel();
showHitPoints();


//Operational functions

function getRandomInt(min, max){
	min = Math.floor(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

function makeAttrRoll(){
	roll1 = getRandomInt(1, 6);
    roll2 = getRandomInt(1, 6);
    roll3 = getRandomInt(1, 6);
    roll4 = getRandomInt(1, 6);
    return roll1 + roll2 + roll3 + roll4 - Math.min(roll1, roll2, roll3, roll4);
};

function testLocked(value){
	var isLocked = document.getElementById(value).checked;
	if (isLocked) {
		return true;
	}  else {
		return false;
	};
}


//stat determining functions

function rollArch() {
	var x = getRandomInt(0, 6);
	var archTable = ["Air Bender", "Fire Bender", "Water Bender", "Earth Bender", "Rogue", "Fighter", "Barbarian"]
	return archTable[x];
};

function setHitDie(){
	switch(arch){
		case "Air Bender" :
			return 6
			break;
		case "Fire Bender" :
			return 6
			break;
		case "Water Bender" :
			return 8
			break; 
		case "Earth Bender" :
			return 10
			break;
		case "Rogue" :
			return 8
			break; 
		case "Fighter" :
			return 10
			break;
		case "Barbarian" :
			return 12
			break;
	}
};

function getLvl(){
	return getRandomInt(1, 9);
};

function getStats() {
	con = makeAttrRoll();
    str = makeAttrRoll();
    dex = makeAttrRoll();
    int = makeAttrRoll();
    wis = makeAttrRoll();
    cha = makeAttrRoll();
    return [con, str, dex, int, wis, cha]
};

function sortStats() {
	return stats.sort(function(a, b){return b - a});
};

function sortStatsByArch(){
	let sortedStats = sortStats();
	switch  (arch){
		case "Air Bender": 
			return stats = [sortedStats[3], sortedStats[5], (sortedStats[0] + 2), sortedStats[2], (sortedStats[1] + 1), sortedStats[4]]
			break
		case "Fire Bender":
			return stats = [sortedStats[2], (sortedStats[0] + 2), sortedStats[1], sortedStats[4], sortedStats[5], sortedStats[3]]
			break
		case "Water Bender":
			return stats = [sortedStats[1], sortedStats[4], (sortedStats[3] + 1), sortedStats[2], (sortedStats[0] + 2), sortedStats[5]]
			break
		case "Earth Bender": 
			return stats =  [(sortedStats[0] + 1), (sortedStats[1] +1), sortedStats[4], sortedStats[3], sortedStats[2], sortedStats[5]]
			break
		case "Rogue":
			return stats =  [sortedStats[2], sortedStats[4], sortedStats[0], sortedStats[1], sortedStats[5], sortedStats[3]]
			break
		case "Fighter":
			return stats = [sortedStats[1], sortedStats[0], sortedStats[2], sortedStats[4], sortedStats[3], sortedStats[5]]
			break
		case "Barbarian":
			return stats = [sortedStats[0], sortedStats[1], sortedStats[2], sortedStats[4], sortedStats[3], sortedStats[5]]
		default :
			stats = getStats();
		}	
	};

function getStatMods(){
		var conMod = Math.floor((stats[0] - 10) / 2)
		var strMod = Math.floor((stats[1] - 10) / 2)
		var dexMod = Math.floor((stats[2] - 10) / 2)
		var intMod = Math.floor((stats[3] - 10) / 2)
		var wisMod = Math.floor((stats[4] - 10) / 2)
		var chaMod = Math.floor((stats[5] - 10) / 2)
			return [conMod, strMod, dexMod, intMod, wisMod, chaMod];
};

function getHitPoints (max, lvl){
	var conMod = statMod[0]
	var firstLvl = max + conMod;
	var aftLvl = 0;
	var i;
	for (i = 0; i <  lvl - 1  ; i++) { 
   		aftLvl += getRandomInt(1, max) + conMod
	};
	return firstLvl + aftLvl
};

function updateArchSort(){
sortStatsByArch();
document.getElementById("con").innerHTML = 'Con: '  + stats[0];
document.getElementById("str").innerHTML = 'Str: ' + stats[1];
document.getElementById("dex").innerHTML = 'Dex: ' + stats[2];
document.getElementById("int").innerHTML = 'Int: ' + stats[3];
document.getElementById("wis").innerHTML = 'Wis: ' + stats[4];
document.getElementById("cha").innerHTML = 'Cha: ' + stats[5];
};

function archBonus(){
	
};

function updateStatsAndMods(){
statMod = getStatMods();
con = stats[0];
str = stats[1];
dex = stats[2];
int =  stats[3];
wis = stats[4];
cha = stats[5];
conMod = statMod[0];
strMod = statMod[1];
dexMod = statMod[2];
intMod =  statMod[3];
wisMod = statMod[4];
chaMod = statMod[5];
}

//display functions

function showArchStats(){
arch = rollArch();
hitDie = setHitDie();
actLvl = getLvl();
absLvl = actLvl * 2 - 1
hitPoints = getHitPoints (hitDie, absLvl);
document.getElementById("archeType").innerHTML = 'Class: ' + arch;
document.getElementById("level").innerHTML = 'Level: ' + actLvl ;
document.getElementById("hp").innerHTML = 'Hit Points: ' + hitPoints ; 
document.getElementById("hitDie").innerHTML = 'Hit Die: ' + hitDie ;
};

function lockArch(){
	if (testLocked("checkArch")) {
		document.getElementById("archeType").innerHTML = 'Class: ' + arch;
	} else {
		arch = rollArch();
		hitDie = setHitDie();
		document.getElementById("archeType").innerHTML = 'Class: ' + arch;
		document.getElementById("hitDie").innerHTML = 'Hit Die: ' + hitDie ;
	};
}

function lockLevel(){
	if (testLocked("checkLevel")) {
		document.getElementById("level").innerHTML = 'Level: ' + actLvl ;
	} else {
		actLvl = getLvl();
		absLvl = actLvl * 2 -1
		document.getElementById("level").innerHTML = 'Level: ' + actLvl ;
	}
}

function showHitPoints(){
		hitPoints = getHitPoints (hitDie, absLvl);
		document.getElementById("hp").innerHTML = 'Hit Points: ' + hitPoints ; 
}

document.getElementById("rollArchStats").addEventListener("click", lockArch);
document.getElementById("rollArchStats").addEventListener("click", lockLevel);
document.getElementById("rollArchStats").addEventListener("click", showHitPoints);
document.getElementById("rollArchStats").addEventListener("click", updateArchSort);
document.getElementById("rollArchStats").addEventListener("click", updateStatsAndMods);

function showStats(){
stats = getStats();
sortStatsByArch();
statMod = getStatMods();
con = stats[0];
str = stats[1];
dex = stats[2];
int =  stats[3];
wis = stats[4];
cha = stats[5];
conMod = statMod[0];
strMod = statMod[1];
dexMod = statMod[2];
intMod =  statMod[3];
wisMod = statMod[4];
chaMod = statMod[5];
document.getElementById("con").innerHTML = 'Con: '  + stats[0];
document.getElementById("str").innerHTML = 'Str: ' + stats[1];
document.getElementById("dex").innerHTML = 'Dex: ' + stats[2];
document.getElementById("int").innerHTML = 'Int: ' + stats[3];
document.getElementById("wis").innerHTML = 'Wis: ' + stats[4];
document.getElementById("cha").innerHTML = 'Cha: ' + stats[5];
return [stats[0], stats[1], stats[2], stats[3], stats[4], stats[5]];
}

function updateHitPoints(){
hitPoints = getHitPoints (hitDie, absLvl);
document.getElementById("hp").innerHTML = 'Hit Points: ' + hitPoints
}

document.getElementById("rollAttributes").addEventListener("click", showStats);
document.getElementById("rollAttributes").addEventListener("click", updateHitPoints);


document.getElementById("rollChar").addEventListener("click", lockArch);
document.getElementById("rollChar").addEventListener("click", lockLevel);
document.getElementById("rollChar").addEventListener("click", showHitPoints);
document.getElementById("rollChar").addEventListener("click", updateArchSort);
document.getElementById("rollChar").addEventListener("click", showStats);
document.getElementById("rollChar").addEventListener("click", updateHitPoints);
