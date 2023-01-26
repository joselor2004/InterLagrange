const PTS = [];
let n = 0;

// comme le code de lagrange.js est vrm en bordel
// j'ai juste sortit tout ce qui concerne les points.
// TODO: implémentation

// On aurait plus besoins de garder x et y
// mais juste une liste des objets

class Point {
    constructor(x, y) {
        move(x, y);
    }

    move(x, y) {
        this.x = x;
        this.y = y;
    }

    calibre(y) {
        return window.innerHeight - y;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, POINT_RADIUS, 0, 2 * Math.PI, true);
        ctx.fill();
    }

    line(p) {
        ctx.beginPath();
        ctx.moveTo(this.x, calibre(this.y));
        ctx.lineTo(p.x, calibre(p.y));
        ctx.stroke();
    }

    dist(a, b) {
        return (a.x - b.x) ** 2 + (a.y - b.y) ** 2
    }

    close(p) {
        return dist(this, p) < POINT_RADIUS ** 2;
    }

    exists() {
        for (let i = 0; i < n; i++) {
            if (PTS[i].x == this.x) {
                return true;
            }
        }

        return false;
    }

    // tant que la position du point existe,
    // on décale vers la droite
    save() {
        for (let i = 0; i < n; i++) {
            while (exists(PTS[i])) {
                this.x++;
            }
        }
    }

    attrape() {
        for (let i = 0; i < n; i++) {
            if (close(PTS[i])) {
                return i;
            }
        }

        return -1;
    }

}
