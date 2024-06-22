<template>
  <div>
    <header>
      <nav>
        <router-link to="/" class="nav-link">Todos</router-link>
        <router-link to="/posts" class="nav-link">Posts</router-link>
        <router-link to="/albums" class="nav-link">Albums</router-link>
      </nav>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
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

.nav-link {
  margin: 0 10px;
  padding: 10px 20px;
  background-color: #258340;
  color: white;
  text-decoration: none;
  border: none;
  cursor: pointer;
}

.nav-link.router-link-active {
  background-color: #555;
}
</style>
