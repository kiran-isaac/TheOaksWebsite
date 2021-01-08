var button = document.getElementById("menu-button");
var menu = document.getElementById("links");

let toggle = false

button.onclick = function() {
    toggle = !toggle
    if (toggle) {
        menu.style.right = "0px";
    } else {
        menu.style.right = "-286px";
    };
};