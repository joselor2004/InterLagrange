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

        // cool ta vie la souffrance
        // par contre j'ai changé ici pour qu'on affiche le coefficient
        // même si l'arrondi de c donne 0, pour signifier que ces termes
        // existent, même si petits + on affiche le signe
        for (let i = c.length - 1; i >= 0; i--) {
            let cr = Math.abs(c[i].toFixed(4));
            let signe = Math.sign(c[i]);

            if (i == c.length - 1)
                s += signe == 1 ? "" : "-";
            else
                s += signe == 1 ? " + " : " - ";
            s += cr != 0 ? cr : 0;
            s += i != 0 ? "x" : "";
            s += i != 0 && i != 1 ? "^" + i : "";

            // note pour plus tard: ne plus utiliser java script

        }

        return s;
    }
}
