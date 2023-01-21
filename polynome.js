// Fonction qui supprime les 0 inutiles en fin de tableau
// et qui renvoie le Polynome formaté
function format_p(P) {
	let P_format = P;
	if (P = undefined || P === [0]) return [0];
	while (P_format[P_format.length - 1] == 0) {
		P_format.pop();
	}
	return P_format;
}


// Fonction qui prend en paramètre un tableau de polynomes
// et qui renvoie la somme de ces polynomes
function somme_p(array_p) {
	// On supprime les 0 inutiles en fin de tableau
	array_p = array_p.map((x) => format_p(x));

	// On récupère la taille du plus grand polynome
	let max_degre = Math.max(...array_p.map((x) => x.length));

	// On initialise le tableau de la somme
	let somme = new Array(max_degre).fill(0);

	// On ajoute les polynomes deux à deux
	for (let i = 0; i < array_p.length; i++) {
		for (let j = 0; j < array_p[i].length; j++) {
			somme[j] = somme[j] + array_p[i][j];
		}
	}

	// On supprime les 0 inutiles en fin de tableau et
	// On renvoie le polynome formaté
	return format_p(somme);
}

//Permet, si l'on tente d'accéder à un indice supérieur au degré du polynôme
//de renvoyer 0 ( définition )
function poly_infini(P, i) {
	if (i >= P.length)
		return 0;
	return P[i];
}

// Fonction qui prend en paramètre un tableau de polynomes
// et qui renvoie le produit de ces polynomes
function produit_p(array_p) {
	// On supprime les 0 inutiles en fin de tableau
	array_p = array_p.map((x) => format_p(x));

	// Fonction qui permet de multiplier deux polynomes
	function produit_p2(P1, P2) {
		let produit = new Array(P1.length + P2.length - 1).fill(0);
		for (let i = 0; i < produit.length; i++) {
			let convolution = 0;
			for (let k = 0; k <= i; k++)
				convolution += poly_infini(P1, k) * poly_infini(P2, i - k);

			produit[i] = convolution;
		}

		return format_p(produit);
	}

	// On multiplie les polynomes deux à deux
	let produit = array_p.reduce((a, b) => produit_p2(a, b));

	return produit;
}

// Fonction qui permet de dériver un polynome
function derive_p(P) {
	let P_derive = new Array(P.length - 1).fill(0);
	for (let i = 0; i < P_derive.length; i++) {
		P_derive[i] = P[i + 1] * (i + 1);
	}
	return format_p(P_derive);
}

// Fonction qui permet d'évaluer un polynome
function eval_p(P, x) {
	return P.map((a, i) => a * Math.pow(x, i)).reduce((a, b) => a + b);
}

// j'ai fais ça très rapidement ça fonctionne
// à peu près pareil que le code au dessus mais c'est
// un peut plus organisé et surtout ya que 4 d'indentation
// ça s'utilise différament donc j'ai pas touché polynome.js
// pour ne pas tout casser mais ça sera mieux à utiliser plus tard
class Polynomes {
	constructor(coefs) {
		this.coefs = coefs || [];
	}

	add(P) {
		let n = P.coefs.length;
		let deg = this.coefs.length - 1;

		for (let i = 0; i < n; i++) {
			if (i > deg) {
				this.coefs.push(P.coefs[i]);
			} else {
				this.coefs[i] += P.coefs[i];
			}
		}
	}

	monome(coef, deg) {
		let r = [];
		for (let i = 0; i < deg - 1; i++) {
			r.push(0);
		}

		r.push(coef);
		return new Polynomes(r);
	}

	// pour faire une petit coiffure au polynome
	trim() {
		let i = this.coefs.length - 1;

		while (this.coefs[i] == 0) {
			this.coefs.pop();
			i--;
		}
	}

	inf(coef) {
		return coef || 0;
	}

	mult(P) {
		let r = new Polynomes();
		let c = this.coefs;
		let cp = P.coefs;

		// convolution tu connais
		for (let n = 0; n < c.length + cp.length; n++) {
			for (let j = 0; j <= n; j++) {
				let m = this.inf(c[j]) * this.inf(cp[n - j])
				r.add(this.monome(m, n));
			}
		}

		this.coefs = r.coefs;
	}

	derive() {
		let n = this.coefs.length;

		for (let i = 0; i < n - 1; i++) {
			this.coefs[i] = this.coefs[i + 1] * (i + 1);
		}

		this.coefs.pop();
	}

	eval(x) {
		let s = 0;
		let c = this.coefs;

		for (let i = 0; i < c.length; i++) {
			s += c[i] * x ** i;
		}

		return s;
	}
}
