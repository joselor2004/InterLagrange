

function moveNav() {
	console.log(PANELOPEN, PANEL_WIDTH)
	document.getElementById("panel").style.width = PANELOPEN ? "0px" : PANEL_WIDTH + "px";
	document.getElementById('fonction').style.width = (PANEL_WIDTH - 20) + "px";
	document.querySelector('.panelButton').style.left = PANELOPEN ? "20px" : PANEL_WIDTH + 20 + "px";
	document.querySelector('.panelButton').classList.toggle('open');


	PANELOPEN = !PANELOPEN;
}




function copyToClipboard() {
	navigator.clipboard.writeText(
		"$y =" + P.print() + "$" || "$y=0$"
	);
}