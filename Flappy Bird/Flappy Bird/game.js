const bateu = new Audio();
bateu.src = 'bateuchao.mp3';

const msc = new Audio();
msc.src = 'musica fundo.mp3';

msc.volume = 0.3;

// iamgens que vou suar

const sprites = new Image();
const fundo = new Image();
const bird = new Image();
const groud = new Image();
const correcao = new Image();

sprites.src = './sprites.png';
fundo.src = 'fundo.png';
bird.src = 'Bird.png';
groud.src = 'Groud.png';
correcao.src = 'correcao.png';

// chamando canvas 

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');


// colisao chao
function fazColisao(flappyBird, chao) {
    const flappyBirdY = flappyBird.y + flappyBird.altura;
    const chaoY = chao.y;

    if (flappyBirdY >= chaoY) {
        
        mudatela(Telas.inicio);
        bateu.play();
        return true;
    }
    return false;
}


// colisao cano
function fazColisaoCano(flappyBird, canos) {
    for (let i = 0; i < canos.pares.length; i++) {
        const par = canos.pares[i];

        // Coordenadas do flappyBird
        const flappyBirdX = flappyBird.x;
        const flappyBirdY = flappyBird.y;
        const flappyBirdLargura = flappyBird.largura;
        const flappyBirdAltura = flappyBird.altura;

        // Coordenadas do cano no céu
        const canoCeuX = par.x;
        const canoCeuY = par.y;
        const canoLargura = canos.largura;
        const canoAltura = canos.altura;

        // Coordenadas do cano no chão
        const canoChaoX = par.x;
        const canoChaoY = par.y + canos.espaco;

        if (
            (flappyBirdX + flappyBirdLargura >= canoCeuX && flappyBirdX <= canoCeuX + canoLargura) &&
            (flappyBirdY <= canoCeuY || flappyBirdY + flappyBirdAltura >= canoChaoY)
        ) {
            // Se houver colisão com os canos, a função retorna true
            console.log('slateste');
            bateu.play();
            mudatela(Telas.inicio);
            
            return true;
        } else {
            // Se não houver colisão com os canos, a função retorna false
            return false;
        }
        }
        }

// flappybird

function criarflappyBird() {
    
   const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    larguraOriginal: 2365,
    alturaOriginal: 1734,
    largura: 86,
    altura: 68,
    x: 300,
    y: 50,
    pula() {
        flappyBird.velocidade = -5;
    },
    gravidade: 0.25,
    velocidade: 0,
    // calcular frames
    frameatual: 0,
    atulizaframeatual() {
        console.log('frames');
        },
    atualiza() {
        if (fazColisao(flappyBird, globais.chao) || fazColisaoCano(flappyBird, globais.canos)) {
            console.log('tevecolisao');
            return;
        }
    
        flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
        flappyBird.y = flappyBird.y + flappyBird.velocidade;
    },
    
    desenha() {
        flappyBird.atulizaframeatual();
        contexto.drawImage(
            bird,
            flappyBird.spriteX, flappyBird.spriteY,
            flappyBird.larguraOriginal, flappyBird.alturaOriginal,
            flappyBird.x, flappyBird.y,
            flappyBird.largura, flappyBird.altura
        );
    },
    
}
return flappyBird;

}
    

// fundo propriedades
const background = {
    spriteX: 0,
    spriteY: 0,
    largura: 1920,
    altura: 1080,
    x: 0,
    y: 0,

    desenha() {
        contexto.drawImage(
            fundo,
            background.spriteX, background.spriteY,
            background.largura, background.altura,
            background.x, background.y,
            canvas.width, canvas.height
        );
    }
};

// chao propriedades

function criarchao() {
    const chao = {
        spriteX: 0,
        spriteY: 0,
        larguraOriginal: 1276,
        alturaOriginal: 107,
        largura: 1900,
        altura: 107,
        x: 0,
        y: 700,
    atualiza() {
        const movimentoDoChao = 1;
        chao.x = (chao.x - movimentoDoChao) % (chao.largura / 2);
 
        chao.x = chao.x - movimentoDoChao;
    },
        desenha() {
            contexto.drawImage(
                groud,
                chao.spriteX, chao.spriteY,
                chao.larguraOriginal, chao.alturaOriginal,
                chao.x, chao.y,
                chao.largura, chao.altura
            );
            contexto.drawImage(
                groud,
                chao.spriteX, chao.spriteY,
                chao.larguraOriginal, chao.alturaOriginal,
                chao.x + chao.largura / 2, chao.y,
                chao.largura, chao.altura
            );
        }
    }
    return chao;
}
// corrigir chao incompleto apenas adionando algo acima do cano
function corigir() {
    const backchao = {
        spriteX: 0,
        spriteY: 0,
        larguraOriginal: 1276,
        alturaOriginal: 107,
        largura: 1900,
        altura: 107,
        x: 0,
        y: 800,
        desenha() {
            contexto.drawImage(
                correcao,
                backchao.spriteX, backchao.spriteY,
                backchao.larguraOriginal, backchao.alturaOriginal,
                backchao.x, backchao.y,
                backchao.largura, backchao.altura
            );
        }
    }
    return backchao;
}

// text inicio
const inicio = {

    spriteX: 267,
    spriteY: 0,
    larguraOriginal: 350,
    alturaOriginal: 302,
    largura: 350,
    altura: 304,
    x: 700,
    y: 170,

    desenha() {
        contexto.drawImage(
            sprites,
            inicio.spriteX, inicio.spriteY,
            inicio.larguraOriginal, inicio.alturaOriginal,
            inicio.x, inicio.y,
            inicio.largura, inicio.altura
        );
    }
};

// criar canos
function criaCanos() {
    const canos = {
        largura: 103,
        altura: 802,
        chao: {
            spriteX: 0,
            spriteY: 337,
        },
        ceu: {
            spriteX: 104,
            spriteY: 340,
        },
        espaco: 400, // Ajuste o valor do espaco conforme necessário
        pares: [],

        desenha() {
            canos.pares.forEach(function(par) {
                const yRandom = par.y;

                // Desenha o cano no céu
                const canoCeuX = par.x;
                const canoCeuY = yRandom - canos.altura;

                contexto.drawImage(
                    sprites,
                    canos.ceu.spriteX, canos.ceu.spriteY,
                    canos.largura, canos.altura,
                    canoCeuX, canoCeuY,
                    canos.largura, canos.altura
                );

                // Desenha o cano no chão
                const canoChaoX = par.x;
                const canoChaoY = yRandom + canos.espaco;

                contexto.drawImage(
                    sprites,
                    canos.chao.spriteX, canos.chao.spriteY,
                    canos.largura, canos.altura,
                    canoChaoX, canoChaoY,
                    canos.largura, canos.altura
                );
            });
        },

        atualiza() {
            if (canos.pares.length === 0 || canos.pares[canos.pares.length - 1].x < canvas.width - 500) {
                // Cria um novo par de canos quando o último par estiver a 300 pixels do final da tela
                const novoPar = {
                    x: canvas.width,
                    y: Math.random() * (canvas.height - canos.espaco),
                };

                canos.pares.push(novoPar);
            }
            canos.pares.forEach(function(par) {
                par.x -= 10;
            });

            // Remove os pares de canos que saíram completamente da tela
            canos.pares = canos.pares.filter(function(par) {
                return par.x + canos.largura > 0;
            });
        }
    };

    return canos;
}


function criaplacar() {
   const placar = {
    pontuacao: 0,
    desenha() {
        contexto.font = "50px VT323";
        contexto.textAlign = 'right'
        contexto.fillStyle = 'white';
        contexto.fillText(`${placar.pontuacao}`, canvas.width - 10, 50, 200);
    },

    atualiza() {
        placar.pontuacao = placar.pontuacao + 1;

    },
}
return placar;
}

// TELASSSS

const globais = {};
let TelaAtiva = {};

// mudar telas

function mudatela(novatela) {
    TelaAtiva = novatela;

if (TelaAtiva.inicializa) {
    TelaAtiva.inicializa();
}
    }

const Telas = {
    // tela inicial e td que esta nela
    inicio: {
        inicializa() {

        globais.flappyBird = criarflappyBird();
        globais.chao = criarchao();
        globais.backchao = corigir();

    },

        desenha() {
            background.desenha();
            globais.backchao.desenha();
            globais.chao.desenha();
            globais.flappyBird.desenha();
            
            inicio.desenha();
            
        },
        click() {
            mudatela(Telas.Game);
            Telas.Game.inicializa();
        },
        atualiza() {
            globais.chao.atualiza();
        }
    },

    // tela do jogo mesmo
    Game: {
        inicializa() {
            globais.placar = criaplacar();
            globais.canos = criaCanos();
            canvas.addEventListener('click', function () {
                globais.flappyBird.pula();
            });
        },
        desenha() {
            
            background.desenha();
            globais.canos.desenha();
            globais.chao.desenha();
            globais.backchao.desenha();
            globais.flappyBird.desenha();
            globais.placar.desenha();
            
        },
        atualiza() {
            globais.chao.atualiza();
            globais.flappyBird.atualiza();
            globais.placar.atualiza();
            
            globais.chao.atualiza();
            globais.canos.atualiza();
        }
    }
};

function loop() {
    TelaAtiva.desenha();
    TelaAtiva.atualiza();

    requestAnimationFrame(loop);
}

window.addEventListener('click', function () {
    if (TelaAtiva === Telas.inicio) {
        msc.play();
        TelaAtiva.click();
    }
});

mudatela(Telas.inicio);
let frames = 0;
loop();