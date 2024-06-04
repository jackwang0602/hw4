document.addEventListener("DOMContentLoaded", function () {
    const paddle = document.querySelector(".paddle");
    const ball = document.querySelector(".ball");
    const pointDisplay = document.createElement("div")
    const gameContainer = document.querySelector(".game-container");

    let points = 0;
    let paddlePosition = 0;
    let ballPosition = { x: 300, y: 150 };
    let ballDirection = { x: 1, y: 1 };

    pointDisplay.classList.add("point-display");
    gameContainer.appendChild(pointDisplay);

    function updatePaddle() {
        paddle.style.left = paddlePosition + "px";
    }

    function updateBall() {
        ballPosition.x += ballDirection.x * 5;
        ballPosition.y += ballDirection.y * 5;

        // Check collision with paddle
        if (
            ballPosition.x + 30 > paddlePosition &&
            ballPosition.x < paddlePosition + 120 &&
            ballPosition.y + 30 > 285
        ) {
            // Reflect the ball
            ballDirection.y = -1;
            points ++;
            updatePointDisplay()
        }

        // Check collision with walls
        if (ballPosition.x < 0 || ballPosition.x > gameContainer.clientWidth - 30) {
            ballDirection.x *= -1;
        }

        if(ballPosition.y < 0){
            ballDirection.y *= -1;
            
        }
        if(ballPosition.y > gameContainer.clientHeight - 30){
            ballDirection.y *= -1;
            points --;
            updatePointDisplay();
        }

        // Ensure the ball stays within the container
        ballPosition.x = Math.max(0, Math.min(gameContainer.clientWidth - 30, ballPosition.x));
        ballPosition.y = Math.max(0, Math.min(gameContainer.clientHeight - 30, ballPosition.y));

        ball.style.left = ballPosition.x + "px";
        ball.style.top = ballPosition.y + "px";
    }

    document.addEventListener("keydown", function (event) {
        if (event.key === "ArrowLeft" && paddlePosition > 0) {
            paddlePosition -= 10;
        } else if (event.key === "ArrowRight" && paddlePosition < gameContainer.clientWidth - 120) {
            paddlePosition += 10;
        }

        updatePaddle();
    });

    function updatePointDisplay(){
        pointDisplay.innerText = "Points: " + points;
    }

    function gameLoop() {
        updateBall();
        requestAnimationFrame(gameLoop);
    }
    updatePointDisplay()
    gameLoop();
});
