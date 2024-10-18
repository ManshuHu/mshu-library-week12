<template>
    <div class="container">
        <h1>Create an Account</h1>
        <p><input type="text" placeholder="Email" v-model="email" /></p>
        <p><input type="password" placeholder="Password" v-model="password" /></p>

        <!-- 选择角色 -->
        <p>
            <label for="role">Role:</label>
            <select v-model="role" id="role">
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>
        </p>

        <p><button @click="register">Save to Firebase</button></p>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { getFirestore, doc, setDoc } from "firebase/firestore" // 使用 Firestore
import { useRouter } from "vue-router"

const email = ref("")
const password = ref("")
const role = ref("user") // 默认角色为 User
const router = useRouter()
const auth = getAuth()
const db = getFirestore()

const register = async () => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
        const user = userCredential.user;

        // 保存用户角色到 Firestore
        await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            role: role.value
        });

        console.log("Firebase Register Successful with role:", role.value);
        router.push("/FireLogin");
    } catch (error) {
        console.log(error.code);
    }
};
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    text-align: center;
}

input, button, select {
    padding: 10px;
    margin: 10px 0;
    font-size: 16px;
    width: 100%;
    max-width: 300px;
    box-sizing: border-box;
}

button {
    cursor: pointer;
}
</style>