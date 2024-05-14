<template>
  <div>
    <header>
      <nav>
        <button @click="setActiveComponent('todos')" :class="{ active: activeComponent === 'todos' }">Todos</button>
        <button @click="setActiveComponent('posts')" :class="{ active: activeComponent === 'posts' }">Post</button>
      </nav>
    </header>
    <div v-if="activeComponent === 'todos'" class="todo-app">
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
    <div v-if="activeComponent === 'posts'" class="posts-app">
      <h1>Posts</h1>
      <div>
        <label for="userSelect">Select User:</label>
        <select v-model="selectedUser" @change="fetchPosts">
          <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
        </select>
      </div>
      <ul class="post-list">
        <li v-for="post in posts" :key="post.id">
          <h3>{{ post.title }}</h3>
          <p>{{ post.body }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTodo: '',
      todos: [],
      filter: 'all',
      activeComponent: 'todos',
      users: [],
      selectedUser: null,
      posts: []
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
    setActiveComponent(component) {
      this.activeComponent = component;
      if (component === 'posts' && this.users.length === 0) {
        this.fetchUsers();
      }
    },
    fetchUsers() {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
          this.users = data;
          if (data.length > 0) {
            this.selectedUser = data[0].id;
            this.fetchPosts();
          }
        });
    },
    fetchPosts() {
      if (!this.selectedUser) return;
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUser}`)
        .then(response => response.json())
        .then(data => {
          this.posts = data;
        });
    }
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
    }
  },
  mounted() {
    if (this.activeComponent === 'posts') {
      this.fetchUsers();
    }
  }
};
</script>

<style>
body {
  color: #333; 
  font-family: sans-serif; 
  margin: 0;
  background-image: url(/src/assets/bg.jpeg); 
  background: cover;
  background-size: cover;
  background-repeat: no-repeat; 
}

header {
  background-color: #333;
  padding: 10px;
}

nav {
  display: flex;
  justify-content: center;
}

nav button {
  margin: 0 10px;
  padding: 10px 20px;
  background-color: #258340;
  color: white;
  border: none;
  cursor: pointer;
}

nav button.active {
  background-color: #555;
}

.todo-app, .posts-app {
  max-width: 600px;
  margin: 40px auto;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); 
  background-color: #e9a0da; 
}

.todo-app h1, .posts-app h1 {
  text-align: center;
  color: #333; 
  font-size: 1.8rem;
  margin-bottom: 20px;
}

.todo-app form {
  display: flex;
  margin-bottom: 20px;
}

.todo-app input[type=text] {
  flex: 1;
  padding: 15px 20px; 
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1); 
}

.todo-app button[type=submit] {
  margin-left: 10px;
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #258340; 
  color: #fff; 
  border: none; 
}

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
  background-color: #ddd; 
}

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

.danger {
  background-color: transparent;
  color: #e84118; 
  border: none;
  cursor: pointer;
  padding: 5px 0;
}

footer {
  text-align: center;
  font-size: 0.8rem;
  color: #d8cdcd;
}

.posts-app select {
  padding: 10px;
  margin-bottom: 20px;
  font-size: 1rem;
}

.post-list {
  list-style: none;
  padding: 0;
}

.post-list li {
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.post-list li h3 {
  margin: 0 0 10px;
}

.post-list li p {
  margin: 0;
}
</style>
