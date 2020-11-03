//======================================INITIALIZE VARIABLES
const entityName = document.querySelector("#newEntity");
const entityInit = document.querySelector("#init");

//TOOLS HTML
const newEntityBtn = document.querySelector("#entity");
const entitySubmit = document.querySelector("#entitySubmit");
const entityPopup = document.querySelector(".entityDetail");
const entitColor = document.querySelector("#entityColor");
const closeEntity = document.getElementById("closeEntityDetail");

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
const letterPattern = / \D/;
const selectPattern = /((col\d+)|(button)|(grid))/;

let tool = "";

var selectedRow = 0;
var selectedCol = 0;
var row = 0;
var col = 0;
var template = "auto";
var width = 70;
var cols = 1;
var rows = 1;
 
var saves = [];
var grid = new Array(1);
grid[0] =  new Array(1);

//==================================================================