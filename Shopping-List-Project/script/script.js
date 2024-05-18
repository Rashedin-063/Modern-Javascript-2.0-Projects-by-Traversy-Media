const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');

const addItem = (e) => {
  e.preventDefault();

  const newItem = itemInput.value;

  // add item to DOM
  addItemToDOM(newItem);

  // add item to local storage
  addItemToLocalStorage(newItem);

  checkUI();

  itemInput.value = '';
};

const addItemToDOM = (item) => {
  // create list item
  const li = document.createElement('li');
  li.textContent = item;
  const button = document.createElement('button');
  button.innerHTML = `
  <i class="fa-solid fa-xmark"></i>
  `;
  button.classList = 'remove-item btn-link text-red';

  li.appendChild(button);

  // adding li to the dom
  itemList.appendChild(li);
};

const addItemToLocalStorage = (item) => {
  let localStorageItems = [];

  const storedLocalStorageItems = localStorage.getItem('items');

  if (storedLocalStorageItems) {
    localStorageItems = JSON.parse(storedLocalStorageItems);
  }
  localStorageItems.push(item);

  localStorage.setItem('items', JSON.stringify(localStorageItems));
};

const removeItem = (e) => {
  if (e.target.parentElement.classList.contains('remove-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();
    }
    checkUI();
  }
};

const clearItem = () => {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  checkUI();
};

const filterItem = (e) => {
  const items = itemList.querySelectorAll('li');
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();

    // if (itemName.indexOf(text) !== -1) {
    //   console.log(true)
    // } else {
    //   console.log(false)
    // }
    if (itemName.includes(text)) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
};

const checkUI = () => {
  const items = itemList.querySelectorAll('li');

  if (items.length === 0) {
    clearBtn.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
  }
};

// Event Listeners
itemForm.addEventListener('submit', mainFunction);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItem);
itemFilter.addEventListener('input', filterItem);

checkUI();
