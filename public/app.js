$(document).ready(function() {
  $.getJSON('/api/todos')
    .then(addTodos)

    $('#todoInput').keypress(function(event) {
      if(event.which === 13) {
        createTodo();
      }
    });

    $('.list').on('click', 'span', function(event) {
      event.stopPropagation();
      deleteTodo($(this).parent());
    });

    $('.list').on('click', 'li', function() {
      updateTodo($(this));
    });

});

const addTodos = (todos) => {
  todos.forEach(todo => {
    addTodo(todo);
  });
}

const addTodo = (todo) => {
  const newTodo = $(`<li class="task">${todo.name}<span>x<span></li>`);
  newTodo.data('id', todo._id);
  newTodo.data('completed', todo.completed);
  if (todo.completed) {
    newTodo.addClass("done");
  }
  $('.list').append(newTodo);
}

const createTodo = async () => {
  const userInput = $('#todoInput').val();

  const newTodo = await $.post('/api/todos', {name: userInput});

  try {
    $('#todoInput').val('');
    addTodo(newTodo);
  } catch(err) {
      console.log(err);
    }
}

const deleteTodo = (todo) => {
  const todoId = todo.data('id');
  const deleteUrl = `/api/todos/${todoId}`;

  $.ajax({
    method: 'DELETE',
    url: deleteUrl
  })
  .then(function(data) {
    todo.remove();
  })
  .catch(function() {
    console.log(err);
  })
};

const updateTodo = (todo) => {
  const todoId = todo.data('id');
  const updateUrl = `/api/todos/${todoId}`;
  const isDone = !todo.data('completed');
  const updateData = { completed: isDone };

  $.ajax({
    method: 'PUT',
    url: updateUrl,
    data: updateData
  })
  .then(function(updatedTodo) {
    todo.toggleClass('done');
    todo.data('completed', isDone);
  })
}
