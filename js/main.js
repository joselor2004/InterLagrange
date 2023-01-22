
// Action réalisé au premier lancement de la page
// Actions réalisé par l'utilisateur


var ctx;
var canvas;

window.onload = function() {
    canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');

	canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

	katex.render("y = 0", document.getElementById("fonction"));
};

window.onmousedown = (e) => {

	// Vérifier si on a cliqué sur le bouton
	if (PANELOPEN) {
		if (e.clientX < PANEL_WIDTH) return;

		if (e.clientX > PANEL_WIDTH && e.clientX < PANEL_WIDTH + 70 && e.clientY < 70) {
			moveNav();
			return;
		}

		// if (e.clientX > window.innerWidth - 70 && e.clientY < 70) {
		// 	moveNav();
		// 	return;
		// }
	}
	else {
		if (e.clientX < 70 && e.clientY < 70) {
			moveNav();
			return;
		}
	}


	
	mouseDown(e);
}