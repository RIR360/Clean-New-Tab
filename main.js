// gets a single dom element
function qs(elem) {
    return document.querySelector(elem);
}
// gets a list of dom elements 
function qsa(elem) {
    return document.querySelectorAll(elem);
}

// Dom Elements
const   time_block = qs("#time"),
        date_block = qs("#date"),
        links_parent = qs("#daily_links"),
        toggle_btn = qs("#dl-toggle"),
        links_block = qs("#daily_links .links-div");


//Time and date box
var today = new Date();

function startTime() {
    // updating time each time
    today = new Date();
    var hr = today.getHours();
    var min = today.getMinutes();
    var sec = today.getSeconds();
    // gettin g12 hour format to show
    ap = (hr < 12) ? "<span>AM</span>" : "<span>PM</span>";
    hr = (hr == 0) ? 12 : hr;
    hr = (hr > 12) ? hr - 12 : hr;
    //Add a zero in front of numbers<10
    min = checkTime(min);
    sec = checkTime(sec);
    time_block.innerHTML = hr + ":" + min + ":" + sec + " " + ap;
    
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    // getting the date from today object
    var curWeekDay = days[today.getDay()];
    var curDay = today.getDate();
    var curMonth = months[today.getMonth()];
    var curYear = today.getFullYear();
    var date = curWeekDay+", "+curDay+" "+curMonth+" "+curYear;
    date_block.innerHTML = date;
    // calling the function after 500 miliseconds
    var time = setTimeout(function(){ startTime() }, 500);
}
// adds zero before time digit
function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

//background
var image_folder = "backgrounds/";
// images to show on the background
var bg_images = 
[
    "quote-2.jpg",
    "photo-1603923374583-237cebdaf764.jpg",
    "photo-1604677063727-129cc2e105ee.jpg",
    "photo-1604914172042-7f4156698dad.jpg",
    "photo-1605687961117-7fd892390cb9.jpg"
];
// sets the background in random order
qs("body").style.background = 
"rgb(30, 30, 30) url('"+image_folder+bg_images[Math.floor(Math.random() * bg_images.length)]+"')";


// link box opening animation
function openLinks() {
    if (links_parent.style.height == "300px") {
        links_parent.style.height = "50px";
        links_block.style.opacity = 0;
        setTimeout(() => {
            links_parent.style.width = "50px";
            links_block.style.display = "none";
        }, 500);
        setTimeout(() => {
            toggle_btn.style.transform = "rotate(0deg)";
        }, 1000);
    } else {
        links_block.style.display = "block";
        links_block.style.opacity = 0;
        toggle_btn.style.transform = "rotate(360deg)";
        setTimeout(() => {
            links_parent.style.width = "100%";
            links_parent.style.height = "300px";
        }, 500);
        setTimeout(() => {
            links_block.style.opacity = 1;
        }, 800);
    }
} 
// trigger the function on click
toggle_btn.addEventListener("click", openLinks);


// remembering clicks with localstorage


var daily_links = qsa(".d-link");
var active_links = qsa(".d-link.active");
// take initial status of links to the storage
function initialize_storage() {
    localStorage.setItem("day", today.getDay());
    var links = qsa(".d-link");
    links.forEach(link => {
        localStorage.setItem(link, link.classList.contains("visited"));
    });
    update_links();
}
// updats the status of each links to the storage
function update_links() {
    var links = qsa(".d-link");
    links.forEach(link => {
        if (localStorage.getItem(link) == "true") {
            link.classList.add("visited");    
        }
    });
    if (qsa(".d-link").length == qsa(".d-link.visited").length) {
        qs("#notify").style.display = "none";
    }
}
// updates the indicator sign
function update_visited(elem) {
    elem.classList.add("visited");
    localStorage.setItem(elem, true);
    if (qsa(".d-link").length == qsa(".d-link.visited").length) {
        qs("#notify").style.display = "none";
    }
}
// when user clicks any daily links button
daily_links.forEach(link => {
    link.addEventListener("click", ()=>{
        update_visited(link);
    });
});
// this run only for once in a day
if (today.getDay() != localStorage.getItem("day")) {
    initialize_storage();
}
// starts time box and 
startTime();
update_links();