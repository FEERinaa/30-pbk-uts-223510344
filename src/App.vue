<template>
  <div>
    <header>
      <nav>
        <button @click="setActiveComponent('todos')" :class="{ active: activeComponent === 'todos' }">Todos</button>
        <button @click="setActiveComponent('posts')" :class="{ active: activeComponent === 'posts' }">Post</button>
      </nav>
    </header>
    <Todos v-if="activeComponent === 'todos'" />
    <Posts v-if="activeComponent === 'posts'" />
  </div>
</template>

<script>
import Todos from './components/Todos.vue';
import Posts from './components/Posts.vue';

export default {
  components: {
    Todos,
    Posts
  },
  data() {
    return {
      activeComponent: 'todos'
    };
  },
  methods: {
    setActiveComponent(component) {
      this.activeComponent = component;
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
</style>
