const addBtns = document.querySelectorAll(".add-btn:not(.solid)");
const saveItemBtns = document.querySelectorAll(".solid");
const addItemContainers = document.querySelectorAll(".add-container");
const addItems = document.querySelectorAll(".add-item");

const itemLists = document.querySelectorAll(".drag-item-list");
const backlogList = document.getElementById("backlog-list");
const progressList = document.getElementById("progress-list");
const completeList = document.getElementById("complete-list");
const onHoldList = document.getElementById("on-hold-list");

let updatedOnLoad = false;


let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];
let listArrays = [];

let draggedItem;
let currentColumn;
let dragging = false;

function getSavedColumns() {
  if (localStorage.getItem("backlogItems")) {
    backlogListArray = JSON.parse(localStorage.backlogItems);
    progressListArray = JSON.parse(localStorage.progressItems);
    completeListArray = JSON.parse(localStorage.completeItems);
    onHoldListArray = JSON.parse(localStorage.onHoldItems);
  } else {
    backlogListArray = [];
    progressListArray = [];
    completeListArray = [];
    onHoldListArray = [];
  }
}


function updateSavedColumns() {
  listArrays = [
    backlogListArray,
    progressListArray,
    completeListArray,
    onHoldListArray,
  ];
  const arrayNames = ["backlog", "progress", "complete", "onHold"];
  arrayNames.forEach((arr, i) => {
    localStorage.setItem(`${arr}Items`, JSON.stringify(listArrays[i]));
  });
}

function filterArray(array) {
  const filteredArray = array.filter(item => item !== null);
  return filteredArray;
}

function createItemEl(columnEl, column, item, index) {

  const listEl = document.createElement("li");
  listEl.classList.add("drag-item");
  listEl.textContent = item;
  listEl.draggable = true;
  listEl.setAttribute("ondragstart", "drag(event)");
  listEl.contentEditable = true;
  listEl.id = index;
  listEl.setAttribute('onfocusout', `updateItem(${index}, ${column})`)
  columnEl.appendChild(listEl);
}

function createColumns(list, ListArray, index) {
  list.textContent = "";
  ListArray.forEach((item, i) => {
    createItemEl(list, index, item, i);
  });
}


function updateDOM() {

  if (!updatedOnLoad) {
    getSavedColumns();
  }

  createColumns(backlogList, backlogListArray, 0);
  backlogListArray = filterArray(backlogListArray);

  createColumns(progressList, progressListArray, 1);
  progressListArray = filterArray(progressListArray);

  createColumns(completeList, completeListArray, 2);
  completeListArray = filterArray(completeListArray);

  createColumns(onHoldList, onHoldListArray, 3);
  onHoldListArray = filterArray(onHoldListArray);

  updatedOnLoad = true;
  updateSavedColumns();
}

function updateItem(id, column) {
  const selectedArray = listArrays[column];
  const selectedColumnEl = itemLists[column].children;
  if(!dragging) {
    if(!selectedColumnEl[id].textContent) {
      delete selectedArray[id];
    } else {
      selectedArray[id] = selectedColumnEl[id].textContent;
    }
    updateDOM()
  }
}

function addtoColumn(column) {
  const itemText = addItems[column].textContent;
  const selectedArray = listArrays[column];
  selectedArray.push(itemText);
  addItems[column].textContent = '';

  updateDOM()
}

function showInputBox(column) {
  addBtns[column].style.visibility = 'hidden';
  saveItemBtns[column].style.display = 'flex';
  addItemContainers[column].style.display = 'flex';
}

function hideInputBox(column) {
  addBtns[column].style.visibility = 'visible';
  saveItemBtns[column].style.display = 'none';
  addItemContainers[column].style.display = 'none';
  addtoColumn(column);
}

function rebuildArrays() {
  backlogListArray = Array.from(backlogList.children).map(i => i.textContent);
  progressListArray = Array.from(progressList.children).map(i => i.textContent);
  completeListArray = Array.from(completeList.children).map(i => i.textContent);
  onHoldListArray = Array.from(onHoldList.children).map(i => i.textContent);

  updateDOM();
}

function drag(event) {
  draggedItem = event.target;
  dragging = true
}

function allowDrop(event) {
  event.preventDefault();
}

function dragEnter(column) {
  itemLists[column].classList.add("over");
  currentColumn = column;
}

function drop(event) {
  event.preventDefault();
  itemLists.forEach((column) => {
    column.classList.remove("over");
  });
  const parent = itemLists[currentColumn];
  parent.appendChild(draggedItem);
  rebuildArrays();
  dragging = false;
}

updateDOM();
