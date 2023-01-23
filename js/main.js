
// Action réalisé au premier lancement de la page
// Actions réalisé par l'utilisateur


var ctx;
var canvas;

window.onload = function() {
    canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');

	canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

	// Rendre la fonction latex
	katex.render("y = 0", document.getElementById("fonction"));

	// Gérer la taille du panel
	updatePanel();
};

window.onmousedown = (e) => {

	// Vérifier si on a cliqué sur le bouton
	if (PANELOPEN) {
		if (PHONE_USER) {
			if (e.clientX > PANEL_WIDTH - 70 && e.clientY < 70) {
				moveNav();
			}
			return;
		}else {
			if (e.clientX > PANEL_WIDTH && e.clientX < PANEL_WIDTH + 70 && e.clientY < 70) {
				moveNav();
				return;
			}
			
			if (e.clientX < PANEL_WIDTH) return;
		}
	}
	else {
		if (e.clientX > PANEL_WIDTH - 70 && e.clientY > window.innerHeight - 70) {
			moveNav();
			return;
		}	
		if (e.clientX < 70 && e.clientY < 70) {
			moveNav();
			return;
		}
	}

	mouseDown(e);
}


window.onmousemove = (e) => {
	mouseMove(e);
}

window.onmouseup = (_) => {
	mouseUp();
}

window.onresize = () => {
	// Panel
	updatePanel();

	// Canvas
	set_size();
}