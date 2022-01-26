//Update Loop

import Ball from "./ball.js";
import Paddle from "./paddle.js";


const ball = new Ball(document.getElementById("ball"));
const player = new Paddle(document.getElementById("player-paddle"));
const computer = new Paddle(document.getElementById("computer-paddle"));
const playerScore = document.getElementById("player-score");
const computerScore = document.getElementById("computer-score");

let lastTime;

function update(time) {
    if (lastTime != null) {
        const delta = time - lastTime;
        ball.update(delta, [player.rect(), computer.rect()]);
        computer.update(delta, ball.y)
        const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"));
        document.documentElement.style.setProperty("--hue", hue + delta * 0.01);
        if (lost()) handleLose()
    }

    lastTime = time;
    window.requestAnimationFrame(update);
}

function lost() {
    const rect = ball.rect()
    return rect.right >= window.innerWidth || rect.left <= 0
}

function handleLose() {
    const rect = ball.rect()
    if (rect.right >= window.innerWidth) {
        playerScore.textContent = parseInt(playerScore.textContent) + 1;
    } else {
        computerScore.textContent = parseInt(computerScore.textContent) + 1;
    }
    ball.reset()
    computer.reset()
}

document.addEventListener("mousemove", e => {
    player.position = (e.y / window.innerHeight) * 100;
});

document.addEventListener("touchmove", e => {
    player.position = (e.y / window.innerHeight) * 100;
});

window.requestAnimationFrame(update);
