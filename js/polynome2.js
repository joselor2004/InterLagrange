// j'ai fais ça très rapidement ça fonctionne
// à peu près pareil que le code dans polynome.js mais c'est
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
        for (let i = 0; i < deg; i++) {
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
        let a = this.coefs;
        let b = P.coefs;

        for (let i = 0; i < a.length; i++) {
            for (let j = 0; j < b.length; j++) {
                r.add(this.monome(a[i] * b[j], i + j));
            }
        }

        r.trim();
        this.coefs = r.coefs;

    }

    derive() {
        let n = this.coefs.length;

        for (let i = 0; i < n - 1; i++) {
            this.coefs[i] = this.coefs[i + 1] * (i + 1);
        }

        this.coefs.pop();
    }

    // Fonction qui spoiler, primitive avec une condition initiale
    primitive(condInit)
    {
        this.coefs.push(0);
        let n = this.coefs.length;

        for (let i = 1; i < n; i++)
            this.coefs[i] = this.coefs[i - 1] / i;

        this.coefs[0] = condInit;
    }

    eval(x) {
        let s = 0;
        let c = this.coefs;

        for (let i = 0; i < c.length; i++) {
            s += c[i] * x ** i;
        }

        return s;
    }

    print() {
        let c = this.coefs;
        let s = "";
        this.trim();
        
		// Affichage du polynome avec des puissances de 10 avec 2 chiffres significatifs maximum (arrondi)
		// Format latex
		for (let i = c.length - 1; i >= 0; i--) {
			const puissance = Math.floor(Math.log10(Math.abs(c[i])));
			const coeff = Math.round(c[i] / 10 ** puissance * 10) / 10;
			const signe = Math.sign(c[i]);
			const coeffAbs = Math.abs(coeff);

			// Si c'est le premier terme, on affiche le signe uniquement si le coefficient est négatif
			if (i === c.length - 1) {
				s += signe === -1 ? "~-~" : "~";
			} else {
				s += signe === 1 ? "~+~" : "~-~";
			}

			s += coeffAbs !== 0 ? coeffAbs + " \\cdot 10^{" + puissance + "}" : 0;
			s += i !== 0 ? " \\cdot " : "";
			s += i != 0 ? "x^{" + i + "}" : "";

		}

        return s;
    }
}
