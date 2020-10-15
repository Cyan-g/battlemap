const entityName = document.querySelector("#newEntity");
const entityInit = document.querySelector("#init");
const clearInitBtn = document.querySelector("#init-clear");

const newEnemyBtn = document.querySelector("#enemy");
const newAllyBtn = document.getElementById("ally");
const newObjectBtn = document.getElementById("object");
const deleteBtn = document.getElementById("delete");
const saveMapBtn = document.getElementById("save");
const clearBtn = document.getElementById("clear");
const elements = document.querySelectorAll(".element");

let tool = "";

var row = 0;
var col = 0;

  //CREATE VIRTUAL ARRAY
grid = new Array(10);

for (var i = 0; i < grid.length; i++) { 
    grid[i] = new Array(10); 
} 
  
for (var i = 0; i < 10; i++) { 
    for (var j = 0; j < 10; j++) { 
        grid[i][j] = new Field(i,j,undefined);
    } 
} 



//FUNCTIONS

//update grid from array AND HANDLE MOVEMENT
function gridLoad(){
    grid.forEach( line => {
        line.forEach(tile =>{
            if (tile.content instanceof UIObject){
                tile.field.style.background = "black";
                tile.field.textContent = "";
                tile.buttons = undefined;

            }else if(tile.content instanceof Ally){
                tile.field.style.color = "white";

                tile.buttons = new MoveButtons();
                tile.field.appendChild(tile.buttons.up);
                tile.field.appendChild(tile.buttons.right);
                tile.field.appendChild(tile.buttons.down);
                tile.field.appendChild(tile.buttons.left);

                tile.display = new Display(`${tile.content.name.slice(0,1)}${tile.content.name.slice(-1)}`);
                tile.field.appendChild(tile.display.item);
                tile.display.item.style.background = "green";

            }else if(tile.content instanceof Enemy){
                tile.field.style.color = "white";
                tile.buttons = new MoveButtons();

                tile.field.appendChild(tile.buttons.up);
                tile.field.appendChild(tile.buttons.right);
                tile.field.appendChild(tile.buttons.down);
                tile.field.appendChild(tile.buttons.left);

                tile.display = new Display(`${tile.content.name.slice(0,1)}${tile.content.name.slice(-1)}`);
                tile.field.appendChild(tile.display.item);
                tile.display.item.style.background = "red";

            }else{
                    tile.field.style.color = "black";
                    tile.field.style.background = "white";
                    tile.field.textContent = "";
            }
        });
    });
    
    sortInit();
    //BUTTON MOVE HANDLING
    const moveBtns = document.querySelectorAll(".moveButton");

    if (moveBtns.length > 0){
        moveBtns.forEach(movebtn =>{
            movebtn.addEventListener("click",function(e){

                row = parseInt(e.target.parentNode.className.slice(-1));
                col = parseInt(e.target.parentNode.className.slice(11,12));
                let currentField = grid[row][col].content;
                
                //UP
                if(e.target.classList.contains("up")){
                    if(row==0){
                        alert("Can't move there");
                        return;
                    }

                    let targetField = grid[row-1][col].content;

                    if (targetField === undefined){
                        let buffer = targetField;
                        grid[row-1][col].content = currentField;
                        grid[row][col].content = targetField;
                        
                    }else{
                        alert("Can't move there");
                    }
                }

                //RIGHT
                if(e.target.classList.contains("right")){
                     if(col==9){
                        alert("Can't move there");
                        return;
                    }

                    let targetField = grid[row][col+1].content;
                    
                    if (targetField === undefined){
                        let buffer = targetField;
                        grid[row][col+1].content = currentField;
                        grid[row][col].content = targetField;
                        
                    }else{
                        alert("Can't move there");
                    }
                    
                }

                //DOWN
                if(e.target.classList.contains("down")){
                    if(row==9){
                        alert("Can't move there");
                        return;
                    }

                    let targetField = grid[row+1][col].content;
                    
                    if (targetField === undefined){
                        let buffer = targetField;
                        grid[row+1][col].content = currentField;
                        grid[row][col].content = targetField;
                        
                    }else{
                        alert("Can't move there");
                    }
                    
                }

                //LEFT
                if(e.target.classList.contains("left")){
                    if(col==0){
                        alert("Can't move there");
                        return;
                    }

                    let targetField = grid[row][col-1].content;
                    
                    if (targetField === undefined){
                        let buffer = targetField;
                        grid[row][col-1].content = currentField;
                        grid[row][col].content = targetField;
                        
                    }else{
                        alert("Can't move there");
                    }
                    
                }

            })
        })
    }
}

function sortInit(){
        var list = document.querySelector('.collection');

    var items = list.childNodes;
    var itemsArr = [];
    for (var i in items) {
        if (items[i].nodeType == 1) { // get rid of the whitespace text nodes
            itemsArr.push(items[i]);
        }
    }

    itemsArr.sort(function(a, b) {
    return a.innerHTML == b.innerHTML
            ? 0
            : (a.innerHTML.slice(-2,-1) > b.innerHTML.slice(-2,-1) ? -1 : 1);
    });

    for (i = 0; i < itemsArr.length; ++i) {
    list.appendChild(itemsArr[i]);
}
}

//delete content by grid coordinate
function contentDelete(line,tile){
    if (grid[line][tile].content != undefined){
        if (grid[line][tile].content.item != undefined){
        grid[line][tile].content.item.remove();
        }
    grid[line][tile].content = undefined;
    }

    gridLoad();
}

//check for unique EntityName
function checkUnique(name){
    let unique = true;
    grid.forEach( line => {
        line.forEach( tile =>{
            row = grid.indexOf(line);
            col = line.indexOf(tile);
            if (grid[row][col].content != undefined){
                if (grid[row][col].content.name != undefined){
                    if ((grid[row][col].content.name) === name){
                        unique = false;
                        
                        alert("Entity Names must be unique")
                        
                    }
                }
            }
        });
    });

    return unique;
}

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


// CONSTRUCTORS
function Field(row,col,content){
    this.field = document.querySelector(`.field${i}.col${j}`);
    this.content = content;
    this.buttons = undefined;
}

function UIObject(){
    this.name = "wall";
}

function Enemy(name,init){

    this.name = name;
    this.init = init;
    
    this.item = document.createElement("li");
    this.item.className = "list-item";
    this.item.appendChild(document.createTextNode(`${name} \n init: ${init}`));
    document.querySelector(".collection").appendChild(this.item);

    entityInit.value = "";
    entityName.value = "";
    
}

function Ally(name,init){

        this.name = name;
        this.init = init;
        
        this.item = document.createElement("li");
        this.item.className = "list-item";
        this.item.appendChild(document.createTextNode(`${name}\n init: ${init}`));
        document.querySelector(".collection").appendChild(this.item);

    entityInit.value = "";
    entityName.value = "";
    
}

function MoveButtons(){
    this.up = document.createElement("div");
    this.up.className = "moveButton up";

    this.right = document.createElement("div");
    this.right.className = "moveButton right";

    this.down = document.createElement("div");
    this.down.className = "moveButton down";

    this.left = document.createElement("div");
    this.left.className = "moveButton left";
}

function Display(text){
    this.item = document.createElement("p");
    this.item.className = "display"; 
    this.item.textContent = text;
}



// INTERACTION HANDLER
grid.forEach( line => {
    line.forEach( tile =>{
        tile.field.addEventListener("click",function(ev){
            gridLoad();
            row = grid.indexOf(line);
            col = line.indexOf(tile);
            
            switch(tool) {

                case "delete":
                    contentDelete(row,col);
                    gridLoad();
                break;
    
                case "enemy":
                     if(entityInit.value === undefined || entityName.value === ""){
                        alert("Enter Entity Data");
                        break;
                    }
                    if(parseInt(entityInit.value) < 1){
                        alert("Initiative needs to be bigger than 0")
                        break;
                    }

                    if (checkUnique(entityName.value)){
                        contentDelete(grid.indexOf(line),line.indexOf(tile));
                        tile.content = new Enemy(entityName.value,entityInit.value);
                    }
                    gridLoad();
                    tool = "";
                    buttonSelect();
                    
                      entityName.textContent = "";
                      entityInit.textContent = "";
                break;
    
                case "ally":
                    if(entityInit.value === undefined || entityName.value === ""){
                        alert("Enter Entity Data");
                        break;
                    }
                    if(parseInt(entityInit.value) < 1){
                        alert("Initiative needs to be bigger than 0")
                        break;
                    }
                    if (checkUnique(entityName.value)){
                        contentDelete(grid.indexOf(line),line.indexOf(tile));
                        tile.content = new Ally(entityName.value,entityInit.value);
                    }
                    gridLoad();
                    tool = "";
                    buttonSelect();
                    entityName.textContent = "";
                    entityInit.textContent = "";

                break;
    
                case "object":
                    contentDelete(grid.indexOf(line),line.indexOf(tile));
                    tile.content = new UIObject();
                    gridLoad();
                break;
    
                default:
    
                break;
            }
        })
    })
})

// EVENT LISTENERS
function loadEventListeners(){

    //TOOL DESELECTING BY CLICKING OUT
    document.querySelector("body").addEventListener("click",function(e){
        if ((e.target.classList.contains("element") === false)&&(e.target.classList.contains("button") === false)){
            tool = "";
            buttonSelect();
        }
    })
    
    // CREATE ENEMY
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
        grid.forEach( line => {
            line.forEach( tile =>{
                contentDelete(grid.indexOf(line),line.indexOf(tile));
        })})
        gridLoad();
    });
}

loadEventListeners();