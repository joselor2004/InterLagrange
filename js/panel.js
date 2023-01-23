function updatePanel() {
	PHONE_USER = window.innerWidth <= 600;
	PANEL_WIDTH = PHONE_USER ? window.innerWidth : 450;

	const panelItem = document.getElementById("panel");
	panelItem.style.left = - PANEL_WIDTH + "px";
	panelItem.style.width = PANEL_WIDTH + "px";

	PANELOPEN ? moveNav() : null; 
}




function moveNav() {
	document.getElementById("panel").style.left = PANELOPEN ? - PANEL_WIDTH + "px" : "0px";
	document.getElementById('fonction').style.width = (PANEL_WIDTH - 20) + "px";

	const buttonItem = document.querySelector('.panelButton');
	const lineButtonItems = document.getElementsByClassName("line-menu");
	if (PHONE_USER) {
		buttonItem.style.left = !PANELOPEN ? (window.innerWidth - 70) + "px" : "20px";
		document.querySelector('.panelButton').classList.toggle('phoneOpen');
	} else {
		buttonItem.style.left = !PANELOPEN ? PANEL_WIDTH + 20 + "px" : "20px";
	}

	document.querySelector('.panelButton').classList.toggle('open');
	PANELOPEN = !PANELOPEN;
}




function copyToClipboard() {
	navigator.clipboard.writeText(
		"$y =" + P.print() + "$" || "$y=0$"
	);
}