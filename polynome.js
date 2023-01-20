// Fonction qui supprime les 0 inutiles en fin de tableau
// et qui renvoie le Polynome formaté
function format_p(P) {
	let P_format = P;
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

// Fonction qui prend en paramètre un tableau de polynomes
// et qui renvoie le produit de ces polynomes
function produit_p(array_p) {
	// On supprime les 0 inutiles en fin de tableau
	array_p = array_p.map((x) => format_p(x));

	// Fonction qui permet de multiplier deux polynomes
	function produit_p2(P1, P2) {
		let produit = new Array(P1.length + P2.length - 1).fill(0);
		for (let i = 0; i < P1.length; i++) {
			for (let j = 0; j < P2.length; j++) {
				produit[i + j] = produit[i + j] + P1[i] * P2[j];
			}
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
