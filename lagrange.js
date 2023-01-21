// -----------------------------------------------------------------------------
// Les paramètres constants sont définie dans le fichier config.js
//
// Les fonctions pour faire les opérations sur les polynomes
// sont dans le fichier polynome.js
//
// -----------------------------------------------------------------------------

// Regardez la honte le code d'alban avec 8
// espaces d'indentation ahahhahahahahahahahahahahahhaahhahahah

// Polynômes formels
// Interpolateur
function L_poly(array_x, i) {
	const polynomes = array_x.map(k => {
		if (array_x[i] === k) {
			return [1]; // Polynome constant = 1
		}

		return [
			-k / (array_x[i] - k), 		// Coefficient de X^0
			1 / (array_x[i] - k)		// Coefficient de X^1
		]								// (X^0 - k) / (array_x[i] - k);
	});

	return produit_p(polynomes); // Retourne le i-ieme polynomes interpolateurs de Lagrange
}

// Interpolation de lagrange
function inter_Lagrange_poly(array_x, array_y) {
	let sumProd = [0];

	for (let k = 0; k < array_x.length; k++)
	{
		let poly = L_poly(array_x, k);
		poly = produit_p([
			[array_y[k]], // Constante
			poly
		])

		sumProd = somme_p([poly, sumProd]); // On ajoute tout les polynome (on en fait qu'un)
	}

	return sumProd;
}

// Fonctions polynomiales
// Interpolateur
function L(array_x, i, x) {
    let prod = 1;
    for (let k = 0; k < array_x.length; k++) {
        if (k != i) {
            prod *= (x - array_x[k]) / (array_x[i] - array_x[k]);
        }
    }
    return prod;
}

// Lagrange
function inter_Lagrange(array_x, array_y, x) {
    let sum = 0;
    for (let k = 0; k < array_x.length; k++) {
        sum += array_y[k] * L(array_x, k, x);
    }
    return sum;
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
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);   
    for (let i = 1; i < N_POINTS; i++) {
        // O(2 * NB) -> O(NB)
        let a = inter_Lagrange(xi, yi, dx[i - 1]);
        let b = inter_Lagrange(xi, yi, dx[i]);
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

let f = [];
let xi = [];
let yi = [];
let dx = generate_dx();
let held = -1;
let is_holding = false;

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
	for(let i = 0; i < n - 1; i++) {
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

    for(let i = 0; i < n; i++) {
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
    }
}

window.onmouseup = _ => {
    if (!is_holding) {
        return false;
    }

    held = -1;
    is_holding = false;
    eval_and_draw();
}
