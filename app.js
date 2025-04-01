let player1Score = 501;
let player2Score = 501;
let player1Legs = 0;
let player2Legs = 0;
let currentPlayer = 1;
let scoreHistory = [];
let bestOfLegs = 3; // Default to best of 3 legs

function startGame() {
    bestOfLegs = parseInt(document.getElementById("legsSelect").value);
    document.getElementById("player1Name").innerText = document.getElementById("player1NameInput").value;
    document.getElementById("player2Name").innerText = document.getElementById("player2NameInput").value;
    
    resetGame();
    document.getElementById("player1Input").disabled = false;
    document.getElementById("player2Input").disabled = true;
    document.querySelectorAll("button[onclick^='submitScore']").forEach(btn => btn.disabled = false);
}

function updateUI() {
    document.getElementById("player1Score").innerText = player1Score;
    document.getElementById("player2Score").innerText = player2Score;
    document.getElementById("player1Legs").innerText = player1Legs;
    document.getElementById("player2Legs").innerText = player2Legs;

    // Checkout suggestions
    document.getElementById("player1Checkout").innerText = getCheckout(player1Score);
    document.getElementById("player2Checkout").innerText = getCheckout(player2Score);

    // Toggle input fields for the current player
    document.getElementById("player1Input").disabled = currentPlayer !== 1;
    document.getElementById("player2Input").disabled = currentPlayer !== 2;
}

function submitScore(player) {
    let inputField = document.getElementById(`player${player}Input`);
    let scoreInput = parseInt(inputField.value);

    if (isNaN(scoreInput) || scoreInput < 0 || scoreInput > 180) {
        alert("Invalid score! Enter a number between 0 and 180.");
        return;
    }

    let prevScore = player === 1 ? player1Score : player2Score;
    let newScore = prevScore - scoreInput;

    if (newScore < 0) {
        alert("Bust! Score exceeded.");
        return;
    }

    // Store the previous state for undo
    scoreHistory.push({ player, score: prevScore });

    if (player === 1) {
        player1Score = newScore;
    } else {
        player2Score = newScore;
    }

    // Update checkouts immediately
    document.getElementById("player1Checkout").innerText = getCheckout(player1Score);
    document.getElementById("player2Checkout").innerText = getCheckout(player2Score);

    // Check if the player won the leg
    if (player1Score === 0) {
        player1Legs++;
        if (checkWin()) return;
    } else if (player2Score === 0) {
        player2Legs++;
        if (checkWin()) return;
    }

    // Switch turn
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    updateUI();
    inputField.value = "";
}

function correctLastScore() {
    if (scoreHistory.length === 0) {
        alert("No moves to undo!");
        return;
    }

    let lastMove = scoreHistory.pop();

    if (lastMove.player === 1) {
        player1Score = lastMove.score;
        currentPlayer = 1;
    } else {
        player2Score = lastMove.score;
        currentPlayer = 2;
    }

    updateUI();
}

function checkWin() {
    if (player1Legs > bestOfLegs / 2) {
        alert(document.getElementById("player1Name").innerText + " wins!");
        resetGame();
        return true;
    } else if (player2Legs > bestOfLegs / 2) {
        alert(document.getElementById("player2Name").innerText + " wins!");
        resetGame();
        return true;
    }
    player1Score = 501;
    player2Score = 501;
    return false;
}

function resetGame() {
    player1Score = 501;
    player2Score = 501;
    player1Legs = 0;
    player2Legs = 0;
    currentPlayer = 1;
    scoreHistory = [];
    updateUI();
}

function getCheckout(score) {
    let checkoutTable = {
        170: 'T20 T20 Bull',
        167: 'T20 T19 Bull',
        164: 'T20 T18 Bull',
        161: 'T20 T17 Bull',
        160: 'T20 T20 D20',
        158: 'T20 T20 D19',
        157: 'T20 T19 D20',
        156: 'T20 T20 D18',
        155: 'T20 T19 D19',
        154: 'T20 T18 D20',
        153: 'T20 T19 D18',
        152: 'T20 T20 D16',
        151: 'T20 T17 D20',
        150: 'T20 T18 D18',
        149: 'T20 T19 D16',
        148: 'T20 T16 D20',
        147: 'T20 T17 D18',
        146: 'T20 T18 D16',
        145: 'T20 T15 D20',
        144: 'T20 T20 D12',
        143: 'T20 T17 D16',
        142: 'T20 T14 D20',
        141: 'T20 T19 D12',
        140: 'T20 T20 D10',
        139: 'T20 T13 D20',
        138: 'T20 T18 D12',
        137: 'T20 T19 D10',
        136: 'T20 T20 D8',
        135: 'T20 T17 D12',
        134: 'T20 T14 D16',
        133: 'T20 T19 D8',
        132: 'T20 T16 D12',
        131: 'T20 T13 D16',
        130: 'T20 T18 D8',
        129: 'T19 T16 D12',
        128: 'T20 T20 D4',
        127: 'T20 T17 D8',
        126: 'T19 T19 D6',
        125: 'T20 T19 D4',
        124: 'T20 T16 D8',
        123: 'T19 T16 D9',
        122: 'T18 T18 D7',
        121: 'T20 T11 D14',
        120: 'T20 20 D20',
        119: 'T19 T12 D13',
        118: 'T20 18 D20',
        117: 'T20 17 D20',
        116: 'T20 16 D20',
        115: 'T20 15 D20',
        114: 'T20 14 D20',
        113: 'T20 13 D20',
        112: 'T20 12 D20',
        111: 'T20 11 D20',
        110: 'T20 10 D20',
        109: 'T20 9 D20',
        108: 'T20 8 D20',
        107: 'T19 10 D20',
        106: 'T20 6 D20',
        105: 'T20 5 D20',
        104: 'T20 4 D20',
        103: 'T19 6 D20',
        102: 'T20 10 D16',
        101: 'T17 10 D20',
        100: 'T20 D20',
        99: 'T19 10 D16',
        98: 'T20 D19',
        97: 'T19 D20',
        96: 'T20 D18',
        95: 'T19 D19',
        94: 'T18 D20',
        93: 'T19 D18',
        92: 'T20 D16',
        91: 'T17 D20',
        90: 'T20 D15',
        89: 'T19 D16',
        88: 'T20 D14',
        87: 'T17 D18',
        86: 'T18 D16',
        85: 'T15 D20',
        84: 'T20 D12',
        83: 'T17 D16',
        82: 'T14 D20',
        81: 'T19 D12',
        80: 'T20 D10',
        79: 'T13 D20',
        78: 'T18 D12',
        77: 'T19 D10',
        76: 'T20 D8',
        75: 'T17 D12',
        74: 'T14 D16',
        73: 'T19 D8',
        72: 'T16 D12',
        71: 'T13 D16',
        70: 'T18 D8',
        69: 'T19 D6',
        68: 'T20 D4',
        67: 'T17 D8',
        66: 'T14 D12',
        65: 'T15 D10',
        64: 'T16 D8',
        63: 'T13 D12',
        62: 'T10 D16',
        61: 'T15 D8',
        60: 'SB Bull',
        59: 'S19 D20',
        58: 'S18 D20',
        57: 'S17 D20',
        56: 'T16 D4',
        55: 'S15 D20',
        54: 'S14 D20',
        53: 'S13 D20',
        52: 'T12 D8',
        51: 'S11 D20',
        50: 'S10 D20',
        49: 'S9 D20',
        48: 'S8 D20',
        47: 'S15 D16',
        46: 'S6 D20',
        45: 'S13 D16',
        44: 'S12 D16',
        43: 'S11 D16',
        42: 'S10 D16',
        41: 'S9 D16',
        40: 'D20',
        39: 'S7 D16',
        38: 'D19',
        37: 'S5 D16',
        36: 'D18',
        35: 'S3 D16',
        34: 'D17',
        33: 'S1 D16',
        32: 'D16',
        31: 'S7 D12',
        30: 'D15',
        29: 'S13 D8',
        28: 'D14',
        27: 'S11 D8',
        26: 'D13',
        25: 'S9 D8',
        24: 'D12',
        23: 'S7 D8',
        22: 'D11',
        21: 'S5 D8',
        20: 'D10',
        19: 'S3 D8',
        18: 'D9',
        17: 'S1 D8',
        16: 'D8',
        15: 'S7 D4',
        14: 'D7',
        13: 'S5 D4',
        12: 'D6',
        11: 'S3 D4',
        10: 'D5',
        9: 'S1 D4',
        8: 'D4',
        7: 'S3 D2',
        6: 'D3',
        5: 'S1 D2',
        4: 'D2',
        3: 'S1 D1',
        2: 'D1'
    };
    return checkoutTable[score] || "No checkout available";
}

// Set up webcam feed
navigator.mediaDevices
  .getUserMedia({ video: true })
  .then((stream) => (document.getElementById("webcamFeed").srcObject = stream))
  .catch((err) => console.error("Webcam error:", err));

// Initialize UI
updateUI();

function checkWin() {
    let winner = null;
    if (player1Legs >= Math.ceil(bestOfLegs / 2)) {
        winner = document.getElementById("player1Name").innerText;
    } else if (player2Legs >= Math.ceil(bestOfLegs / 2)) {
        winner = document.getElementById("player2Name").innerText;
    }

    if (winner) {
        startConfetti();
        explodeEffect();
        showWinnerBox(winner);
        return true;
    }

    player1Score = 501;
    player2Score = 501;
    return false;
}



function resetGame() {
    player1Score = 501;
    player2Score = 501;
    player1Legs = 0;
    player2Legs = 0;

    document.getElementById("player1Score").innerText = player1Score;
    document.getElementById("player2Score").innerText = player2Score;
    document.getElementById("player1Legs").innerText = player1Legs;
    document.getElementById("player2Legs").innerText = player2Legs;

    // Stop effects
    stopEffects();
    winnerBox.style.display = "none";

    console.log("Game has been reset.");
}


// Create canvas for effects
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.pointerEvents = "none";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Winner Box Setup
const winnerBox = document.createElement("div");
winnerBox.style.position = "fixed";
winnerBox.style.top = "50%";
winnerBox.style.left = "50%";
winnerBox.style.transform = "translate(-50%, -50%)";
winnerBox.style.background = "gold";
winnerBox.style.color = "black";
winnerBox.style.padding = "20px 40px";
winnerBox.style.fontSize = "24px";
winnerBox.style.fontWeight = "bold";
winnerBox.style.textAlign = "center";
winnerBox.style.borderRadius = "10px";
winnerBox.style.boxShadow = "0 0 20px rgba(255, 215, 0, 0.8)";
winnerBox.style.display = "none";
document.body.appendChild(winnerBox);

let particles = [];

function startConfetti() {
    particles = Array.from({ length: 100 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 5 + 5,
        speed: Math.random() * 5 + 2,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        rotation: Math.random() * 360
    }));

    requestAnimationFrame(updateEffects);
    setTimeout(stopEffects, 10000); // Stop after 10 seconds
}

function explodeEffect() {
    let centerX = canvas.width / 2;
    let centerY = canvas.height / 2;

    for (let i = 0; i < 50; i++) {
        let angle = Math.random() * Math.PI * 2;
        let speed = Math.random() * 10 + 5;

        particles.push({
            x: centerX,
            y: centerY,
            size: Math.random() * 8 + 5,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            speedX: Math.cos(angle) * speed,
            speedY: Math.sin(angle) * speed
        });
    }

    requestAnimationFrame(updateEffects);
}

function showWinnerBox(winner) {
    winnerBox.innerText = `${winner} Wins! 🎯`;
    winnerBox.style.display = "block";

    setTimeout(() => {
        winnerBox.style.display = "none"; // Hide after 3 seconds
    }, 3000);
}

function updateEffects() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
        p.x += p.speedX || 0;
        p.y += p.speedY || p.speed;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    });

    if (particles.length > 0) requestAnimationFrame(updateEffects);
}

function stopEffects() {
    particles = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
