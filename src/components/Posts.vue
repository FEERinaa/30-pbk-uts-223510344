<template>
    <div class="posts-app">
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
      <slot></slot>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        users: [],
        selectedUser: null,
        posts: []
      };
    },
    methods: {
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
    mounted() {
      this.fetchUsers();
    }
  };
  </script>
  
  <style scoped>
  .posts-app {
    max-width: 600px;
    margin: 40px auto;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); 
    background-color: #e9a0da; 
  }
  
  .posts-app h1 {
    text-align: center;
    color: #333; 
    font-size: 1.8rem;
    margin-bottom: 20px;
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
  