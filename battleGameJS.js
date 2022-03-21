//[^] Removal of Introduction
function removeIntro(){
	document.getElementById('intro').remove();
	document.getElementById('jamButton').remove();
	document.getElementById('removeIButton').remove();
}

//[^] Count function
function countOf(arr, item){
	let count=0;
	for (let i=0; i<arr.length; i++){
		if (arr[i] === item){
			count++;
		}
	}
	return count;
}

//[^] Update Count Function
function countList(arr, itemArr){
	returnArr = [];
	for (let i=0; i<itemArr.length; i++){
		returnArr.push(0);
	}
	for (let n=0; n<arr.length; n++){
		returnArr[itemArr.indexOf(arr[n])] += 1;
	}
	return returnArr;
}

//[^] Variable Declarations
const spaces = ['@0','A1','A2','A3','A4','B1','B2','B3','B4','C1','C2','M0','D2','D1','E4','E3','E2','E1','F4','F3','F2','F1','#0'];
let spaceConnections = [['A1','A2'],['A3','@0'],['A4','@0'],['A1','A4'],['A3','A4','B1'],/*A:B*/['A4','B2'],['B1','B3'],['B2','B4'],['B3','C1'],/*B:M*/['B4','C2'],['C1','M0'],/*MID*/['C2','D2']/*MID*/,['M0','D1'],['D2','E4'],/*M:E*/['D1','E3'],['E4','E2'],['E3','E1'],['E2','F4'],/*E:F*/['E4','F3','F2'],['F4','F1'],['F4','#0'],['F3','#0'],['F1','F2']];
const deck = ['[No]','[Ambush]','[Bomb]','[Steal]','[Energize]','[Exhaust]'];
let spaceContents = [];
let unitCount = [[],[]];
let unitMoves = [];
for (let i=0; i<spaces.length; i++) {
	spaceContents.push([]);
	unitMoves.push([]);
}
spaceContents[0] = ['BM1','BM1','BK'];
unitMoves[0] = [false,false,true];
spaceContents[22] = ['RM1','RM1','RK'];
unitMoves[22] = [false,false,true];
spaceContents[1] = ['BM1'];
unitMoves[1] = [false];
spaceContents[21] = ['RM1'];
unitMoves[21] = [false];
spaceContents[2] = ['BM1'];
unitMoves[2] = [false];
spaceContents[20] = ['RM1'];
unitMoves[20] = [false];
const unitTypes = ['BM1','BM2','BD1','BB1','BB2','BS1','BS2','BK','RM1','RM2','RD1','RB1','RB2','RS1','RS2','RK'];
const unitPower = [5,7,1,12,15,3,4,0,5,7,1,12,15,3,4,0];
let dummyArr = [];
let dummyArr2 = [];
let dummyStr = '';
let dummyVar;
let counter;
let ambushActive = [false,false];
let noActive = [false,false];
let bombActive = false;
let stealActive = false;
let exhaustNum = 0;
let cardButtonsActive = [false,false,false,false,false];
let spacesOwned = [3,3];
let consoleLines = 1;
let cardDrawn;
let gemChance = 24;
let goldEarned;
let spaceTeam = [];
for (let i=0; i<spaces.length; i++) {
	spaceTeam.push('N');
}
spaceTeam[0] = 'B';
spaceTeam[1] = 'B';
spaceTeam[2] = 'B';
spaceTeam[22] = 'R';
spaceTeam[21] = 'R';
spaceTeam[20] = 'R';
let ownedMiddle = -1;
let gemSentence;
let moveCardType = true;
let gold = [6,6];
let gems = [1,1];
let hands = [['','','','',''],['','','','','']];
let cards = [0,0];
let dice;
let dice2;
let dice3;
let team;
let teamNum;
let enemyTeamNum;
let gemStealMax = 1;
let turnStartText = [];

//[^] Set team
let enemyTeamChar;
let teamChar;
function setTeam(color) {
	team = color;
	if (team === 'Blue'){
		teamNum = 0;
		enemyTeamNum = 1;
		teamChar = 'B';
		enemyTeamChar = 'R';
	}
	else if (team === 'Red') {
		teamNum = 1;
		enemyTeamNum = 0;
		teamChar = 'R';
		enemyTeamChar = 'B';
	}
	else {
		alert('An error has occured. Please email me (rgtuma19@gmail.com) the following code and how you got here.\nError code: TS#'+team);//TS#{team}
	}
	document.getElementById('teamDisplay').innerHTML = ('Team: ' + team);
	document.getElementById('startButton').style.display = "block";
	document.getElementById('teamButtonB').remove();
	document.getElementById('teamButtonR').remove();
	document.getElementById('unitCheckControls').style.display = 'block';
}

//[^] Update Train Cost
let trainNum;
let trainType;
let trainCost = 2;
function updateTrainCost(){
	trainNum = Math.floor(document.getElementById('trainNum').value);
	trainType = (document.getElementById('trainType').value);
	switch (trainType){
		case 'M1':
			trainCost = (trainNum * 3);
			break;
		case 'M2':
			trainCost = (trainNum * 4);
			break;
		case 'D1':
			trainCost = (trainNum * 1);
			break;
		case 'B1':
			trainCost = (trainNum * 7);
			break;
		case 'B2':
			trainCost = (trainNum * 10);
			break;
		case 'S1':
			trainCost = (trainNum * 2);
			break;
		case 'S2':
			trainCost = (trainNum * 3);
			break;
		default:
			alert('An error has occured. Code: TR'+trainType);
			break;
	}
	document.getElementById('costDisplay').innerHTML = ' (COST: '+trainCost+' gold)';
}

//[^] Update Currency
function updateCurrency(){
	document.getElementById('goldDisplay').innerHTML = ('Gold: ' + gold[teamNum]);
	document.getElementById('gemDisplay').innerHTML = ('Gems: ' + gems[teamNum]);
}

//[^] Debug Function 1
function debug2201(){
	gold[teamNum] += 9999;
	gems[teamNum] += 9999;
	updateCurrency();
}

//[^] Debug Function 2
function debug2202(){
	spaceContents[3] = ['RM1','RM1','RB2'];
	unitMoves[3] = [false,false,false];
	spaceContents[1] = ['BM1','BM1','BB1'];
	unitMoves[1] = [false,false,false];
}

//[^] Update Console
function consoleUpdate(text) {
	document.getElementById('console').innerHTML = '';
	for (let i=0; i<text.length; i++){
		document.getElementById('console').innerHTML += text[i] + '<br>';
	}
}

//[^] Update Hand
function updateHand() {
	for (let i=1; i<6; i++){
		if (hands[teamNum][i-1] !== '') {
			document.getElementById('card'+i).innerHTML = hands[teamNum][(i-1)];
			document.getElementById('card'+i).disabled = false;
			document.getElementById('card'+i).value = hands[teamNum][(i-1)];
		} else {
			document.getElementById('card'+i).innerHTML = 'Empty';
			document.getElementById('card'+i).disabled = true;
			document.getElementById('card'+i).value = 'none';
		}
	}
}

//[^] Start Turn
function startTurn() {
	if (cards[teamNum]<5){
		cardDrawn = deck[Math.floor((Math.random() * deck.length))];
		hands[teamNum][cards[teamNum]] = cardDrawn;
		cardButtonsActive[cards[teamNum]] = true;
		cards[teamNum]++;
		cardSentence = ('You drew the '+cardDrawn+' card!');
		updateHand();
	} else {
		cardSentence = 'Your hand is full, so you didn\'t draw any cards.';
	}
	gemStealMax += 0.3;
	document.getElementById('moveControls').style.display = 'block';
	document.getElementById('startButton').style.display = 'none';
	document.getElementById('cardControls').style.display = 'block';
	document.getElementById('trainControls').style.display = 'block';
	goldEarned = (spacesOwned[teamNum]*3);
	gold[teamNum] += goldEarned;
	gemChance = 24;
	if (ownedMiddle === teamNum){
		gemChance += 15;
	}
	if (Math.floor((Math.random() * 100)) < gemChance){
		gemSentence = '+1 Gem (Chance)';
		gems[teamNum] += 1;
	} else {
		gemSentence = '+0 Gems (Chance)';
	}
	updateCurrency();
	turnStartText = [cardSentence,('+'+goldEarned+' Gold (From spaces owned)'),gemSentence];
	if (stealActive){
		turnStartText.push('The enemy stole something from you with the [Steal] card!');
		stealActive = false;
	}
	if (bombActive){
		turnStartText.push('The enemy set off a [Bomb] card somewhere!');
		bombActive = false;
	}
	if (exhaustNum > 0){
		turnStartText.push('The enemy played '+exhaustNum+' exhaust card(s)!');
		exhaustNum = 0;
	}
	consoleUpdate(turnStartText);
}

//[^] Space Limiter A
function functA() {
	if (document.getElementById('moveSpace').value === 'M' || document.getElementById('moveSpace').value === '@' || document.getElementById('moveSpace').value === '#'){
		document.getElementById('moveSpaceNum').value = 0;
		document.getElementById('moveSpaceNum').disabled = true;
	}
	else{
		document.getElementById('moveSpaceNum').value = 1;
		document.getElementById('moveSpaceNum').disabled = false;
	}
	if (document.getElementById('moveSpace').value === 'D' || document.getElementById('moveSpace').value === 'C'){
		document.getElementById('moveSpaceNum').max = '2';
	}
	else if (document.getElementById('moveSpace').value === 'A' || document.getElementById('moveSpace').value === 'F'){
		document.getElementById('moveSpaceNum').max = '4';
	}
	else {
		document.getElementById('moveSpaceNum').max = '5';
	}
}

//[^] Space Limiter B
function functB() {
	if (document.getElementById('moveToSpace').value === 'M' || document.getElementById('moveToSpace').value === '@' || document.getElementById('moveToSpace').value === '#'){
		document.getElementById('moveToSpaceNum').value = 0;
		document.getElementById('moveToSpaceNum').disabled = true;
	}
	else{
		document.getElementById('moveToSpaceNum').value = 1;
		document.getElementById('moveToSpaceNum').disabled = false;
	}
	if (document.getElementById('moveToSpace').value === 'D' || document.getElementById('moveToSpace').value === 'C'){
		document.getElementById('moveToSpaceNum').max = '2';
	}
	else if (document.getElementById('moveToSpace').value === 'A' || document.getElementById('moveToSpace').value === 'F'){
		document.getElementById('moveToSpaceNum').max = '4';
	}
	else {
		document.getElementById('moveToSpaceNum').max = '5';
	}
}

//[^] Space Limiter C
function functC() {
	if (document.getElementById('cardSpace').value === 'M' || document.getElementById('cardSpace').value === '@' || document.getElementById('cardSpace').value === '#'){
		document.getElementById('cardSpaceNum').value = 0;
		document.getElementById('cardSpaceNum').disabled = true;
	}
	else{
		document.getElementById('cardSpaceNum').value = 1;
		document.getElementById('cardSpaceNum').disabled = false;
	}
	if (document.getElementById('cardSpace').value === 'D' || document.getElementById('cardSpace').value === 'C'){
		document.getElementById('cardSpaceNum').max = '2';
	}
	else if (document.getElementById('cardSpace').value === 'A' || document.getElementById('cardSpace').value === 'F'){
		document.getElementById('cardSpaceNum').max = '4';
	}
	else {
		document.getElementById('cardSpaceNum').max = '5';
	}
}

//[^] Space Limiter D
function functD() {
	if (document.getElementById('trainSpace').value === 'M' || document.getElementById('trainSpace').value === '@' || document.getElementById('trainSpace').value === '#'){
		document.getElementById('trainSpaceNum').value = 0;
		document.getElementById('trainSpaceNum').disabled = true;
	}
	else{
		document.getElementById('trainSpaceNum').value = 1;
		document.getElementById('trainSpaceNum').disabled = false;
	}
	if (document.getElementById('trainSpace').value === 'D' || document.getElementById('trainSpace').value === 'C'){
		document.getElementById('trainSpaceNum').max = '2';
	}
	else if (document.getElementById('trainSpace').value === 'A' || document.getElementById('trainSpace').value === 'F'){
		document.getElementById('trainSpaceNum').max = '4';
	}
	else {
		document.getElementById('trainSpaceNum').max = '5';
	}
}

//[^] Space Limiter E
function functE() {
	if (document.getElementById('unitCheckSpace').value === 'M' || document.getElementById('unitCheckSpace').value === '@' || document.getElementById('unitCheckSpace').value === '#'){
		document.getElementById('unitCheckSpaceNum').value = 0;
		document.getElementById('unitCheckSpaceNum').disabled = true;
	}
	else{
		document.getElementById('unitCheckSpaceNum').value = 1;
		document.getElementById('unitCheckSpaceNum').disabled = false;
	}
	if (document.getElementById('unitCheckSpace').value === 'D' || document.getElementById('unitCheckSpace').value === 'C'){
		document.getElementById('unitCheckSpaceNum').max = '2';
	}
	else if (document.getElementById('unitCheckSpace').value === 'A' || document.getElementById('unitCheckSpace').value === 'F'){
		document.getElementById('unitCheckSpaceNum').max = '4';
	}
	else {
		document.getElementById('unitCheckSpaceNum').max = '5';
	}
}

//[^] Plural Modifier A
function pluralFunctA() {
	if (document.getElementById('moveNum').value > 1){
		document.getElementById('moveL2').innerHTML = ' units from space ';
	} else {
		document.getElementById('moveL2').innerHTML = ' unit from space ';
	}
}

//[^] Movement Controls
let moveSpace;
let moveSpaceI;
let moveToSpace;
let moveToSpaceI;
let moveNum;
let moveType;
let moveCounter;
let power;
let enemyPower;
function moveButton() {
	moveSpace = (document.getElementById('moveSpace').value+document.getElementById('moveSpaceNum').value);
	moveNum = document.getElementById('moveNum').value;
	moveType = (teamChar + document.getElementById('moveType').value);
	moveSpaceI = spaces.indexOf(moveSpace);
	moveToSpace = (document.getElementById('moveToSpace').value+document.getElementById('moveToSpaceNum').value);
	moveToSpaceI = spaces.indexOf(moveToSpace);
	dummyArr = [];
	dummyArr2 = [];
	if (moveSpaceI === -1 || moveToSpaceI === -1){
		consoleUpdate(['That space doesn\'t exist!']);
	}
	else if (spaceContents[moveToSpaceI].length > 0){
		if (spaceContents[moveToSpaceI][0][0] === enemyTeamChar){
			for (let i=0; i<spaceContents[moveSpaceI].length; i++){
				if (spaceContents[moveSpaceI][i] === moveType){
					if (unitMoves[moveSpaceI][i] === false){
						moveCounter++;
					}
				}
			}
		}
		if (spaceContents[moveSpaceI].length < 1){
			consoleUpdate(['That space is empty!']);
		}
		else if (spaceConnections[moveSpaceI].indexOf(moveToSpace) === -1){
			consoleUpdate(['Those spaces aren\'t linked!']);
		}
			else if (moveSpaceI === moveToSpaceI){
				consoleUpdate(['Those are the same spaces!']);
			}
			else if (spaceContents[moveSpaceI][0][0] === enemyTeamChar){
				consoleUpdate(['That space doesn\'t belong to you!']);
			}
			else if (countOf(spaceContents[moveSpaceI],moveType) < moveNum){
				consoleUpdate(['There aren\'t that many units of that type on that space!']);
			}
			else if (moveCounter < moveNum){
				consoleUpdate(['Some of those units have already moved!']);
			}
			else if (spaceContents[moveSpaceI].indexOf(teamChar+'K') > -1){
				consoleUpdate(['You can\'t attack with your king!']);
			}
			else {
				for (let i=0; i<spaceContents[moveSpaceI].length; i++){
					power = 0;
					power += unitPower[unitTypes.indexOf(spaceContents[moveSpaceI][i])];
				}
				for (let i=0; i<spaceContents[moveToSpaceI].length; i++){
					enemyPower = 0;
					enemyPower += unitPower[unitTypes.indexOf(spaceContents[moveToSpaceI][i])];
				}
				if (power > enemyPower){
					spaceContents[moveToSpaceI] = [];
					unitCount[teamNum] = countList(spaceContents[moveSpaceI],unitTypes);
					while (enemyPower > 0){
						//[@] BOOKMARK: Your team wins
					}
					consoleUpdate(['Your team won the battle!']);
				}
				else if (power < enemyPower){
					spaceContents[moveSpaceI] = [];
					unitCount[enemyTeamNum] = countList(spaceContents[moveToSpaceI],unitTypes);
					while (power > 0){
						//Enemy team wins
					}
					consoleUpdate(['The enemy\'s team won the battle.']);
				}
				else if (power === enemyPower){
					spaceContents[moveToSpaceI] = [];
					spaceContents[moveSpaceI] = [];
					consoleUpdate(['The battle is a tie!']);
				}
				else {
					alert('An error occurred. Please email me (rgtuma19@gmail.com), tell me the error code and how you got it.\nERROR CODE: BPNE');//Error BPNE
				}
			}
		}
	
	else {
		for (let i=0; i<spaceContents[moveSpaceI].length; i++){
			if (spaceContents[moveSpaceI][i] === moveType){
				if (unitMoves[moveSpaceI][i] === false){
					moveCounter++;
				}
			}
		}
		if (spaceContents[moveSpaceI].length < 1){
			consoleUpdate(['That space is empty!']);
		}
		else if (spaceConnections[moveSpaceI].indexOf(moveToSpace) === -1){
			consoleUpdate(['Those spaces aren\'t linked!']);
		}
		else if (moveSpaceI === moveToSpaceI){
			consoleUpdate(['Those are the same spaces!']);
		}
		else if (spaceContents[moveSpaceI][0][0] === enemyTeamChar){
			consoleUpdate(['That space doesn\'t belong to you!']);
		}
		else if (countOf(spaceContents[moveSpaceI],moveType) < moveNum){
			consoleUpdate(['There aren\'t that many units of that type on that space!']);
		}
		else if (moveCounter < moveNum){
			consoleUpdate(['Some of those units have already moved!']);
		}
		else {
			moveCounter = moveNum;
			for (let i=0; i<spaceContents[moveSpaceI].length; i++){
				if (spaceContents[moveSpaceI][i] === moveType && moveCounter > 0){
					moveCounter--;
					dummyArr.unshift(i);
				}
			}
			for (let i=0; i<dummyArr.length; i++){
				spaceContents[moveSpaceI].splice((dummyArr[0]-i), 1);
				unitMoves[moveSpaceI].splice((dummyArr[0]-i), 1);
				dummyArr.shift();
			}
			for (let i=0; i<moveNum; i++){
				unitMoves[moveToSpaceI].push(true);
				spaceContents[moveToSpaceI].push(moveType);
			}
			consoleUpdate(['Units moved!']);
		}
	}
}

//[^] Card-Playing Controls
let cardToPlay;
function playCard(handIndex){
	if (noActive[enemyTeamNum] === false){
		cardToPlay = hands[teamNum][handIndex];
		if (cardToPlay === '[No]'){
			consoleUpdate(['You played the [No] card!','The next time your opponent plays a card, it won\'t work.']);
			noActive[teamNum] = true;
			hands[teamNum][handIndex] = '';
		}
		else if (cardToPlay === '[Ambush]'){
			consoleUpdate(['You played the [Ambush] card!','The next time your opponent attacks you, 3 extra M2 units will appear there.']);
			ambushActive[teamNum] = true;
			hands[teamNum][handIndex] = '';
		}
		else if (cardToPlay === '[Bomb]'){
			consoleUpdate(['You played the [Bomb] card!','Choose a space that isn\'t @0, #0, or M0. One fourth of the units on that space will randomly be chosen and destroyed.','WARNING: This works on both friendly units AND enemy units!']);
			document.getElementById('cardSpaceSelector').style.display = 'block';
			bombActive = true;
			document.getElementById('moveControls').style.display = 'none';
			document.getElementById('trainControls').style.display = 'none';
			document.getElementById('bombSpaceButton').style.display = 'block';
			hands[teamNum][handIndex] = '';
		}
		else if (cardToPlay === '[Steal]'){
			consoleUpdate(['You played the [Steal] card!','Would you like to try and steal gems or gold from the enemy player?','It\'s easier to steal gold, as you have a larger chance of being caught if you try to steal gems.']);
			hands[teamNum][handIndex] = '';
			document.getElementById('stealTypeSelector').style.display = 'block';
			stealActive = true;
		}
		else if (cardToPlay === '[Energize]'){
			consoleUpdate(['You played the [Energize] card!','Select a space that isn\'t @0,#0, or M0- all units on that space that have moved will then be able to move again.']);
			hands[teamNum][handIndex] = '';
			document.getElementById('cardSpaceSelector').style.display = 'block';
			document.getElementById('moveCardButton').style.display = 'block';
			document.getElementById('moveControls').style.display = 'none';
			document.getElementById('trainControls').style.display = 'none';
			moveCardType = false;
		}
		else if (cardToPlay === '[Exhaust]'){
			consoleUpdate(['You played the [Exhaust] card!','Select a space that isn\'t @0,#0, or M0- all units on that space who have not moved yet will lose moveability.']);
			hands[teamNum][handIndex] = '';
			exhaustNum++;	
			document.getElementById('cardSpaceSelector').style.display = 'block';
			document.getElementById('moveCardButton').style.display = 'block';
			document.getElementById('moveControls').style.display = 'none';
			document.getElementById('trainControls').style.display = 'none';
			moveCardType = true;
			exhaustActive = true;
		}
	}
	else {
		consoleUpdate(['Your card failed to work, as your opponent played the [No] card!']);
		hands[teamNum][handIndex] = '';
		noActive[enemyTeamNum] = false;
	}
	updateHand();
}

//[^] [Bomb] Card Script
let bombSpace;
let bombSpaceI;
let bombFraction;
function bombCard(){
	bombSpace = (document.getElementById('cardSpace').value + document.getElementById('cardSpaceNum').value);
	bombSpaceI = spaces.indexOf(bombSpace);
	dummyArr = cardButtonsActive;
	cardButtonsActive = [false,false,false,false,false];
	updateHand();
	unitsTaken = [];
	bombFraction = Math.ceil(spaceContents[bombSpaceI].length / 4);
	if (bombSpaceI !== -1){
		for (let i=0; i<bombFraction; i++){
			if (spaceContents[bombSpaceI].length !== 0){
				dice = (Math.floor(Math.random() * (spaceContents[bombSpaceI].length - 1)));
				dummyVar = spaceContents[bombSpaceI].splice(dice,1);
				dummyVar = unitMoves[bombSpaceI].splice(dice,1);
			}
		}
		consoleUpdate(['Bomb used successfully.']);
		document.getElementById('cardSpaceSelector').style.display = 'none';
		document.getElementById('bombSpaceButton').style.display = 'none';
		document.getElementById('moveControls').style.display = 'block';
		document.getElementById('trainControls').style.display = 'block';
		cardButtonsActive = dummyArr;
		updateHand();
	}
	else {
		consoleUpdate(['That space doesn\'t exist!']);
	}
}

//[^] [Energize] and [Exhaust] card scripts
let moveCardSpace;
let moveCardSpaceI;
function moveCard() {
	moveCardSpace = (document.getElementById('cardSpace').value + document.getElementById('cardSpaceNum').value);
	moveCardSpaceI = spaces.indexOf(moveCardSpace);
	if (moveCardSpaceI === -1){
		consoleUpdate(['That space doesn\'t exist!']);
	}
	else if (spaceContents[moveCardSpaceI].length < 1){
		consoleUpdate(['There are no units on that space!']);
	}
	else {
		for (let i=0; i<spaceContents[moveCardSpaceI].length; i++){
			unitMoves[moveCardSpaceI][i] = moveCardType;
		}
		consoleUpdate(['Card used!']);
		document.getElementById('cardSpaceSelector').style.display = 'none';
		document.getElementById('moveCardButton').style.display = 'none';
		document.getElementById('moveControls').style.display = 'block';
		document.getElementById('trainControls').style.display = 'block';
	}
}

//[^] [Steal] Card Script
let goldFraction;
let gemFraction;
function stealCard(stealType){
	if (stealType === 'gold'){
		goldFraction = Math.ceil((gold[enemyTeamNum]/4));
		gold[teamNum] += goldFraction;
		gold[enemyTeamNum] -= goldFraction;
		consoleUpdate(['You stole '+goldFraction+' gold from the Enemy!']);
		updateCurrency();
	}
	else if (stealType === 'gems'){
		dice = Math.floor(Math.random() * 100 + 1);
		if (dice <= 50){
			if (gems[enemyTeamNum] < Math.floor(gemStealMax)){
				gemFraction = gems[enemyTeamNum];
			}
			else {
				gemFraction = Math.floor(gemStealMax);
			}
			gems[teamNum] += gemFraction;
			gems[enemyTeamNum] -= gemFraction;
			consoleUpdate(['You stole '+gemFraction+' gem(s) from the Enemy!']);
			updateCurrency();
		}
		else{
			consoleUpdate(['You were caught!','You didn\'t steal anything.']);
		}
	}
	document.getElementById('stealTypeSelector').style.display = 'none';
}

//[^] Check Units Button
let checkSpace;
let checkSpaceI;
let checkSpaceSentence;
let checkSpaceSentence2;
function checkUnits(){
	checkSpace = (document.getElementById('unitCheckSpace').value + document.getElementById('unitCheckSpaceNum').value);
	checkSpaceI = spaces.indexOf(checkSpace);
	checkSpaceSentence = '';
	checkSpaceSentence2 = '';
	if (checkSpaceI === -1){
		consoleUpdate(['That space doesn\'t exist!']);
	}
	else if (spaceContents[checkSpaceI].length < 1){
		consoleUpdate(['That space doesn\'t have any units.']);
	}
	else {
		if (spaceContents[checkSpaceI][0][0] === teamChar){
			checkSpaceSentence = 'Space '+checkSpace+' is owned by your team.';
		}
		else {
			checkSpaceSentence = 'Space '+checkSpace+' is owned by the enemy\'s team.';
		}
		for (let i=0; i<unitTypes.length; i++){
			counter = 0;
			if (spaceContents[checkSpaceI].indexOf(unitTypes[i]) !== -1){
				counter = 0;
				checkSpaceSentence2 += (countOf(spaceContents[checkSpaceI],unitTypes[i])+'x '+unitTypes[i]);
				for (let n=0; n<spaceContents[checkSpaceI].length; n++){
					if (spaceContents[checkSpaceI][n] === unitTypes[i]){
						if (unitMoves[checkSpaceI][n] === false){
							counter++;
						}
					}
				}
				checkSpaceSentence2 += (' ('+counter+' moveable),');
			}
		}
		checkSpaceSentence2 = checkSpaceSentence2.slice(0,-1);
		consoleUpdate([checkSpaceSentence,('Units:'+checkSpaceSentence2)]);
	}
}

//[^] Train Units Button
let trainAmount;
let trainSpace;
//trainCost already exists
function trainUnits(){
	trainSpace = (document.getElementById('trainSpace').value + document.getElementById('trainSpaceNum').value);
	trainAmount = document.getElementById('trainNum').value;
	trainType = document.getElementById('trainType').value;
	if (trainCost > gold[teamNum]){
		consoleUpdate(['You don\'t have enough gold!']);
	}
	else if (spaces.indexOf(trainSpace) === -1){
		consoleUpdate(['That space doesn\'t exist!']);
	}
	else if (spaceContents[spaces.indexOf(trainSpace)].length < 1){
		consoleUpdate(['You don\'t own that space!']);
	}
	else if (spaceContents[spaces.indexOf(trainSpace)][0][0] !== teamChar){
		consoleUpdate(['You don\'t own that space!']);
	}
	else {
		gold[teamNum] -= trainCost;
		for (let i=0; i<trainAmount; i++){
			spaceContents[spaces.indexOf(trainSpace)].push((teamChar + trainType));
			unitMoves[spaces.indexOf(trainSpace)].push(true);
		}
		updateCurrency();
		consoleUpdate(['Unit(s) trained!',('-'+trainCost+' Gold')]);
	}
}