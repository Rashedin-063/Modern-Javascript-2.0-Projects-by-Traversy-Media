const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;

function displayItems() {
  const storageItem = getItemFromLocalStorage();

  storageItem.forEach((item) => {
    addItem(item);
  });
  resetUI()
}

const mainFunction = (e) => {
  e.preventDefault();

  // validate input
  const newItem = itemInput.value;
  if (newItem === '') {
    alert('Please add an item');
    return;
  }

  // Check for edit mode
  if (isEditMode) {
    const itemToEdit = itemList.querySelector('.edit-mode');

    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove('edit-mode');
    itemToEdit.remove();
    isEditMode = false;
  } else {
    if (checkIfItemExists(newItem)) {
      alert('That item already exists!');
      return;
    }
  }

  // add Item to DOM
  addItem(newItem);

  // add item to local Storage
  addItemToLocalStorage(newItem);

  itemInput.value = '';

  resetUI();
};

function addItem(newItem) {
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(newItem));
  const button = createButton('remove-item btn-link text-red');

  li.appendChild(button);

  // add to the dom
  itemList.appendChild(li);

}

function addItemToLocalStorage(item) {
  let localStorageItems = getItemFromLocalStorage();

  localStorageItems.push(item);

  localStorage.setItem('items', JSON.stringify(localStorageItems));
}

function getItemFromLocalStorage() {
  let localStorageItems = [];

  const storedItems = localStorage.getItem('items');

  if (storedItems) {
    localStorageItems = JSON.parse(storedItems);
  }

  return localStorageItems;
}

const createButton = (classes) => {
  const button = document.createElement('button');
  button.className = classes;
  const icon = document.createElement('i');
  icon.classList = 'fa-solid fa-xmark';

  button.appendChild(icon);

  return button;
};

function onClickItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    removeItem(e.target.parentElement.parentElement)
  } else {
    setItemToEdit(e.target)
  }
}

function checkIfItemExists(item) {
  const itemsFromStorage = getItemFromLocalStorage();
  return itemsFromStorage.includes(item);
}

function setItemToEdit(item) {
isEditMode = true;

  // itemList.querySelectorAll('li').forEach(i => i.style.color = 'black')
  // item.style.color = 'gray'

  itemList
    .querySelectorAll('li')
    .forEach((i) => i.classList.remove('edit-mode'));

  item.classList.add('edit-mode');
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i>   Update Item';
  formBtn.style.backgroundColor = '#228B22';

  itemInput.value = item.textContent;
}

const removeItem = (item) => {
  if (confirm('Are you sure?')) {
    // remove item from DOM
    item.remove();

    // Remove item from storage
    removeItemFromStorage(item.textContent);

    resetUI();
  }
};

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemFromLocalStorage();

  // filter out item to be removed
  itemsFromStorage = itemsFromStorage.filter(i => i !== item);
  
  // reset the remaining items to the DOM
  localStorage.setItem('items', JSON.stringify(itemsFromStorage))
  
}

const clearItem = () => {
  // itemList.innerHTML = ''
  if (confirm('Are you sure?')) {
    while (itemList.firstChild) {
      itemList.removeChild(itemList.firstChild);
    }
  }

  localStorage.removeItem('items');

  resetUI();
};

const filterItem = (e) => {
  const items = itemList.querySelectorAll('li');
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();
    // const itemName = item.innerText;

    if (itemName.includes(text)) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
};

const resetUI = () => {
  itemInput.value = '';

  const items = itemList.querySelectorAll('li');

  if (items.length === 0) {
    itemFilter.style.display = 'none';
    clearBtn.style.display = 'none';
  } else {
    itemFilter.style.display = 'block';
    clearBtn.style.display = 'block';
  }

  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  formBtn.style.backgroundColor = '#333';

  isEditMode = false;
};

// add event listener
// Initialize app

function init() {
  itemForm.addEventListener('submit', mainFunction);
  itemList.addEventListener('click', onClickItem);
  clearBtn.addEventListener('click', clearItem);
  itemFilter.addEventListener('input', filterItem);
  document.addEventListener('DOMContentLoaded', displayItems);

  resetUI();
}

init()
