// Updates the labels for ranges when the range slider moves
const sickRatioEl = document.getElementById('sickRatio');
const sickRatioLabelEl = document.getElementById('sickRatioLabel');
const speedEl = document.getElementById('speed');
const speedLabelEl = document.getElementById('speedLabel');

sickRatioEl.oninput = function() {
	sickRatioLabelEl.innerText = sickRatioEl.value;
}

speedEl.oninput = function() {
	speedLabelEl.innerText = speedEl.value;
}


// Updates numStatic when the numBubbles changes
const numStaticEl = document.getElementById('numStatic');
const numBubblesEl = document.getElementById('numBubbles');

numBubblesEl.onchange = function() {
	numStaticEl.setAttribute('max', numBubblesEl.value);
	if (Number(numStaticEl.value) > Number(numBubblesEl.value)) {
		numStaticEl.setAttribute('value', numBubblesEl.value);
	}
}


// Launches the simulation when setup form is submitted
const canvas = document.getElementsByTagName('canvas')[0];
const context = canvas.getContext('2d');
const bubbles = [];

const sickCounterEl = document.getElementById('number');
let sickCounter = 0;
let timeCounter = 0;

const timeHeadingEl = document.getElementById('time-heading');
let timeCounterEl = document.getElementById('time');

document.getElementById("simulation-form").onsubmit = function(e) {
	e.preventDefault(); // Prevents the form from redirecting to another page

	let canvasHeight = 500; // in pixels
	let canvasWidth = window.innerWidth;
	const radius = Number(document.getElementById("radius").value); // in pixels
	const numBubbles = Number(document.getElementById("numBubbles").value); // number of bubbles
	const numStatic = Number(document.getElementById("numStatic").value); // number of static bubbles
	const sickRatio = Number(document.getElementById("sickRatio").value); // ratio of starting sick bubbles. 0 = 0%, 1 = 100%
	let speed = Number(document.getElementById("speed").value); // speed constant (unitless)

	const canvasType = document.getElementById("canvasSize").value;
	if (canvasType == "medium") {
		canvasHeight = 375;
		canvasWidth = window.innerWidth * .75;
	}
	else if (canvasType == "small") {
		canvasHeight = 250;
		canvasWidth = window.innerWidth / 2;
	}

	document.getElementById("simulation-setup").style.display = "none";
	document.getElementById("simulation").style.display = "flex";
	canvas.height = canvasHeight;
	canvas.width = canvasWidth;
	
	for (let i = 0; i < numBubbles; i++) {
		let isSick = false;

		if (i < numBubbles * sickRatio) {	// the first X bubbles will be sick
			isSick = true;
			sickCounter++;
		}

		if (i >= numBubbles - numStatic) {	// the last Y bubbles will be static
			speed = 0;
		}

		const newBubble = new Bubble(radius, speed, isSick);

		// Ensures that no bubbles spawn on top of each other initially. 
		for (let bubble of bubbles) {

			while (newBubble.isColliding(bubble)) {
				newBubble.positionRandomly();
			}
		}
		bubbles.push(newBubble);	// add newBubble to the bubbles array
	}
	setInterval(simulationTimer, 1000);
	setInterval(trackTimeSick, 1000)
	setInterval(removeSickness, 1000);
	animate();
}

function animate() {

	requestAnimationFrame(animate);
	context.clearRect(0, 0, canvas.width, canvas.height);

	for (let bubble of bubbles) {
		// To update itself, a bubble needs to know the state of all bubbles
		bubble.update(bubbles);
	}
	sickCounterEl.innerHTML = sickCounter;

	timeCounterEl.innerText = timeCounter + "s";
	if (sickCounter >= numBubbles.value)
	{;
		timeHeadingEl.innerText = "Time for max infection: " + timeCounterEl.innerText;
		timeHeadingEl.style.fontWeight = "bolder";
	}
}
// Times the simulation up until infection rate is 100%
function simulationTimer()
{
	if (sickCounter < numBubbles.value)
	{
		timeCounter++;
	}
}

// Tracks the time (seconds) each sick bubble is infected
function trackTimeSick()
{
	for (let bubble of bubbles)
	{
		if (bubble.sick) 
		{
			bubble.timeSick++;
		}
	}
}
// Sick bubbles become healthy again after 20s
function removeSickness()
{
	for (let bubble of bubbles)
	{
		if (bubble.sick && bubble.timeSick > 20) {
			bubble.sick = false;
			bubble.timeSick = 0;
			bubble.changeColour();
			bubble.immune = true;
			sickCounter--;
		}
	}
}