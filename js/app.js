// CODE EXPLAINED channel

//Select Elements

const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const pluscircle = document.getElementById("pluscircle");


//Class name
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//Variables
let LIST, id;
// get item from local storage

let data = localStorage.getItem("TODO");
//check if data is not empty
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length; //SET THE ID TO THE LAST ONE ON THE LIST
    loadList(LIST); //load the list to the user interface
} else {
    //IF DATA IS NOT EMPTY
    LIST = [];
    id = 0;
}
//LOAD ITEMS TO THE UI
function loadList(array) {
    array.forEach(function(item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}
//clear the local storage
clear.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
})




//Show date
const today = new Date();
const Options = { weekday: "long", month: "short", day: "numeric" };
dateElement.innerHTML = today.toLocaleDateString("en-NG", Options)

//add todo function
function addToDo(toDo, id, done, trash) {

    if (trash) {
        return;
    }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `<li class="item">
    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
    <p class="text ${LINE}">${toDo}</p>
    <i class="fa fa-trash-o de" job="delete" id="0"></i>
    </li>
    `;
    const position = "beforeend"
    list.insertAdjacentHTML(position, item);
}

//add an item to the list when enter pressed

document.addEventListener("keyup", function(event) {
    if (event.keyCode == 13) {
        const toDo = input.value;
        if (toDo) {
            addToDo(toDo, id, false, false);
            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false,
            });

            //THIS CODE MUST BE ADDED WHERE LIST ARRAY IS UPDATED
            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++
        }
        input.value = "";
    }
})

//COMPLETE TODO
function completeTodo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

//remove todo
function removeTodo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}


// target the items created dynamically
list.addEventListener("click", function() {
    const element = event.target; // return clicked element inside list
    const elementJob = element.attributes.job.value; // complete or delete

    if (elementJob == "complete") {
        completeTodo(element);
    } else if (elementJob == "delete") {
        removeTodo(element);
    }

    //THIS CODE MUST BE ADDED WHERE LIST ARRAY IS UPDATED
    localStorage.setItem("TODO", JSON.stringify(LIST));

});
pluscircle.addEventListener("click", function(event) {
    if (event) {
        const toDo = input.value;
        if (toDo) {
            addToDo(toDo, id, false, false);
            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false,
            });

            //THIS CODE MUST BE ADDED WHERE LIST ARRAY IS UPDATED
            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++
        }
        input.value = "";
    }

})