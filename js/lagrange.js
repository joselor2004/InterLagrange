// -----------------------------------------------------------------------------
// Les paramètres constants sont définie dans le fichier config.js
//
// Les fonctions pour faire les opérations sur les polynomes
// sont dans le fichier polynome.js
//
// -----------------------------------------------------------------------------


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

// version un peu primitive d'un truc pour randomizer un polynôme
// de plus haut degré ( faudrait pouvoir enlever les points ensuite 
// et ne pas afficher les points randoms à l'écran )
function random_interpolation()
{
    let i = 0;
    // le 5 est vrm au pif
    let n = 5 * Math.random();
    while (i < n)
    {
        let x = window.innerWidth * Math.random();
        if (!(x in xi))
        {
            let y = calibre(window.innerHeight * Math.random());
            xi.push(x);
            yi.push(y);
            i++;
        }
    }
    eval_and_draw();
    refresh_interface();
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

function refresh_interface()
{
	// Récupération du <p> id="fonction" et on remplace son contenu par la fonction
	katex.render("y =" + P.print(), document.getElementById("fonction"));
}

// Permet de générer les abscisses
function generate_dx() {
    let out = [];
    for (let i = 0; i < N_POINTS; i++) {
        out.push(window.innerWidth * i / N_POINTS);
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
	console.log('test')
	xi = [];
	yi = [];
	P = new Polynomes([0]);
	eval_and_draw();
	console.log('test')
}



var xi = [];
var yi = [];
var boutons = [];
var dx = generate_dx();
var held = -1;
var is_holding = false;
var P = new Polynomes([0]);

// boutons.push(new Bouton(70, 70, 70, 70, random_interpolation, "white")); // Je rajouterais cette fonctionnionalité directement sur le panel
// draw_interface();


function mouseDown(e) {
    for (let i = 0; i < boutons.length; i++)
    {
        if (boutons[i].is_inside(e.x, e.y))
        {
            boutons[i].func();
            return;
        }
    }
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
