// -----------------------------------------------------------------------------
// Les paramètres constants sont définie dans le fichier config.js
//
// Les fonctions pour faire les opérations sur les polynomes
// sont dans le fichier polynome.js
//
// -----------------------------------------------------------------------------

// Alban dsl j'ai retiré un peu de ton code sans
// te demander mais s'était vrm plus simple avec les
// classes et en plus je comprenais rien quand tu fais .map

function interpolateur(x, i) {
    let l = new Polynomes([1]);
    for (let j = 0; j < x.length; j++) {
        if (j != i) {
            let t = new Polynomes([
                - x[j] / (x[i] - x[j]),
                1 / (x[i] - x[j]),
            ])

            l.mult(t);
        }
    }

    return l;
}

function interpolation(x, y) {
    let P = new Polynomes();
    for (let i = 0; i < y.length; i++) {
        let yi = new Polynomes([y[i]]);
        yi.mult(interpolateur(x, i));
        P.add(yi);
    }

    return P;
}

// Permet d'afficher un point
function point(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, POINT_RADIUS, 0, 2 * Math.PI, true);
    ctx.fill();
}

// Permet d'afficher une ligne
function draw_line(x, y, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x, window.innerHeight - y);
    ctx.lineTo(x2, window.innerHeight - y2);

    ctx.stroke();
}

// Permet de calculer et d'afficher la fonction
function eval_and_draw() {
    P = interpolation(xi, yi);
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (let i = 1; i < N_POINTS; i++) {
        // O(2 * NB) -> O(NB)
        let a = P.eval(dx[i - 1]);
        let b = P.eval(dx[i]);
        draw_line(dx[i - 1], a, dx[i], b);
    }

    ctx.strokeStyle = "white";
    for (let i = 0; i < xi.length; i++) {
        if (held == i)
            ctx.fillStyle = "red";
        else
            ctx.fillStyle = "white";
        point(xi[i], window.innerHeight - yi[i]);
    }
}

// Permet de générer les abscisses
function generate_dx() {
    let out = [];
    for (let i = 0; i < N_POINTS; i++) {
        out.push(window.innerWidth * i / N_POINTS);
    }
    return out;
}

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

let xi = [];
let yi = [];
let dx = generate_dx();
let held = -1;
let is_holding = false;
let P;

function distance_carre(x1, y1, x2, y2) {
    return (x1 - x2) ** 2 + (y1 - y2) ** 2;
}


function set_size() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

set_size();
window.onresize = _ => set_size();

// josé si tu retire ça encore je te retrouve
// toi et toute ta famille. Cordialement Cyprien
function save_x(x) {
    let d = 0;
    let n = xi.length;

    function x_exist(x) {
        for (let i = 0; i < n - 1; i++) {
            if (xi[i] == x) {
                return true;
            }
        }

        return false;
    }

    while (x_exist(x + d)) {
        d++;
    }

    return x + d;
}

function calibre(y) {
    return window.innerHeight - y;
}

function catch_existing(x, y) {
    let n = xi.length;

    for (let i = 0; i < n; i++) {
        // La distance au carré est moins couteuse à calculer ( la racine carré c long )
        // En plus on a puisque le carré est strictement croissant sur des positifs
        // sqrt(d) < POINT_RADIUS <=> d < POINT_RADIUS**2
        let d = distance_carre(x, y, xi[i], yi[i]);
        if (d <= CLICK_RADIUS ** 2) {
            is_holding = true;
            return i;
        }
    }

    return n;
}

window.onmousedown = e => {
    let y = calibre(e.y);
    let n = xi.length;
    held = catch_existing(e.x, y);

    if (held == n) {
        xi.push(e.x);
        yi.push(y);
    }

    eval_and_draw();
    is_holding = true;
}

window.onmousemove = e => {
    let x = save_x(e.x)
    let y = window.innerHeight - e.y;

    if (held >= 0 && is_holding) {
        point(x, y);
        xi[held] = save_x(e.x);
        yi[held] = y;
        eval_and_draw();
        // alban stp j'ai copié ça sur internet
        // mais j'arrive pas à grossir le text
        ctx.fillText(P.print(), 20, 50);
    }
}

window.onmouseup = _ => {
    if (!is_holding) {
        return false;
    }

    held = -1;
    is_holding = false;
    eval_and_draw();
    ctx.fillText(P.print(), 20, 50);
}
