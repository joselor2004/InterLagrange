<<<<<<< HEAD
n_points = window.innerWidth / 3;
point_radius = 5;
click_radius = 7;
=======
// -----------------------------------------------------------------------------
// Les paramètres constants sont définie dans le fichier config.js
// 
// Les fonctions pour faire les opérations sur les polynomes 
// sont dans le fichier polynome.js
//
// -----------------------------------------------------------------------------
>>>>>>> b5846dbfbe83bc910f967cd8af7f0a265e4bdae1



// Interpolateur
function L(array_x, i) {
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
function inter_Lagrange(array_x, array_y, x) {
	let sumProd = [0];

	for (let k = 0; k < array_x.length; k++) {
		let poly = L(array_x, k);
		poly = produit_p([
			[array_y[k]], // Constante
			poly
		])

		sumProd = somme_p([poly, sumProd]); // On ajoute tout les polynome (on en fait qu'un)
	}

	return eval_p(sumProd, x);
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

// Permet d'afficher une fonction
function draw_function(f, dx) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (let i = 1; i < N_POINTS; i++) {
		draw_line(dx[i - 1], f[i - 1], dx[i], f[i]);
	}
}

<<<<<<< HEAD
function eval_and_draw(f, dx)
{
    f = [];
    for (let i = 0; i < n_points; i++) {
        let val = inter_Lagrange(xi, yi, dx[i]);
        f.push(val);
    }
=======
// Permet de calculer et d'afficher la fonction
function eval_and_draw(f, dx) {
	for (let i = 0; i < N_POINTS; i++) {
		let val = inter_Lagrange(xi, yi, dx[i]);
		f.push(val);
	}
>>>>>>> b5846dbfbe83bc910f967cd8af7f0a265e4bdae1

	ctx.strokeStyle = "white";
	draw_function(f, dx);
	for (let i = 0; i < xi.length; i += 1) {
		if (held_point == i)
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

//Verifie si (x, y) est à une distance inférieure à distance d'un des points
function point_proche(x, y, array_x, array_y, distance)
{
    for (let i = 0; i < array_x.length; i++)
    {
        //On calcule la distance au carré
        let dist_x = x - array_x[i];
        let dist_y = y - array_y[i];
        let sqrdist = dist_x*dist_x + dist_y*dist_y;

        if (sqrdist <= distance*distance)
            return i;
    }
    return -1;
}

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let f = [];
let xi = [];
let yi = [];
let dx = generate_dx();
let held_point = -1;
let is_holding = false;

function distance_euclidienne(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}

window.onmousedown = e => {
<<<<<<< HEAD
    //Permet de supprimer un point en cliquant dessus
    let i = point_proche(e.x, window.innerHeight - e.y, xi, yi, click_radius);
    if (i != -1)
    {
        xi.splice(i, 1);
        yi.splice(i, 1);
        eval_and_draw(f, dx);
    }
    else if (!xi.includes(e.x)) {
=======
    let n = xi.length;

    // attraper un point déjà posé
    for(let i = 0; i < n; i++) {
        let d = distance_euclidienne(xi[i], yi[i], e.x, window.innerHeight - e.y);
        console.log(d);
        if (d < POINT_RADIUS && !xi.includes(e.x)) {
            held_point = i;
            is_holding = true;
            console.log("je prend le controle de " + i);
        }
    }


    if (!is_holding && !xi.includes(e.x)) {
>>>>>>> b5846dbfbe83bc910f967cd8af7f0a265e4bdae1
        is_holding = true;
        held_point = xi.length;
        xi.push(e.x);
        yi.push(window.innerHeight - e.y);
    }
}

window.onmousemove = e => {
<<<<<<< HEAD
    if (is_holding)
    {
        point(e.x, e.y);

        xi[held_point] = e.x;
        yi[held_point] = window.innerHeight - e.y;
        eval_and_draw(f, dx);
    }
=======
	if (held_point != -1 && is_holding) {
		f = []
		point(e.x, e.y);

		xi[held_point] = e.x;
		yi[held_point] = window.innerHeight - e.y;
		f = []
		eval_and_draw(f, dx);
	}
>>>>>>> b5846dbfbe83bc910f967cd8af7f0a265e4bdae1
}

window.onmouseup = e => {

    if (!is_holding) {
        return false;
    }

    held_point = -1;
    is_holding = false;
    eval_and_draw(f, dx);
}
