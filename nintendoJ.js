document.getElementById('leftArrow').disabled = true;
let slide = 0;
let pos = 25;
let count = 50;
let transp = 0;
let currentD = 'l';
function moveElement(direction, element) {
	if (direction === 'r'){
		pos++;
	}
	else {
		pos--;
	}
	document.getElementById(element).style.left = (pos+'%');
}
function moveSlide(direction) {
	document.getElementById('leftArrow').disabled = true;
	document.getElementById('rightArrow').disabled = true;
	currentD = direction;
	if (count === -1){
		count = 50;
		transp = 0;
	}
	if (count > 25){
		moveElement('l','slide');
		moveElement('l','year');
		transp += 0.04;
		document.getElementById('slide').style.color = rgb(255,255,255,transp);
		document.getElementById('year').style.color = rgb(255,255,255,transp);
	}
	else if (count === 25) {
		document.getElementById('slide').style.left = '50%';
		document.getElementById('year').style.left = '50%';
		document.getElementById('slide').innerHTML = 'placeholderparagraph';
	}
	else if (count > 0) {
		moveElement('r','slide');
		moveElement('r','year');
		transp -= 0.04;
		document.getElementById('slide').style.color = rgb(255,255,255,transp);
		document.getElementById('year').style.color = rgb(255,255,255,transp);
	}
	else if (count === 0){
		document.getElementById('slide').style.left = '25%';
		document.getElementById('year').style.left = '25%';
		document.getElementById('slide').style.color = 'white';
		document.getElementById('year').style.color = 'white';
		document.getElementById('leftArrow').disabled = false;
		document.getElementById('rightArrow').disabled = false;
	}
	else {
		alert('Something went wrong.');
	}
	count--;
	if (count > -1){
		setTimeout(moveSlide(currentD), 10);
	}
}
