var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var teclas = [];
var teclas_tiros = [];
var iniciado = false;

// Players:
var p1 = {x: 0, y: 307, w: 31, h: 31, score: 0};
var p2 = {x: 462, y: 0, w: 31, h: 31, score: 0};
const velocidade = 2;

// Cactus:
const c1 = {x: 98, y: 202, w: 31, h: 31};
const c2 = {x: 196, y: 134, w: 31, h: 31};
const c3 = {x: 404, y: 145, w: 31, h: 31};

// Tiros:
var t1 = {x: p1.x, y: p1.y, w: 5, h: 5, status: false};
var t2 = {x: p2.x, y: p2.y, w: 5, h: 5, status: false};
var vel_tiros = 7;


// Bloqueia o scroll da página usando as setas
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

// Registra as teclas para o movimento dos jogadores
document.addEventListener("keydown", function(e) {
    if(!(teclas.includes(parseInt(e.keyCode)))) {
        teclas.push(parseInt(e.keyCode));
    }
});

document.addEventListener("keyup", function(e) {
    let indice = teclas.indexOf(parseInt(e.keyCode));
    teclas.splice(indice, 1);
});

// Registra as teclas para os tiros
document.addEventListener("keydown", function(evento) {
    if(!(teclas_tiros.includes(parseInt(evento.keyCode)))) {
        if(parseInt(evento.keyCode) === 32) {
            teclas_tiros.push(parseInt(evento.keyCode));
        }
        if(parseInt(evento.keyCode) === 96) {
            teclas_tiros.push(parseInt(evento.keyCode));
        }
    }
});

function desenha() {
    ctx.clearRect(0,0, canvas.width, canvas.height);

    // Player 1:
    var player1 = new Image();
    player1.src = 'player1.png';
    ctx.drawImage(player1, p1.x, p1.y, 31, 31);

    // Player 2:
    var player2 = new Image();
    player2.src = 'player2.png';
    ctx.drawImage(player2, p2.x, p2.y, 31, 31);

    // Cactus:
    var cactus1 = new Image();
    cactus1.src = 'cacto.png';
    ctx.drawImage(cactus1, c1.x, c1.y, c1.w, c1.h);

    var cactus2 = new Image();
    cactus2.src = 'cacto.png';
    ctx.drawImage(cactus2, c2.x, c2.y, c2.w, c2.h);

    var cactus3 = new Image();
    cactus3.src = 'cacto.png';
    ctx.drawImage(cactus3, c3.x, c3.y, c3.w, c3.h);

    // Tiros:
    if(t1.status === true) {
        ctx.fillRect(t1.x, t1.y, t1.w, t1.h);
    }
    if(t2.status === true) {
        ctx.fillRect(t2.x, t2.y, t2.w, t2.h);
    }
}

// Verifica a colisão dos jogadores e os cactos
function verifColisao(player, cactus) {
    if (player.x < cactus.x + cactus.w &&
        player.x + 31 > cactus.x &&
        player.y < cactus.y + cactus.h &&
        player.y + 31 > cactus.y) {

        if(player.x + 31 > cactus.x && player.x + 31 < cactus.x+cactus.w/2) {
            player.x = cactus.x - 31;
        }
        else if(player.x < cactus.x+cactus.w && player.x > cactus.x+cactus.w/2) {
            player.x = cactus.x + cactus.w;
        }
        else if(player.y < cactus.y+cactus.h && player.y > cactus.y+cactus.h/2) {
            player.y = cactus.y + cactus.h;
        }
        else if(player.y + 31 > cactus.y && player.y + 31 < cactus.y+cactus.h/2) {
            player.y = cactus.y - 31;
        }
    }
}

// Verifica a colisão dos tiros com os cactos
function colisaoTiro(tiro, cactus) {
    if (tiro.x < cactus.x + cactus.w &&
        tiro.x + 5 > cactus.x &&
        tiro.y < cactus.y + cactus.h &&
        tiro.y + 5 > cactus.y) {

        tiro.status = false;

        if(tiro === t1) {
            teclas_tiros.splice(teclas_tiros.indexOf(32), 1);
        }
        if(tiro === t2) {
            teclas_tiros.splice(teclas_tiros.indexOf(96), 1);
        }
    }
}

// Verifica a colisão dos tiros com os jogadores
function colisaoPlayer(tiro, player) {
    if (tiro.x < player.x + player.w &&
        tiro.x + 5 > player.x &&
        tiro.y < player.y + player.h &&
        tiro.y + 5 > player.y) {

        tiro.status = false;

        if(tiro === t1 && player === p2) {
            teclas_tiros.splice(teclas_tiros.indexOf(32), 1);
            p1.score++;
        }
        if(tiro === t2 && player === p1) {
            teclas_tiros.splice(teclas_tiros.indexOf(96), 1);
            p2.score++;
        }
    }
}

function movimenta() {
    if(p1.x+31 <= canvas.width) {
        if(teclas.includes(65)) {
            p1.x = p1.x - velocidade;
        }
        else if(teclas.includes(68)) {
            p1.x = p1.x + velocidade;
        }
    }
    else {
        p1.x = 481;
    }

    if(p2.x+31 <= canvas.width) {
        if(teclas.includes(37)) {
            p2.x = p2.x - velocidade;
        }
        else if(teclas.includes(39)) {
            p2.x = p2.x + velocidade;
        }
    }
    else {
        p2.x = 481;
    }

    if(p1.y+31 <= canvas.height) {
        if(teclas.includes(87)) {
            p1.y = p1.y - velocidade;
        }

        else if(teclas.includes(83)) {
            p1.y = p1.y + velocidade;
        }
    }
    else {
        p1.y = 326;
    }

    if(p2.y+31 <= canvas.height) {
        if(teclas.includes(38)) {
            p2.y = p2.y - velocidade;
        }

        else if(teclas.includes(40)) {
            p2.y = p2.y + velocidade;
        }
    }
    else {
        p2.y = 326;
    }

    if(p1.y < 0) {
        p1.y = 0;
    }
    if(p2.y < 0) {
        p2.y = 0;
    }

    if(p1.x < 0) {
        p1.x = 0;
    }
    if(p2.x < 0) {
        p2.x = 0;
    }

    // Colisão Player 1:
    verifColisao(p1, c1);
    verifColisao(p1, c2);
    verifColisao(p1, c3);

    // Colisão Player 2:
    verifColisao(p2, c1);
    verifColisao(p2, c2);
    verifColisao(p2, c3);

    // Posição dos tiros:
    if (t1.status === false) {
        t1.x = p1.x+(p1.w/2);
        t1.y = p1.y+(p1.h/2);
    }
    if (t2.status === false) {
        t2.x = p2.x+(p1.w/2);
        t2.y = p2.y+(p2.h/2);
    }

    if(t1.x+t1.w <= canvas.width) {
        if(teclas_tiros.includes(32)) {
            t1.status = true;
            t1.x = t1.x + vel_tiros;
        }
    }
    else {
        t1.status = false;
        teclas_tiros.splice(teclas_tiros.indexOf(32), 1);
    }
    if(t2.x <= canvas.width && !(t2.x < 0)) {
        if(teclas_tiros.includes(96)) {
            t2.status = true;
            t2.x = t2.x - vel_tiros;
        }
    }
    else {
        t2.status = false;
        teclas_tiros.splice(teclas_tiros.indexOf(96),1);
    }

    // Colisão tiro1-cactos:
    colisaoTiro(t1, c1);
    colisaoTiro(t1, c2);
    colisaoTiro(t1, c3);

    // Colisão tiro2-cactos:
    colisaoTiro(t2, c1);
    colisaoTiro(t2, c2);
    colisaoTiro(t2, c3);

    // Colisão player-tiro:
    colisaoPlayer(t1, p2);
    colisaoPlayer(t2, p1);

}

function atualiza() {
    desenha();
    movimenta();
    score();
    requestAnimationFrame(atualiza);
}

function main() {
    if (iniciado === false) {
        atualiza();
        iniciado = true;
    }
    const audio = document.querySelector("audio");
    audio.currentTime = 0;
    audio.volume = 0.1;
    audio.play();
}

// Permite reiniciar o jogo
function reset() {
    p1 = {x: 0, y: 307, w: 31, h: 31, score: 0};
    p2 = {x: 462, y: 0, w: 31, h: 31, score: 0};
    t1.x = 1000;
    t2.x = -1000;
    desenha();
    document.getElementById("placarwin").innerHTML = "";
    document.getElementById("placarwin").style.backgroundColor = "none";
}

// Permite o funcionamento do placar
function score() {
    if(p1.score <= 5 && p2.score <= 5) {
        document.getElementById("p1-score").innerHTML = p1.score;
        document.getElementById("p2-score").innerHTML = p2.score;
    }

    let win = document.getElementById("placarwin");

    if (p1.score === 5) {
        document.getElementById("placarwin").innerHTML = "Player 1 vence!";
        win.style.backgroundColor = "#2c2c54";
        t1.x = 1000;
        t2.x = -1000;
    }

    if (p2.score === 5) {
        document.getElementById("placarwin").innerHTML = "Player 2 vence!";
        win.style.backgroundColor = "#2c2c54";
        t1.x = 1000;
        t2.x = -1000;
    }
}