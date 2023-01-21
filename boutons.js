// Comme ça on a des bons boutons bien fonctionnels
// pour faire un peu ce qu'on veut en terme d'interface

class Bouton
{
    // l et h c'est largeur et hauteur
    // func la fonction associée au clic de ce bouton
    constructor(x, y, l, h, func, color)
    {
        this.x = x;
        this.y = y;
        this.l = l;
        this.h = h;
        this.func = func;
        this.color = color
    }

    // teste si un objet ( comme la souris ) est dans le bouton
    is_inside(x, y)
    {
        let borné_x = this.x <= x && x <= this.x + this.l;
        let borné_y = this.y <= y && y <= this.y + this.h;
        return borné_x && borné_y;
    }

    draw()
    {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.l, this.h);
    }
}