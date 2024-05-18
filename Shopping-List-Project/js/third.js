const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');

function displayItems() {
  const itemFromStorage = getItemFromLocalStorage();

  itemFromStorage.forEach((item) => {
    mainFunction(item);
  });
  resetUI();
}

const mainFunction = (e) => {
  e.preventDefault();
  const newItem = itemInput.value;

  // add new item
  mainFunction(newItem);

  // add to the local storage
  addItemToLocalStorage(newItem);

  itemInput.value = '';
};

function mainFunction(newItem) {
  const li = document.createElement('li');
  li.innerText = newItem;
  // li.appendChild(document.createTextNode(newItem))

  const button = document.createElement('button');
  button.classList = 'remove-item btn-link text-red';
  const icon = document.createElement('i');
  icon.classList = 'fa-solid fa-xmark';

  button.appendChild(icon);
  li.appendChild(button);
  itemList.appendChild(li);
}

function addItemToLocalStorage(newItem) {
  const localStorageItems = getItemFromLocalStorage();

  localStorageItems.push(newItem);

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

const filterItem = (e) => {
  const items = itemList.querySelectorAll('li');
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.innerText.toLowerCase();

    if (itemName.includes(text)) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
};

const removeItem = (e) => {
  if (e.target.parentElement.classList.contains('remove-item')) {
    confirm('Are you sure');
    e.target.parentElement.parentElement.remove();
    resetUI();
  }
};

const clearAll = () => {
  confirm('Are you sure?');
  // itemList.innerHTML = ''
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
localStorage.removeItem('items')
  resetUI();
};

const resetUI = (e) => {
  const item = itemList.querySelectorAll('li');

  if (item.length === 0) {
    clearBtn.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
  }
};

// add event listener
itemForm.addEventListener('submit', mainFunction);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearAll);
itemFilter.addEventListener('input', filterItem);
document.addEventListener('DOMContentLoaded', displayItems);

resetUI();
