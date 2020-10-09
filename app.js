
const newEnemyBtn = document.querySelector("#enemy");
const newAllyBtn = document.getElementById("ally");
const newObjectBtn = document.getElementById("object");
const deleteBtn = document.getElementById("delete");
const saveMapBtn = document.getElementById("save");
const clearBtn = document.getElementById("clear");

let fields = document.querySelectorAll(".element");
let row = 0;
let col = 0;
let tool = "";


// Field Actions
function Object(row,col){
    this.position =[row,col];
}

function Enemy(row,col){
    this.position =[row,col];
}

function Ally(row,col){
    this.position =[row,col];
}

//  Field Interaction Handler

fields.forEach( field => {
    field.addEventListener("click",function(ev){
        row = (ev.currentTarget.className.slice(-1));
        col = (ev.target.parentNode.id.slice(-1));
        let field = document.querySelector(`.field${row}.col${col}`);

        console.log(`row:${row} col:${col}`);

        //Event BRANCHING
        switch(tool) {

            case "delete":
                field.textContent = "";
                field.style.color = "black";
                field.style.background = "white";
            break;

            case "enemy":
                field.textContent = "E";
                field.style.color = "red";
                field.style.background = "white";
            break;

            case "ally":
                field.textContent = "A";
                field.style.color = "green";
                field.style.background = "white";
            break;

            case "object":
                field.textContent = "";
                field.style.background = "black";
            break;

            default:

            break;
        }
    });
});


//   TOOL HIGHLIGHTING
function buttonSelect(){

    var toolbar = document.querySelectorAll(".button");
 
    toolbar.forEach(currentBtn =>{
        
        currentBtn.parentNode.classList.remove("selected");
        if (currentBtn.id === `${tool}`){
            currentBtn.parentNode.classList.add("selected");
        }
    });
}

//// CLICK LISTENERS
//  DELETE OBJECT
deleteBtn.addEventListener("click",function(e){
    tool = "delete";
    buttonSelect();
});

// CREATE ENEMY
newEnemyBtn.addEventListener("click",function(e){
    tool = "enemy";
    buttonSelect();
});

// CREATE ALLY
newAllyBtn.addEventListener("click",function(e){
    //console.log(e.target.classList);
    tool = "ally";
    buttonSelect();
});

// CREATE OBJECT
newObjectBtn.addEventListener("click",function(){
    tool = "object";
    buttonSelect();
});

// CLEAR FIELD
clearBtn.addEventListener("click",function(){
    tool = "";
    buttonSelect();
    fields.forEach(field =>{
        field.textContent = "";
        field.style.color = "black";
        field.style.background = "white";
    })
});