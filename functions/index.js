/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require('firebase-functions/v2/https');
const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

admin.initializeApp();

// 云函数：获取书籍总数
exports.countBooks = onRequest((req, res) => {
    cors(req, res, async () => {
        try {
            const booksCollection = admin.firestore().collection("books");
            const snapshot = await booksCollection.get();
            const count = snapshot.size;

            res.status(200).send({ count });
        } catch (error) {
            console.error("Error counting books:", error.message);
            res.status(500).send("Error counting books");
        }
    });
});

// 云函数：当新书籍创建时大写书籍名称
exports.capitalizeBookEntry = onDocumentCreated('books/{bookId}', async (event) => {
    const bookData = event.data.data();

    const capitalizedData = {
        ...bookData,
        name: bookData.name.toUpperCase(),
    };

    return event.data.ref.update(capitalizedData);
});

// 新增的云函数：获取所有书籍数据
exports.getAllBooks = onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            const booksCollection = admin.firestore().collection("books");
            const snapshot = await booksCollection.get();

            const books = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            res.status(200).json({ books });
        } catch (error) {
            console.error("Error fetching books:", error.message);
            res.status(500).send("Error fetching books");
        }
    });
});