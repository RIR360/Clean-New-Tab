// elements
const 
day_container = document.getElementById("day"),
date_container = document.getElementById("date"),
bookmark_secrectButton = document.getElementById("bookmark-s-toggle"),
bookmark_button = document.getElementById("bookmark-toggle"),
bookmark_List = document.getElementById("bookmark-list");

// globals
const 
days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
date = new Date(),
index = date.getDay(),
bg_images = [
    "public/backgrounds/alonso-reyes-544DkFtompA-unsplash.jpg",
    "public/backgrounds/andre-benz-e4xOmzd8vzg-unsplash.jpg",
    "public/backgrounds/ebba-thoresson-O9vsfZq8UWw-unsplash.jpg",
    "public/backgrounds/karsten-wurth-7BjhtdogU3A-unsplash.jpg",
    "public/backgrounds/rosie-sun-1L71sPT5XKc-unsplash.jpg"
];


// Bookmark class for the dom
/* class Bookmark {
    constructor()
} */
// renders html for a single bookmark
function render_bookmark(bookmark) {
    // folder values
    const
    title = bookmark.title,
    url = bookmark.url;
    return `
        <a target="_blank" class="bookmark" href="${url}">
            <div class="py-1">
                ${title}
            </div>
        </a>
    `;
}
// renders html for bookmark folder or collection
function render_folder(folder) {
    // folder values
    const
    id = folder.id,
    title = folder.title,
    // get bookmakrs
    bookmarks = folder.children,
    rendered = [];
    // rendering bookmarks
    for (let bookmark of bookmarks)
        rendered.push(render_bookmark(bookmark));
    // return whole folder html
    return `
    <div class="bookmark-folder container">
        <h4 class="bookmark-title smooth" data-bs-toggle="collapse" data-bs-target="#folder${id}" aria-expanded="false" aria-controls="folder${id}">
            ${title}
        </h4>
        <div id="folder${id}" class="accordion-collapse collapse smooth">
            <div class="accordion-body">
                ${rendered.join('')}
            </div>
        </div>
    </div>
    `;
}
// toggles the bookmark list appearance
function toggle_bookmarks() {
    bookmark_List.classList.toggle("list-appear");
}
// sets a randome background image
function random_background() {
    let randIndex = Math.floor(Math.random() * bg_images.length);
    document.body.style.background = `url("${bg_images[randIndex]}")`;
    document.body.style.backgroundSize = "cover";
}

// main function
window.onload = async (e) => {
    
    // load a randome background
    random_background();

    // set day and date
    day_container.innerHTML = days[index];
    date_container.innerHTML = 
    date.getMonth() + 1 + "/" +
    date.getDate() + "/" + 
    date.getFullYear();
    
    // load bookmarks
    await chrome.bookmarks.getTree(res => {
        // get the bookmark object list
        const folders = res[0].children[0].children;
        // print
        for (let folder of folders)
        bookmark_List.innerHTML += (render_folder(folder));
    });

    // bookmark toggle
    bookmark_button.addEventListener("click", e => {
        toggle_bookmarks();
    })
    bookmark_secrectButton.addEventListener("mouseover", e => {
        toggle_bookmarks();
    })

    // display the page
    document.body.style.opacity = 0;
    document.body.style.opacity = 1;
};