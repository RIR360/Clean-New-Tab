// elements
const 
day_container = document.getElementById("day"),
date_container = document.getElementById("date"),
bookmark_secrectButton = document.getElementById("bookmark-s-toggle"),
bookmark_button = document.getElementById("bookmark-toggle"),
links_secrectButton = document.getElementById("links-s-toggle"),
links_button = document.getElementById("links-toggle"),
bookmark_List = document.getElementById("bookmark-list"),
daily_list = document.getElementById("daily-list"),
newLink_btn = document.getElementById("new-link"),
cancelNewLink_btn = document.getElementById("cancel-new-link"),
newLink_form = document.getElementById("new-link-form"),
addNewLink_btn = document.getElementById("add-new-link"),
links_container = document.getElementById("links");

// globals
const 
days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
date = new Date(),
index = date.getDay(),
bg_images = [
    "public/backgrounds/andre-benz-e4xOmzd8vzg-unsplash.jpg",
    "public/backgrounds/rosie-sun-1L71sPT5XKc-unsplash.jpg",
    "public/backgrounds/ben-den-engelsen-UFwW97AP0LI-unsplash.jpg",
    "public/backgrounds/jeremy-bishop-uAfZBP-GtiA-unsplash.jpg",
    "public/backgrounds/john-towner-JgOeRuGD_Y4-unsplash.jpg",
    "public/backgrounds/nandhu-kumar-t9UpW8MUmtw-unsplash.jpg",
    "public/backgrounds/martin-adams-y1M0dZ-1Psc-unsplash.jpg"
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
        <h5 class="bookmark-title smooth px-0 py-2" data-bs-toggle="collapse" data-bs-target="#folder${id}" aria-expanded="false" aria-controls="folder${id}">
            ${title}
        </h5>
        <div id="folder${id}" class="accordion-collapse collapse smooth">
            <div class="accordion-body">
                ${rendered.join('')}
            </div>
        </div>
    </div>
    `;
}
// toggles a class
function toggle(elem, cls) {
    return elem.classList.toggle(cls);
}
// sets a randome background image
function random_background() {
    let randIndex = Math.floor(Math.random() * bg_images.length);
    document.body.style.background = `url("${bg_images[randIndex]}")`;
    document.body.style.backgroundSize = "cover";
}
// renders a single daily link
function render_link(linkObj) {
    return `
        <div class="d-link smooth ${linkObj.visited ? "visited" : ""}">
            <a target="_blank" for="${linkObj.name}" href="${linkObj.url}">${linkObj.name}</a>
            <span id="${linkObj.name}">X</span>
        </div>
    `;
}
// renders daily links
function render_links(links) {
    // empty array for rendered html
    const rendered = [];
    // render link html for all of the links
    for (let linkObj of links)
        rendered.push(render_link(linkObj));
    return rendered.join('');
}
function load_daily_links() {
    // push sample url if localstorage is empty
    if (!localStorage.links)
    {
        const sample = [{
            name: "New tab",
            url: "#",
            visited: true
        }];
        localStorage.setItem("links", JSON.stringify(sample));
    }
    // geting links from the localstorage
    const local_links = JSON.parse(localStorage.links);
    // writing html to the container
    links_container.innerHTML = render_links(local_links);
    // handle remove button event here
    const daily_links = document.querySelectorAll(".d-link a");
    daily_links.forEach(link => {
        link.addEventListener("click", e => {
            // get localstorage
            const name = link.getAttribute("for");
            const links = JSON.parse(localStorage.links);
            let found = false;
            let index;
            // checking for the url in localstorage
            for (index in links)
                if (links[index].name == name)
                {
                    found = true;
                    links[index].visited = true;
                    break;
                }
            localStorage.setItem("links", JSON.stringify(links));
            load_daily_links();
        });
    });
    // handle daily link button event here
    const remove_btns = document.querySelectorAll(".d-link span");
    remove_btns.forEach(btn => {
        btn.addEventListener("click", e => {
            remove_link(btn.id);
        });
    });
}
// insert a link to localstorage
function insert_link(name, url) {
    // get localstorage
    const links = JSON.parse(localStorage.links);
    // generate new link
    const new_link = {
        name: name,
        url: url,
        visited: false
    };
    // push the link
    links.push(new_link);
    // write to the localStorage
    localStorage.setItem("links", JSON.stringify(links));
    // reload the links
    load_daily_links();
}
// remove a link from localstorage
function remove_link(name) {
    const links = JSON.parse(localStorage.links);
    let found = false;
    let index;
    // checking for the url in localstorage
    for (index in links)
        if (links[index].name == name)
        {
            found = true;
            break;
        }
    if (found)
    {
        // remove the item 
        links.splice(index, 1);
        // write the new links again
        localStorage.setItem("links", JSON.stringify(links));
        load_daily_links();
    } else {
        console.error("That item is not in the localstorage.");
    }
}
// handle creating new links event
function handle_new_link() {
    newLink_btn.addEventListener("click", e => {
        toggle(newLink_form, "collapse");
    });
    cancelNewLink_btn.addEventListener("click", e => {
        e.stopPropagation();
        newLink_form["name"].value = "";
        newLink_form["url"].value = "";
        toggle(newLink_form, "collapse");
    });
    addNewLink_btn.addEventListener("click", e => {
        e.stopPropagation();
        const name = newLink_form["name"].value;
        const url = newLink_form["url"].value;
        // check if inputs are ok
        if (!name || !url)
            alert("Please fill out the form first");
        else if (name.length > 20)
            alert("Name exceeds the limit");
        else insert_link(name, url);
    });
}
function init_local_storage() {
    const curr_day = date.getDay();
    const local_day = localStorage.today;
    // reset daily link state
    if (!local_day || local_day != curr_day)
    {
        localStorage.setItem("today", curr_day);
        // reset daily link visited status
        const links = JSON.parse(localStorage.links);
        for (let link of links) {
            link.visited = false;
        }
        localStorage.setItem("links", JSON.stringify(links));
    }
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
    
    // bookmarks toggle
    bookmark_button.addEventListener("click", e => {
        toggle(bookmark_List, "list-appear");
    });
    bookmark_secrectButton.addEventListener("mouseover", e => {
        toggle(bookmark_List, "list-appear");
    });
    
    // daily links toggle
    links_button.addEventListener("click", e => {
        toggle(daily_list, "d-list-appear");
    });
    links_secrectButton.addEventListener("mouseover", e => {
        toggle(daily_list, "d-list-appear");
    });

    // reset localstorage day
    init_local_storage();
    // load daily links
    load_daily_links();
    // handle daily link
    handle_new_link();
    
    // display the page
    document.body.style.opacity = 0;
    document.body.style.opacity = 1;
};