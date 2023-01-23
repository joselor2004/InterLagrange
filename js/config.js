const N_POINTS = window.innerWidth / 3; 		// Nombre de points
const POINT_RADIUS = 5;     					// Rayon des points
const CLICK_RADIUS = 8;                         // Rayon clickable des points

var PHONE_USER = window.innerWidth <= 600;
var PANEL_WIDTH = PHONE_USER ? window.innerWidth : 450                    // Largeur du panel 

var PANELOPEN = false; // Permet de savoir si le panel est ouvert ou non