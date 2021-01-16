var button = document.getElementById("menu-button");
var menu = document.getElementById("links");

let menuOpen = false;

function menuToggle() {
    

    if (!menuOpen) {
        menu.style.right = "0px";
    } else {
        menu.style.right = "-286px";
    };

    setTimeout(() => {
        menuOpen = !menuOpen
    }, 100);
}

document.addEventListener('click', function(event) {
    if (!menu.contains(event.target) && menuOpen || button.contains(event.target)) {
        menuToggle();
    };
});
