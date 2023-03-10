// -----------------------------------------------------------------------------
// Les paramètres constants sont définie dans le fichier config.js
//
// Les fonctions pour faire les opérations sur les polynomes
// sont dans le fichier polynome.js
//
// -----------------------------------------------------------------------------


function interpolateur(x, i) {
    let L = new Polynomes([1]);
    for (let j = 0; j < x.length; j++) {
        if (j != i) {
            let t = new Polynomes([
                - x[j] / (x[i] - x[j]),
                1 / (x[i] - x[j]),
            ])

            L.mult(t);
        }
    }

    return L;
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

function inter_Lagrange(x, array_x, array_y)
{
    let val = 0;
    for (let k = 0; k < array_x.length; k++)
    {
        let L_k = 1;
        for (let i = 0; i < array_x.length; i++)
        {
            if (i != k)
                L_k *= (x - array_x[i]) / (array_x[k] - array_x[i]);
        }
        val += array_y[k] * L_k;
    }
    return val;
}

// Intégration à peu près, mais stylée
// avec n rectangles d'approximation
let nbr_rect = 500;
let rect = [];

function triggerIntegration()
{
    integrating = !integrating;
    eval_and_draw();
    refresh_interface();
}

function approx_integrale()
{
    rect = []
    let d = window.innerWidth;
    for (let i = 0; i < nbr_rect; i++)
    {
        let x = d * i / nbr_rect;
        let val = calibre(P.eval(x));
        rect.push([x, val, d * 1 / nbr_rect, calibre(val)]);
    }
}

// Ok dernière fonction, permet d'approcher n'importe
// quelle fonction f passée en argument
function approx_f(f, n)
{
    xi = [];
    yi = [];
    let deltaX = generate_dx(n);
    for (let i = 0; i < deltaX.length; i++)
    {
        let y = f(deltaX[i]);
        xi.push(deltaX[i]);
        yi.push(y);
        eval_and_draw();
        refresh_interface();
    }
}

// Fonction pour générer des points aléatoirement
function random_interpolation()
{
    let i = 0;
    let n = RANDOM_POINTS * Math.random();
    while (i < n)
    {
        let x = window.innerWidth * Math.random();
        if (!(x in xi))
        {
            let y = calibre(window.innerHeight * Math.random());
            xi.push(x);
            yi.push(y);
            i++;
            eval_and_draw();
            refresh_interface();
        }
    }
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

    // On dessine les rect d'intégration
    if (integrating)
    {
        approx_integrale();
        ctx.fillStyle = COULEUR_INTEGRATION;
        for (let i = 0; i < rect.length; i++)
        {
            let rectangle = rect[i];
            ctx.fillRect(rectangle[0], rectangle[1], rectangle[2], rectangle[3]);
        }
    }

    for (let i = 1; i < N_POINTS; i++) {
        // let a = P.eval(dx[i - 1]);
        // let b = P.eval(dx[i]);
        let a = inter_Lagrange(dx[i - 1], xi, yi);
        let b = inter_Lagrange(dx[i], xi, yi);
        ctx.strokeStyle = "white"
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

function refresh_interface()
{
	// Récupération du <p> id="fonction" et on remplace son contenu par la fonction
	katex.render("y =" + P.print(), document.getElementById("fonction"));
}

// Permet de générer les abscisses
function generate_dx(n) {
    let out = [];
    for (let i = 0; i < n; i++) {
        out.push(window.innerWidth * i / n);
    }
    return out;
}

// Celui qui comprend pas c une pute
function distance_carre(x1, y1, x2, y2) {
    return (x1 - x2) ** 2 + (y1 - y2) ** 2;
}

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

// On est armés, chargés, calibrés
function calibre(y) {
    return window.innerHeight - y;
}

function catch_existing(x, y) {
    let n = xi.length;

    for (let i = 0; i < n; i++) {
        let d = distance_carre(x, y, xi[i], yi[i]);
        if (d <= CLICK_RADIUS ** 2) {
            is_holding = true;
            return i;
        }
    }

    return n;
}


function set_size() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Permet de tout supprimer
function clear() {
	xi = [];
	yi = [];
	P = new Polynomes([0]);
	eval_and_draw();
}

// Une fonction random pour l'instant
function func(x)
{
    return 200 * Math.exp(-1/300 * x) * Math.sin(1/50 * x) + 300;
}

function test()
{
    approx_f(func, 20);
}

var xi = [];
var yi = [];
var dx = generate_dx(N_POINTS);
var held = -1;
var is_holding = false;
var integrating = false;
var P = new Polynomes([0]);

function mouseDown(e) {
    let y = calibre(e.y);
    let n = xi.length;
    held = catch_existing(e.x, y);

    if (held == n) {
        xi.push(e.x);
        yi.push(y);
    }

    eval_and_draw();
    refresh_interface();

    is_holding = true;
}

function mouseMove(e) {
    let x = save_x(e.x)
    let y = window.innerHeight - e.y;

    if (held >= 0 && is_holding) {
        point(x, y);
        xi[held] = save_x(e.x);
        yi[held] = y;
        eval_and_draw();
        refresh_interface();
    }
}

function mouseUp() {
    if (!is_holding) {
        return false;
    }

    held = -1;
    is_holding = false;
    eval_and_draw();
    refresh_interface();
}
