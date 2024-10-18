<template>
    <div class="container">
      <h1>All Books</h1>
      <div v-if="loading">Loading...</div>
      <div v-if="error">{{ error }}</div>
      <pre v-if="books">{{ books }}</pre>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: "GetAllBookAPI",
    data() {
      return {
        books: null,
        loading: false,
        error: null,
      };
    },
    mounted() {
      this.fetchAllBooks();
    },
    methods: {
      async fetchAllBooks() {
        this.loading = true;
        try {
          const response = await axios.get('https://getallbooks-jqbcxxgx5a-uc.a.run.app');
          this.books = JSON.stringify(response.data.books, null, 2); // Beautify JSON
          this.error = null;
        } catch (error) {
          console.error('Error fetching all books:', error);
          this.error = 'Error fetching books. Please try again later.';
        } finally {
          this.loading = false;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    text-align: center;
    margin-top: 20px;
  }
  </style>