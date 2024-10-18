<template>
  <div class="container">
    <h1>{{ editingBook ? 'Edit' : 'Add' }} Book</h1>
    <form @submit.prevent="addOrUpdateBook">
      <div class="form-group">
        <label for="isbn">ISBN:</label>
        <input type="text" v-model="isbn" id="isbn" required />
      </div>
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" v-model="name" id="name" required />
      </div>
      <button type="submit">{{ editingBook ? 'Update' : 'Add' }} Book</button>
    </form>
    <div class="book-list">
      <BookList @editBook="editBook" @deleteBook="deleteBook"/>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import db from '../Firebase/init.js'
import { collection, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import BookList from'../components/BookList.vue';

export default {
  setup() {
    const isbn = ref('');
    const name = ref('');
    const editingBook = ref(null); // Edit book object
    const addOrUpdateBook = async () => {
      try {
        const isbnNumber = Number(isbn.value);
        if (isNaN(isbnNumber)){
          alert('ISBN must be a valid number');
          return;
        }

        if (editingBook.value) {
          // Update book
          const bookDoc = doc(db, 'books', editingBook.value.id);
          await updateDoc(bookDoc, { isbn: isbnNumber, name: name.value });
          alert('Book updated successfully!');
        } else {
          // Add new book
          await addDoc(collection(db, 'books'), { isbn: isbnNumber, name: name.value });
          alert('Book added successfully!');
        }

        // Reset form
        isbn.value = '';
        name.value = '';
        editingBook.value = null;
      } catch (error) {
        console.error('Error adding/updating book: ', error);
      }
    };

    const editBook = (book) => {
      // Edit existing books
      isbn.value = book.isbn;
      name.value = book.name;
      editingBook.value = book;
    };

    const deleteBook = async (bookId) => {
      try {
        await deleteDoc(doc(db, 'books', bookId));
        alert('Book deleted successfully!');
      } catch (error) {
        console.error('Error deleting book: ', error);
      }
    };

    return {
      isbn,
      name,
      editingBook,
      addOrUpdateBook,
      editBook,
      deleteBook
    };
  },
  components: {
    BookList
  }
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
}

.form-group {
  margin-bottom: 10px;
}

form {
  display: flex;
  flex-direction: column;
  width: 300px;
}

input, button {
  padding: 10px;
  margin-top: 5px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
}

button {
  cursor: pointer;
}

.book-list {
  margin-top: 50px;
}
</style>