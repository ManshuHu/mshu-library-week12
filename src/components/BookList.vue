<template>
    <div>
      <h1>Book Lists</h1>
      <ul>
        <li v-for="book in books" :key="book.id">
          {{ book.name }} - ISBN: {{ book.isbn }}
          <button @click="$emit('editBook', book)">Edit</button>
          <button @click="$emit('deleteBook', book.id)">Delete</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import db from '../Firebase/init.js';
  import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
  
  export default {
    setup() {
      const books = ref([]);
  
      const fetchBooks = async () => {
        try {
          // Use where, orderBy, and limit to retrieve data
          const q = query(
            collection(db, 'books'),
            // where('isbn', '>', 1000), // Search for books with an isbn greater than 1000
            orderBy('isbn', 'asc'),   // Sort by ISBN ascending order
            limit(10)                 // Limit the number of returned books to 10
          );
          const querySnapshot = await getDocs(q);
          const booksArray = [];
          querySnapshot.forEach((doc) => {
            booksArray.push({ id: doc.id, ...doc.data() });
          });
          books.value = booksArray;
        } catch (error) {
          console.error('Error fetching books:', error);
        }
      };
  
      onMounted(() => {
        fetchBooks();
      });
  
      return {
        books
      };
    }
  };
  </script>
  
  <style scoped>
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 10px;
  }
  
  button {
    margin-left: 10px;
    padding: 5px;
  }
  </style>