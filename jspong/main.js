
// var crlf = "\r\n";
// var x = 1;
// var y = 1;
// var dx = 1;
// var dy = 1;
// var s = "";
// var u = 0;
// var oops_flag = false;
// var score = 0;

// function move1() {
// x += dx;
//     if (x > 31) {
//     x -= 2 * Math.abs(dx);
//     if (dx > 0) dx = -dx;
//     }
//     if (x <  0) {
//     x += 2 * Math.abs(dx);
//     if (dx < 0) dx = -dx;
//     }
//     y += dy;
//     if (y > 14) {
//     y -= 2 * Math.abs(dy);
//     if (dy > 0) dy = -dy;
//     if (Math.abs(x - 2*u - 1) > 2) {
//     oops_flag = true;
//     }
//         else {
//             score += 1;
//         }
//     }
//     if (y <  0) { y += 2 * Math.abs(dy);
//     if (dy < 0) dy = -dy; }
// }

// function display1() {
// var s1 = ""
// var i,j;
//     if (oops_flag) return "Reh Roh! Try Again!";
//     for (j=0;j<15;j++) {
//     for (i=0;i<32;i++) {
//     if (j == y && i == x) s1 += "o";
//         else s1 += ".";
//         }

// s1 += crlf;
// }

// var s2 = "";
//     for (i=0;i<16;i++) {
//     if (u == i) s2 += "==";
//         else s2 += "..";
//     }
//     return (s1+s2);
// }

// var timerID = null;
// var timerRunning = false;
// var myform;

// function stopclock (){
//     if(timerRunning) clearTimeout(timerID);
//     timerRunning = false;
// }

// function startclock (form) {
// myform = form;
// oops_flag = false;
//     if (navigator.userAgent.indexOf("Mac") > 2) crlf = "\n";
//     stopclock();
//     dotime();
// }

// function dotime() {
// move1();
//     if (myform != null) {
//     myform.text3.value = display1();
//     myform.score.value = " " + score;
//     }
//     if (!oops_flag) timerID = setTimeout("dotime()",200);
//     timerRunning = true;
// }


var paddleLeft = document.getElementById('left-paddle');
var paddleRight = document.getElementById('right-paddle');
var ball = document.getElementById('ball');
var paddleLeftTop = 0;
var paddleRightTop = 0;
var paddleLeftHeight = 200;
var paddleRightHeight = 200;
var paddleRightDirection = 0;
var paddleRightTimer;
var paddleLeftDirection = 0;
var paddleLeftTimer;
 	paddleLeft.style.top = 0;
	paddleRight.style.top = 0;
var ballXPos = 50;
var ballYPos = 50;
var ballXDir = 5;
var ballYDir = 5;
var ballWidth = 20;
var ballHeight = 20;
var leftScoreDisplay = document.getElementById('left-score');
var rightScoreDisplay = document.getElementById('right-score');
var leftScore = 0;
var rightScore = 0;

 	function updateScoreDisplay() {
		leftScoreDisplay.innerHTML = leftScore;
		rightScoreDisplay.innerHTML = rightScore;
	}
 	function moveBall() {
		var newBallXPos = ballXPos + ballXDir;
		var newBallYPos = ballYPos + ballYDir;
 		if (newBallXPos + ballWidth > window.innerWidth) {
			ballXDir = -Math.abs(ballXDir);
		}
		if (newBallYPos + ballHeight > window.innerHeight) {
			ballYDir = -Math.abs(ballYDir);
		}
		if (newBallXPos < 0) {
			ballXDir = Math.abs(ballXDir);
		}
		if (newBallYPos < 0) {
			ballYDir = Math.abs(ballYDir);
		}
 		ballXPos += ballXDir;
		ballYPos += ballYDir;
 		if (ballXPos < 20 && 
			(ballYPos + 20 < paddleLeftTop || 
			 ballYPos > paddleLeftTop + paddleLeftHeight)) {
			rightScore += 1;
			updateScoreDisplay();
		}
		if (ballXPos + 20 > window.innerWidth - 20 && 
			(ballYPos + 20 < paddleRightTop || 
			 ballYPos > paddleRightTop + paddleRightHeight)) {
			leftScore += 1;
			updateScoreDisplay();
		}
		ball.style.top = ballYPos + 'px';
		ball.style.left = ballXPos + 'px';
	}
 	function moveRightPaddle() {
		paddleRightTop += paddleRightDirection;
		paddleRight.style.top = paddleRightTop + 'px';
	}
 	function moveLeftPaddle() {
		paddleLeftTop += paddleLeftDirection;
		paddleLeft.style.top = paddleLeftTop + 'px';
	}
 	setInterval(moveBall, 25);
 	setInterval(function() {
		if (ballXDir < 50) ballXDir *= 1.1;
		if (ballYDir < 50) ballYDir *= 1.1;
    }, 10000)
    
 	document.addEventListener('keydown', function(evt) {
		switch (evt.code) {
			case 'ArrowDown':
				if (!paddleRightTimer) {
					paddleRightDirection = 20;
					paddleRightTimer = setInterval(moveRightPaddle, 100);
				}
				break;
 			case 'ArrowUp':
				if (!paddleRightTimer) {
					paddleRightDirection = -20;
					paddleRightTimer = setInterval(moveRightPaddle, 100);
				}
				break;
 			case 'KeyS':
				if (!paddleLeftTimer) {
					paddleLeftDirection = 20;
					paddleLeftTimer = setInterval(moveLeftPaddle, 100);
				}
				break;
 			case 'KeyW':
				if (!paddleLeftTimer) {
					paddleLeftDirection = -20;
					paddleLeftTimer = setInterval(moveLeftPaddle, 100);
				}
				break;
		}
		console.log(evt);
	})
 	document.addEventListener('keyup', function(evt) {
		switch (evt.code) {
			case 'ArrowDown':
			case 'ArrowUp':
				clearInterval(paddleRightTimer);
				paddleRightTimer = null;
				break;
 			case 'KeyS':
			case 'KeyW':
				clearInterval(paddleLeftTimer);
				paddleLeftTimer = null;
				break;
		}
		console.log(evt);
	})