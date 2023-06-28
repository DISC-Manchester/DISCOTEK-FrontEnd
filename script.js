const xhr = new XMLHttpRequest();
const element = document.getElementById('leftFeatured');

var originFrame = document.querySelector(".card");
var originDest = document.querySelector(".mainBelt");
var s1n = 1;

function main() {
	xhr.open("GET", "https://api.discotek.net/items");
	xhr.send();
	xhr.responseType = "json";
	xhr.onload = () => {
		const data = xhr.response;
		for (let i = 0; i < [data.length]; i++) {
			var clone = originFrame.cloneNode(true);
			clone.setAttribute("id", i);
			clone.setAttribute("href", data[i]["URL"]);
			clone.setAttribute("style", "display: initial;");
			clone.querySelector(".cardTitle").innerHTML = data[i]["Name of Resource"];
			clone.querySelector(".cardHead").style.background = "url(" + data[i]["Image"] + ") center";
			clone.querySelector(".cardHead").style.backgroundSize = "cover";
			clone.querySelector(".cardText").innerHTML = data[i]["Description"];
			originDest.appendChild(clone);
		}
	}
}

element.addEventListener('mousemove', (e) => {
	const sliderBound = element.getBoundingClientRect();
    const globalCursor = { x: 0, y: 0 };
    globalCursor.x = e.clientX;
    globalCursor.y = e.clientY;

    const sliderCursor = { x: 0, y: 0 };
    sliderCursor.x = globalCursor.x - sliderBound.left;
    sliderCursor.y = globalCursor.y - sliderBound.top;
	
	if (sliderCursor.y < (window.innerHeight / 100 * 90) - 25 && sliderCursor.y > 20) {
		document.querySelector(".overImage").style.height = (sliderCursor.y) + "px";
		document.querySelector(".slider").style.transform = "translateY(" + (sliderCursor.y - (window.innerHeight / 100 * 2)) + "px)";
	}
});

function categoryHandler(queryVal) {
	let elements = document.getElementsByClassName("catName");
	for (let x = elements.length - 1; x >= 0; --x) {
		elements[x].classList.remove("transition");
		elements[x].style.color = "white";
		elements[x].classList.add("transition");
	}
	document.getElementById(queryVal).style.color = "#ad4be8";
	for (let i = 0; i < xhr.response.length; i++) {
		if (xhr.response[i]["Catergory"].includes(queryVal) == false) {
			document.getElementById(i).style.display = "none";
		} else {
			document.getElementById(i).style.display = "";
		}
	}
}

main();