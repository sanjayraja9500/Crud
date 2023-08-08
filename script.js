const itemForm = document.getElementById('item-form');
const nameInput = document.getElementById('item-name');
const quantityInput = document.getElementById('item-quantity');
const btnSubmit = document.getElementById('btn-submit');

const itemListContainer = document.getElementById('item-list-container');

// function init() {
//   itemListContainer.style.display = 'none';
//   itemListContainer.innerHTML = null;
// }

// global variation

let items = [
  { id: '1', itemName: 'apple', quantity: '12' },
  { id: '2', itemName: 'orange', quantity: '10' },
  { id: '3', itemName: 'banana', quantity: '9' },
  { id: '4', itemName: 'guava', quantity: '14' },
  { id: '5', itemName: 'grapes', quantity: '1' },
];

let isEditing;
let itemToEdit;

function init() {
  showItems(items);
  isEditing = false;
  btnSubmit.value = 'Add';
}

function showItems(items) {
  itemListContainer.style.display = 'none';
  itemListContainer.innerHTML = null;
  items.forEach((item) => {
    createItem(item);
  });
}

const createItem = ({ id, itemName, quantity }) => {
  const listElement = document.createElement('li');
  listElement.classList.add('item-list');

  listElement.innerHTML = `
  <span class = 'item-detail'>${itemName}</span>
  <span class = 'item-detail'>${quantity}</span> 
  <container>
  <button class = 'btn-delete' onClick= deleteItem(${id})>D</button>
  <button class = 'btn-edit' onClick= editItem(${id})>E</button></container>`;
  itemListContainer.style.display = 'flex';
  itemListContainer.appendChild(listElement);
};
// createItem();

const deleteItem = function (id) {
  items = items.filter((item) => item.id != id);
  // showItems(items);
};

const editItem = function (id) {
  if (!itemToEdit) {
    isEditing = true;
    btnSubmit.value = 'Edit';

    itemToEdit = items.find((item) => item.id == id);

    nameInput.value = itemToEdit.itemName;
    quantityInput.value = itemToEdit.quantity;
  } else {
    alert('Already an Item is being edited');
  }
};

itemForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const itemName = nameInput.value;
  const quantity = quantityInput.value;
  if (itemName.trim() && quantity.trim()) {
    const item = {
      id: `${Date.now()}`,
      itemName: itemName,
      quantity: quantity,
    };
    items.push(item);
    showItems(items);
  } else {
    alert('all fields are Mandatory');
  }

  if (isEditing) {
    items = items.map((item) => {
      if (item.id == itemToEdit.id) {
        return { ...item, itemName: itemName, quantity: quantity };
      } else {
        return item;
      }
    });
    showItems(items);
    isEditing = true;
    itemToEdit = null;
    btnSubmit.value = 'add';
  } else {
    const item = {
      id: `${Date.now()}`,
      itemName: itemName,
      quantity: quantity,
    };
    items.push(item);
  }
  nameInput.value = null;
  quantityInput.value = null;
});

init();
