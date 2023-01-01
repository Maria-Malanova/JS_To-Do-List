const clear = document.querySelector('.clear');
const dateElement = document.getElementById('date');
const list = document.getElementById('list');
const input = document.getElementById('input');

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "LineThrough";

// Variables
let LIST = [], id = 0;

// get item from localstorage
let data = localStorage.getItem("TODO");
// check if data is not empty 
if(data) {
    LIST = JSON.parse(data);
    id = LIST.length; // set the id to the last one in the list
    loadList(LIST); // load the list to the user 
} else {
    LIST = [];
    id = 0;
}

// load items to the users interface
function loadList(array) {
    array.forEach(function(item) {
        addToDo(item.name, item.id, item.done, item.trash)});
    };

// clear the local storage
clear.addEventListener('click', function() {
    localStorage.clear();
    location.reload();
})

// Show today date
const options = {weekday: "long", month: "short", day: "numerric"};
const today = new Date();
dateElement.innerHTML = today.toDateString("en-us", options);

// Add to do function
function addToDo(toDo, id, done, trash) {

    if (trash) {return; }

    const DONE = done ? CHECK : UNCHECK; 
    const LINE = done ? LINE_THROUGH : "";

    const item = `
    <li class="item">
    <div class="box-item">
       <i class="fa co ${DONE}" job="complete" id="${id}"></i>
       <p class="text ${LINE}">${toDo}</p>
    </div>
    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
    </li>
    `
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}

// Add element in the list when user enter key
const keyClick = document.querySelector('.fa-plus-circle');
keyClick.addEventListener('click', function() {
        const toDo = input.value;
        if(toDo) {
            addToDo(toDo, id, false, false);
            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false,
            });

            // get item from localstorage
            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
    }
    input.value = "";
})


// complete to do
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH);
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// remove to do
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}

// target the items created dinamic
list.addEventListener('click', function(event) {
    const element = event.target; //return clickend element inside list
    const elementJob = element.attributes.job.value; // complete or delete
    if(elementJob == 'complete') {
        completeToDo(element);
    } else if(elementJob == 'delete') {
        removeToDo(element);
    }
    // get item from localstorage
    localStorage.setItem("TODO", JSON.stringify(LIST));
})

