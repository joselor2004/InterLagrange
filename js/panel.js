

function moveNav() {
	document.getElementById("panel").style.width = PANELOPEN ? "0px" : PANEL_WIDTH + "px";
	document.getElementById('fonction').style.width = (PANEL_WIDTH - 20) + "px";
	document.querySelector('.panelButton').style.left = PANELOPEN ?
	"20px" :
	window.innerWidth > 400 ?
	PANEL_WIDTH + 20 + "px" :
	window.innerWidth - 70 + "px";

	// if (PANELOPEN && window.innerWidth <= 400) {
	// 	document.getElementsByClassName('line-menu').foreach((e) => {
	// 		e.style.color = "black";
	// 		console.log(e)
	// 	});
	// }

	document.querySelector('.panelButton').classList.toggle('open');


	PANELOPEN = !PANELOPEN;
}




function copyToClipboard() {
	navigator.clipboard.writeText(
		"$y =" + P.print() + "$" || "$y=0$"
	);
}