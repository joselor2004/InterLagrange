n_points = window.innerWidth / 3;
point_radius = 5;

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

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

f = [];
xi = [];
yi = [];
dx = generate_dx();
held_point = -1;

window.onmousedown = e => {
    if (!xi.includes(e.x)) {
        held_point = xi.length;
        xi.push(e.x);
        yi.push(window.innerHeight - e.y);
    }
}

window.onmousemove = e => {
    if (held_point != -1)
    {
        f = []
        point(e.x, e.y);

        xi[held_point] = e.x;
        yi[held_point] = window.innerHeight - e.y;
        f = []
        eval_and_draw(f, dx);
    }
}

window.onmouseup = e => {
    held_point = -1;
    f = []
    eval_and_draw(f, dx);
}
