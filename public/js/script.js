// elements
const 
element_day = document.querySelector("#day"),
element_date = document.querySelector("#date");

// globals
const 
days = ["Saturday", "Sunday", "Monday", "Tuesday", "Thursday", "Wednesday", "Friday"],
date = new Date(),
index = date.getDay();

// main function
window.onload = (e) => {
    
    // direct dom manipulation
    element_day.innerHTML = days[index];
    element_date.innerHTML = 
        date.getMonth() + 1 + "/" +
        date.getDate() + "/" + 
        date.getFullYear();
    
    // display the page
    document.body.style.opacity = 0;
    document.body.style.opacity = 1;
};