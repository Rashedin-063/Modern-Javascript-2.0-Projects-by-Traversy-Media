const apiUrl = 'https://jsonplaceholder.typicode.com/todos';

function getTodos() {
  fetch(apiUrl + '?_limit=10')
    .then((res) => res.json())
    .then((data) => {
      data.forEach((todo) => displayTodos(todo));
    });
}

function displayTodos(todo) {
  const title = todo.title;

  const div = document.createElement('div');
  div.classList.add('todo');
  div.textContent = title;

  if (todo.completed) {
    div.classList.add('done');
  }
  div.setAttribute('data-id', todo.id);

  document.querySelector('#todo-list').appendChild(div);
}

function createTodo(e) {
  e.preventDefault();
  const newTodo = {
    title: e.target.firstElementChild.value,
    completed: false,
  };
  fetch(apiUrl, {
    method: 'POSt',
    body: JSON.stringify(newTodo),
    headers: {
      'Content-Type': 'application/json',
      token: '123',
    },
  })
    .then((res) => res.json())
    .then((data) => displayTodos(data));
}

function toggleCompleted(e) {
  if (e.target.classList.contains('todo')) {
    e.target.classList.toggle('done');
  }

  updateTodo(e.target.dataset.id, e.target.classList.contains('done'));
}

function updateTodo(id, completed) {
  fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ completed }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function deleteTodo(e) {
  if (e.target.classList.contains('todo')) {
    const id = e.target.dataset.id;
    fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(() => e.target.remove());
  }
}

function init() {
  document.addEventListener('DOMContentLoaded', getTodos);
  document.querySelector('#todo-form').addEventListener('submit', createTodo);
  document
    .querySelector('#todo-list')
    .addEventListener('click', toggleCompleted);
  document.querySelector('#todo-list').addEventListener('dblclick', deleteTodo);
}

init();
