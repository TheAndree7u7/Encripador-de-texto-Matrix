const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const arrayCaracteres = [
    "ア", "ィ", "イ", "ゥ", "ウ", "ェ", "エ", "ォ", "オ", "カ",
    "ガ", "キ", "ギ", "ク", "グ", "ケ", "ゲ", "コ", "ゴ", "サ",
    "ザ", "シ", "ジ", "ス", "ズ", "セ", "ゼ", "ソ", "ゾ", "タ",
    "ダ", "チ", "ヂ", "ッ", "ツ", "ヅ", "テ", "デ", "ト", "ド",
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
    "!", "@", "#", "$", "%", "^", "&", "*", "(", ")",
    "【", "】", "『", "』", "「", "」", "♠", "♡", "♢", "♣"
];
const codigoArray = [];
const conteoCodigo = 100;
const fontSize = 18;
let numeroColumna;
let frame = 0;

class Matrix {
    constructor(x, y) {
        this.y = y;
        this.x = x;
    }

    dibujar(ctx) {
        this.valor = arrayCaracteres[Math.floor(Math.random() * (arrayCaracteres.length - 1))].toUpperCase();
        this.velocidad = Math.random() * fontSize * 3 / 4 + fontSize * 3 / 4;

        ctx.fillStyle = "rgba(0,255,0,0.7)";
        ctx.font = fontSize + "px monospace";
        ctx.fillText(this.valor, this.x, this.y);

        this.y += this.velocidad;

        if (this.y > canvas.height) {
            this.x = Math.floor((Math.random() * numeroColumna) * fontSize);
            this.y = 0;
            this.velocidad = (-Math.random() * fontSize * 3) / 4 + (fontSize * 3) / 4;
        }
    }
}

function inicializar() {
    codigoArray.length = 0;
    numeroColumna = canvas.width / fontSize;
    for (let i = 0; i < conteoCodigo; i++) {
        codigoArray.push(new Matrix(Math.floor(Math.random() * numeroColumna) * fontSize, Math.random() * canvas.height));
    }
}

function actualizar() {
    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < codigoArray.length && frame % 3 == 0; i++) {
        codigoArray[i].dibujar(ctx);
    }

    requestAnimationFrame(actualizar);
    frame++;
}

window.addEventListener('resize', inicializar);
inicializar();
actualizar();