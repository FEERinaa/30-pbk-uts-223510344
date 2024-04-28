<template>
  <div class="todo-app">
    <h1>To Do list</h1>
    <form @submit.prevent="addTodo">
      <input type="text" v-model="newTodo" placeholder="Add a task..." />
      <button type="submit" class="primary">Add</button>
    </form>
    <h2>List Items</h2>
    <div class="filter-section">
      <button @click="filterTodos('all')" class="filter-btn">All</button>
      <button @click="filterTodos('active')" class="filter-btn">Not Completed</button>
      <button @click="filterTodos('completed')" class="filter-btn">Completed</button>
    </div>
    <ul class="todo-list">
      <li v-for="(todo, index) in filteredTodos" :key="index">
        <input type="checkbox" v-model="todo.done" />
        <span :class="{ 'done': todo.done }">{{ todo.text }}</span>
        <button @click="removeTodo(index)" class="danger">Remove</button>
      </li>
    </ul>
    <footer>
      <p>Ferinaa</p>
    </footer>
  </div>
</template>



<script>
export default {
  data() {
    return {
      newTodo: '',
      todos: [],
      filter: 'all',
    };
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim().length === 0) {
        return;
      }
      this.todos.push({
        text: this.newTodo,
        done: false,
      });
      this.newTodo = '';
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    filterTodos(filterType) {
      this.filter = filterType;
    },
  },
  computed: {
    filteredTodos() {
      switch (this.filter) {
        case 'active':
          return this.todos.filter(todo => !todo.done);
        case 'completed':
          return this.todos.filter(todo => todo.done);
        default:
          return this.todos;
      }
    },
  },
};


</script>

<style>
/* General Styles */
body {
  color: #333; /* Darker text color */
  font-family: sans-serif; /* Simpler, more neutral font */
  margin: 0;
  background-image: url(/src/assets/bg.jpeg); 
  background: cover;
background-size: cover;
background-repeat: no-repeat; /* Light grey background */
}

/* Todo List Container */
.todo-app {
  max-width: 600px;
  margin: 40px auto;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  background-color: #e9a0da; /* White background for clear text */
}

/* Heading */
.todo-app h1 {
  text-align: center;
  color: #333; /* Darker heading color */
  font-size: 1.8rem;
  margin-bottom: 20px;
}

/* Input Form */
.todo-app form {
  display: flex;
  margin-bottom: 20px;
}

.todo-app input[type=text] {
  flex: 1;
  padding: 15px 20px; /* Increase padding for a more spacious feel */
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1); /* Subtle inset shadow for a touch of depth */
}

.todo-app button[type=submit] {
  margin-left: 10px;
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #258340; /* Blue button color */
  color: #fff; /* White button text */
  border: none; /* Remove border for a cleaner look */
}

/* Filter Buttons */
.filter-section {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.filter-btn {
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}

.filter-btn.active {
  background-color: #ddd; /* Light background for active filter */
}

/* Todo List */
.todo-list {
  list-style: none;
  padding: 0;
}

.todo-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

.todo-list li:last-child {
  border-bottom: none;
}

.done {
  text-decoration: line-through;
  color: #aaa;
}

/* Remove Button */
.danger {
  background-color: transparent;
  color: #e84118; /* Red color for remove button */
  border: none;
  cursor: pointer;
  padding: 5px 0;
}

/* Footer */
footer {
  text-align: center;
  font-size: 0.8rem;
  color: #d8cdcd;
}

</style>