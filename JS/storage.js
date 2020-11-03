//Save managing
function loadSave(newGrid){

    reSize(newGrid.length,newGrid[0].length)

    grid = new Array(cols);

    for(col = 0; col <= cols-1;col++){
        grid[col] = Object.assign(new Array,newGrid[col]);
    }
    for(col = 0; col <= cols-1;col++){
        for(row = 0; row < rows;row++){
            grid[col][row] = Object.assign(new Field,newGrid[col][row]);
            
        }
    }
    colsInput.value = grid.length;
    rowsInput.value = grid[0].length;
    gridLoad();
}

window.addEventListener("load",function(){
    if(JSON.parse(localStorage.getItem("saves"))){
        saves = Object.assign(JSON.parse(localStorage.getItem("saves")));
    }
    saveList();
})

function removeSave(index){
    document.getElementById(`${saves[index].ID}`).remove();
    saves[index] = null;
    saves.splice(index, 1);
    localStorage.setItem("saves",JSON.stringify(saves));
    saveList();
}

function saveList(){
    document.querySelector(".maplist").innerHTML = `<h5>Saves</h5>`;

    saves.forEach(save =>{
        newItem = document.createElement("div");
        newItem.className = `list-item`;
        newItem.id = `${save.ID}`;

        newDelBtn = document.createElement("div");
        newDelBtn.className = "list-delete";
        newDelBtn.textContent = "X";
        newDelBtn.id = `${save.ID}`;

        newLoadBtn = document.createElement("div");
        newLoadBtn.className = "list-load";
        newLoadBtn.id = `${save.ID}`;
        
        newItem.appendChild(newDelBtn);
        newItem.appendChild(newLoadBtn);

        newLoadBtn.addEventListener("click",function(e){
            console.log(saves.findIndex(save => save.ID == e.target.id));
            loadSave(saves[saves.findIndex(save => save.ID == e.target.id)].loadout);
        })

        newDelBtn.addEventListener("click",function(e){
            removeSave(saves.findIndex(save => save.ID == e.target.id));
        })

        newItem.appendChild(document.createTextNode(save.name));
        document.querySelector(".maplist").appendChild(newItem);
    })
}


function Save(ID){

    if(mapName.value=="" || mapName.value.length > 13){
        alert("Please enter a name for your map between 1 and 13 characters");
    }else{
        this.ID = ID;
        this.name = mapName.value;
        this.loadout = new Array(cols);
        //DEEP COPY GRID
        for(col = 0; col <= cols-1;col++){
            this.loadout[col] = Object.assign(new Array,grid[col]);
            }
        for(col = 0; col <= cols-1;col++){
            for(row = 0; row <= rows-1;row++){
                this.loadout[col][row] = Object.assign(new Field,grid[col][row]);
            }
        }

        mapName.value= "";
        popup.style.display = "none";
        console.log(saves);
    }
}