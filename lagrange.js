n_points = window.innerWidth / 3;
point_radius = 5;
click_radius = 7;

//Kc maths au pire
function L(array_x, i, x) {
    let prod = 1;
    for (let k = 0; k < array_x.length; k++) {
        if (k != i) {
            prod *= (x - array_x[k]) / (array_x[i] - array_x[k]);
        }
    }
    return prod;
}

function inter_Lagrange(array_x, array_y, x) {
    let sum = 0;
    for (let k = 0; k < array_x.length; k++) {
        sum += array_y[k] * L(array_x, k, x);
    }
    return sum;
}

function point(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, point_radius, 0, 2 * Math.PI, true);
    ctx.fill();
}

function draw_line(x, y, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x, window.innerHeight - y);
    ctx.lineTo(x2, window.innerHeight - y2);

    ctx.stroke();
}

function draw_function(f, dx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 1; i < n_points; i++) {
        draw_line(dx[i - 1], f[i - 1], dx[i], f[i]);

    }
}

function eval_and_draw(f, dx)
{
    f = [];
    for (let i = 0; i < n_points; i++) {
        let val = inter_Lagrange(xi, yi, dx[i]);
        f.push(val);
    }

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

function generate_dx() {
    let out = [];
    for (let i = 0; i < n_points; i++) {
        out.push(window.innerWidth * i / n_points);
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

f = [];
xi = [];
yi = [];
dx = generate_dx();
held_point = -1;
is_holding = false;

window.onmousedown = e => {
    //Permet de supprimer un point en cliquant dessus
    let i = point_proche(e.x, window.innerHeight - e.y, xi, yi, click_radius);
    if (i != -1)
    {
        xi.splice(i, 1);
        yi.splice(i, 1);
        eval_and_draw(f, dx);
    }
    else if (!xi.includes(e.x)) {
        is_holding = true;
        held_point = xi.length;
        xi.push(e.x);
        yi.push(window.innerHeight - e.y);
    }
}

window.onmousemove = e => {
    if (is_holding)
    {
        point(e.x, e.y);

        xi[held_point] = e.x;
        yi[held_point] = window.innerHeight - e.y;
        eval_and_draw(f, dx);
    }
}

window.onmouseup = e => {
    if (!is_holding) {
        return false;
    }

    held_point = -1;
    is_holding = false;
    eval_and_draw(f, dx);
}
