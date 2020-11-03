//GRID SIZING
reSize(10,10);

colsInput.value = grid.length;
rowsInput.value = grid[0].length;

function reSize(newCols,newRows){

    if(newCols < 1 || newRows < 1){
        alert("The map needs atleast 1 Tile");
        colsInput.value = grid.length;
        rowsInput.value = grid[0].length;
        return;
    }
    //FIX GRID SIZE
    while (grid[0].length < newRows){
        addRow();
        rows++;
    }

    while (grid[0].length > newRows){
        rows--;
        delRow();
    }

    while (grid.length < newCols){
        addCol();
        cols++;
    }
    while (grid.length > newCols){
        cols--;
        delCol();
    }

    gridLoad();
}

function addCol(){
    console.log("add col");
    grid.push(new Array(grid[0].length));
    template += " auto";
    width += 70;
    let newCol = document.createElement("div");
    newCol.className = `col${grid.length-1}`;
    UiGrid.appendChild(newCol);

        for (row = 0; row <= grid[0].length-1; row++){
            let newField = document.createElement("div");
            newField.className = `element col${grid.length-1} field${row}`;
            newField.tabIndex = "1";
            newCol.appendChild(newField);
            grid[grid.length-1][row] = new Field(row,grid.length-1,null);
            interactionEvent(grid[grid.length-1],grid[grid.length-1][row]);
        }
}

function delCol(){
    console.log("del col");
    let row = 0;
    while (row <= rows-1){
        contentDelete(cols,row);
        row++;
    }
    document.querySelector(`.col${cols}`).remove();
    width -= 70;
    template = template.slice(0,-5);
    grid.pop();
    console.log(grid);
}

function addRow(){
    let col = 0;
    console.log("add row");
    let row = grid[0].length;
    while (col < grid.length ){
        let newField = document.createElement("div");
        newField.className = `element col${col} field${row}`;
        newField.tabIndex = "1";
        document.querySelector(`.col${col}`).appendChild(newField);
        grid[col].push(new Field(row,col,null));
        interactionEvent(grid[col],grid[col][row]);
        col++;
    }
    
}

function delRow(){
    console.log("del row");
    let col = 0;
    while(col <= cols-1 ){
        contentDelete(col,rows);
        document.querySelector(`.element.col${col}.field${rows}`).remove();
        grid[col].pop();
        col++;
    }
    console.log(grid);
}