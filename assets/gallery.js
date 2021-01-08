var gallery1 = document.getElementById("gallery1");
var gallery2 = document.getElementById("gallery2");
var gallery3 = document.getElementById("gallery3");

var leftarrow = document.getElementsByClassName("leftarrow")[0];
console.log(leftarrow)
var rightarrow = document.getElementsByClassName("rightarrow")[0];

let imageNames = ["Big Oaks 19.jpg","Burghf Oaks 28.jpg","DSC_0971.jpg","Early L Oaks 14.jpg","Early L Oaks 18.jpg","Early L Oaks 19.jpg","DSC_0137.jpg","Early L Oaks 29.jpg","Big Oaks 07.jpg","Big Oaks 29.jpg","Big Oaks 95.jpg","Burghf Oaks 31.jpg","DSC_0961.jpg","General Snack.jpg","General Staff.jpg","Little Oaks 27.jpg"];

let srcs = [];
for (let image of imageNames) {
    srcs.push("assets/gallery/" + image)
};

let imageNo = 0

gallery1.src = srcs[srcs.length-1]
gallery2.src = srcs[0];
gallery3.src = srcs[1];

gallery1.onclick = function() {
    cycle(-1);
    refresh();
};

leftarrow.onclick = function() {
    cycle(-1);
    refresh();
};

gallery3.onclick = function() {
    cycle(1);
    refresh();
};

rightarrow.onclick = function() {
    cycle(1);
    refresh();
};

function refresh() {
    gallery1.style.opacity = "0.2";
    gallery2.style.opacity = "0.2";
    gallery3.style.opacity = "0.2";
    setTimeout(() => {
        gallery1.style.opacity = "1";
        gallery2.style.opacity = "1";
        gallery3.style.opacity = "1";
        gallery2.src = srcs[imageNo];
        mobiledisplay.src = srcs[imageNo];
        if (imageNo-1 >= 0) {
            gallery1.src = srcs[imageNo-1];
        } else {
            gallery1.src = srcs[srcs.length-1];
        };
        if (imageNo+1 < srcs.length) {
            gallery3.src = srcs[imageNo+1];
        } else {
            gallery3.src = srcs[0];
        };
    },100);
};

function cycle(x) {
    imageNo += x;
    if (imageNo == srcs.length) {
        imageNo = 0;
    } else if (imageNo < 0) {
        imageNo = srcs.length-1;
    };
};