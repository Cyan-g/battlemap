//======================================INITIALIZE VARIABLES
const entityName = document.querySelector("#newEntity");
const entityInit = document.querySelector("#init");
const clearInitBtn = document.querySelector("#init-clear");

//TOOLS HTML
const newEnemyBtn = document.querySelector("#enemy");
const newAllyBtn = document.getElementById("ally");
const newObjectBtn = document.getElementById("object");
const deleteBtn = document.getElementById("delete");
const saveMapBtn = document.getElementById("save");
const clearBtn = document.getElementById("clear");
const closePopup = document.getElementById("closePopup");
const popup = document.querySelector(".popup");
const mapName = document.querySelector("#newSave");
const mapSubmit = document.querySelector("#submit-save");

//UI GRID HTML
const UiGrid = document.querySelector(".grid");
const UIbody = document.querySelector("body");
const reSizeBtn = document.getElementById("reSize");
const colsInput = document.getElementById("colsInput");
const rowsInput = document.getElementById("rowsInput");
const closeReSize = document.getElementById("closeReSize"); 

const numberPattern = /\d+/g;
const letterPattern = /\D/;
const selectPattern = /((col\d+)|(button)|(grid))/;

let tool = "";

var row = 0;
var col = 0;
var template = "auto";
var width = 70;
var cols = 1;
var rows = 1;

var saves = [];
var grid = new Array(1);
grid[0] =  new Array(1);
grid[0][0] = new Field(0,0,null);

//==================================================================

//FUNCTIONS

//update grid from array AND HANDLE MOVEMENT
function gridLoad(){

    //GENERATE HTML CONTENTS FROM VIRTUAL ARRAY
    document.querySelector(".collection").innerHTML = ""; //TURN ORDER LIST REWRITING
    grid.forEach((column,colindex) => {
        column.forEach((tile,index) =>{
            tile.field = document.querySelector(`.element.col${colindex}.field${index}`);
            tile.field.innerHTML = "";
            if(tile.content){
                if (!(tile.content.init)){
                    tile.field.style.background = "black";
                    tile.field.textContent = "";
                    tile.buttons = null;
    
                }else if(tile.content.init){
                    tile.field.style.color = "white";
                    tile.field.style.background = "white";
    
                    tile.buttons = new MoveButtons();
                    tile.field.appendChild(tile.buttons.up);
                    tile.field.appendChild(tile.buttons.right);
                    tile.field.appendChild(tile.buttons.down);
                    tile.field.appendChild(tile.buttons.left);
    
                    newItem = document.createElement("li");
                    newItem.className = "list-item";
                    newItem.appendChild(document.createTextNode(`${tile.content.name} \n init: ${tile.content.init}`));
                    document.querySelector(".collection").appendChild(newItem);
    
                    tile.display = new Display(`${tile.content.name.slice(0,1)}${tile.content.name.slice(-1)}`);
                    tile.field.appendChild(tile.display.item);
                    tile.display.item.style.background = tile.content.colour;
                    
                    tile.buttons.up.style.fontSize = (tile.field.clientWidth)/3;
                    tile.buttons.down.style.fontSize = (tile.field.clientWidth)/3;
                    tile.buttons.left.style.fontSize = (tile.field.clientWidth)/3;
                    tile.buttons.right.style.fontSize = (tile.field.clientWidth)/3;
                }
            }

            else{
                    tile.field.style.color = "black";
                    tile.field.style.background = "white";
                    tile.field.textContent = "";
                    if(tile.buttons){tile.buttons = null}
            }
        });
    });
    
    //ADJUST UI CHANGES
    UiGrid.style.gridTemplateColumns = template;
    UiGrid.style.minWidth = `${width}px`;
    UIbody.style.minWidth = `${width * 1.4}px`;
    sortInit();
    //BUTTON MOVE HANDLING
    const moveBtns = document.querySelectorAll(".moveButton");

    if (moveBtns.length > 0){
        moveBtns.forEach(movebtn =>{
            movebtn.addEventListener("click",function(e){

                row = parseInt(e.target.parentNode.className.match(numberPattern)[0]);
                col = parseInt(e.target.parentNode.className.match(numberPattern)[1]);
                let currentField = grid[row][col].content;
                
                //UP
                if(e.target.classList.contains("up")){
                    if(col==0){
                        alert("Can't move there");
                        return;
                    }

                    let targetField = grid[row][col-1].content;

                    if (targetField === null){
                        let buffer = targetField;
                        grid[row][col-1].content = currentField;
                        grid[row][col].content = targetField;
                        
                    }else{
                        alert("Can't move there");
                    }
                }

                //RIGHT
                if(e.target.classList.contains("right")){
                     if(row==grid.length){
                        alert("Can't move there");
                        return;
                    }

                    let targetField = grid[row+1][col].content;
                    
                    if (targetField === null){
                        let buffer = targetField;
                        grid[row+1][col].content = currentField;
                        grid[row][col].content = targetField;
                        
                    }else{
                        alert("Can't move there");
                    }
                    
                }

                //DOWN
                if(e.target.classList.contains("down")){
                    if(col==grid[0].length){
                        alert("Can't move there");
                        return;
                    }

                    let targetField = grid[row][col+1].content;
                    
                    if (targetField === null){
                        let buffer = targetField;
                        grid[row][col+1].content = currentField;
                        grid[row][col].content = targetField;
                        
                    }else{
                        alert("Can't move there");
                    }
                    
                }

                //LEFT
                if(e.target.classList.contains("left")){
                    if(row==0){
                        alert("Can't move there");
                        return;
                    }

                    let targetField = grid[row-1][col].content;
                    
                    if (targetField === null){
                        let buffer = targetField;
                        grid[row-1][col].content = currentField;
                        grid[row][col].content = targetField;
                        
                    }else{
                        alert("Can't move there");
                    }
                    
                }

            })
        })
    }

    saveList();
    console.log(grid);
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
            : (a.innerHTML.match(numberPattern)[-1] > b.innerHTML.match(numberPattern)[-1] ? -1 : 1);
    });

    for (i = 0; i < itemsArr.length; ++i) {
    list.appendChild(itemsArr[i]);
}
}

//delete content by grid coordinate
function contentDelete(column,tile){
    if (grid[column][tile].content){
    grid[column][tile].content = null;
    }
}

//check for unique EntityName
function checkUnique(name){
    let unique = true;
    grid.forEach( column => {
        column.forEach( tile =>{
            row = grid.indexOf(column);
            col = column.indexOf(tile);
            if (grid[row][col].content != null){
                if (grid[row][col].content.name != null){
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
        
        currentBtn.classList.remove("selected");
        if (currentBtn.id === `${tool}`){
            currentBtn.classList.add("selected");
        }
    });
}

// CONSTRUCTORS


function Field(row,col,content){
    this.field = document.querySelector(`.field${row}.col${col}`);
    this.content = content;
    this.buttons = null;
}

function UIObject(){
    this.name = "wall";
}

function Enemy(name,init){

    this.name = name;
    this.init = init;
    this.colour = "red";

    entityInit.value = "";
    entityName.value = "";
    
}

function Ally(name,init){

    this.name = name;
    this.init = init;
    this.colour = "green";

    entityInit.value = "";
    entityName.value = "";
    
}

function MoveButtons(){
    this.up = document.createElement("div");
    this.up.className = "moveButton up fa fa-angle-double-up";

    this.right = document.createElement("div");
    this.right.className = "moveButton right fa fa-angle-double-right";

    this.down = document.createElement("div");
    this.down.className = "moveButton down fa fa-angle-double-down";

    this.left = document.createElement("div");
    this.left.className = "moveButton left fa fa-angle-double-left";
}

function Display(text){
    this.item = document.createElement("p");
    this.item.className = "display"; 
    this.item.textContent = text;
}



// INTERACTION HANDLER
function interactionEvent(column,tile){
    tile.field.addEventListener("click",function(){
        let col = column[0].field.className.match(numberPattern)[0];
        let row = tile.field.className.match(numberPattern)[1];
        switch(tool) {

            case "delete":
                contentDelete(col,row);
            break;
    
            case "enemy":

                if(entityInit.value == null || entityName.value == ""){
                    alert("Enter Entity Data");
                    break;
                }

                if(letterPattern.test(entityInit.value)){
                    alert("Initiative needs to be a number");
                    break;
                }
                if(parseInt(entityInit.value) < 0){
                    alert("Initiative needs to be atleast 0");
                    break;
                }
    
                if (checkUnique(entityName.value)){
                    contentDelete(col,row);
                    grid[col][row].content = new Enemy(entityName.value,entityInit.value);
                }
                tool = "";
                buttonSelect();
                
                  entityName.textContent = "";
                  entityInit.textContent = "";
            break;
    
            case "ally":
                if(entityInit.value == null || entityName.value == ""){
                    alert("Enter Entity Data");
                    break;
                }
                if(letterPattern.test(entityInit.value)){
                    alert("Initiative needs to be a number");
                    break;
                }
                if(parseInt(entityInit.value) < 0){
                    alert("Initiative needs to be atleast 0")
                    break;
                }
                if (checkUnique(entityName.value)){
                    contentDelete(col,row);
                    grid[col][row].content = new Ally(entityName.value,entityInit.value);
                    sortInit();
                }
                tool = "";
                buttonSelect();
                entityName.textContent = "";
                entityInit.textContent = "";
    
            break;
    
            case "object":
                contentDelete(col,row);
                grid[col][row].content = new UIObject();
            break;
    
            default:
    
            break;
        }
        gridLoad();
    })
}


// EVENT LISTENERS
function loadEventListeners(){

    //Field Click interaction events
    grid.forEach( column => {
        column.forEach( tile =>{
            interactionEvent(column,tile);
        })
    })

    //TOOL DESELECTING BY CLICKING OUT
    document.querySelector("body").addEventListener("click",function(e){
        if (!selectPattern.test(JSON.stringify(e.target.classList))){
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
        grid.forEach( column => {
            column.forEach( tile =>{
                contentDelete(grid.indexOf(column),column.indexOf(tile));
        })})
        gridLoad();
    });

    //MAP SAVE
    saveMapBtn.addEventListener("click",function(){
        popup.style.display = "block";
    });

    closePopup.addEventListener("click",function(){
        popup.style.display = "none";
    })

    mapSubmit.addEventListener("click",function(){
        saves.push(new Save(Date.now()));
        localStorage.setItem("saves",JSON.stringify(saves));
        console.log("current Saves");
        console.log(saves);
        saveList();
        gridLoad();
    });

    // GRID RESIZING FUNCTION
    reSizeBtn.addEventListener("click",function(){
        document.querySelector(".resizer").style.display = "block";
    }) 

    closeReSize.addEventListener("click",function(){
        document.querySelector(".resizer").style.display = "none";
    })

    rowsInput.addEventListener("blur",function(){
        if(letterPattern.test(rowsInput.value)){
            rowsInput.value = grid[0].length;
        }else{
            reSize(parseInt(colsInput.value),parseInt(rowsInput.value));
        }
    })

    colsInput.addEventListener("blur",function(){
        if(letterPattern.test(colsInput.value)){
            colsInput.value = grid.length;
        }else{
            reSize(parseInt(colsInput.value),parseInt(rowsInput.value));
        }
    })
}

loadEventListeners();
