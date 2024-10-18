<template>
    <div class="container">
        <h1>Sign in</h1>
        <p><input type="text" placeholder="Email" v-model="email" /></p>
        <p><input type="password" placeholder="Password" v-model="password" /></p>
        <p><button @click="signin">Sign in via Firebase</button></p>
        <p v-if="user">Logged in as: {{ user.email }} (Role: {{ role }})</p>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { getFirestore, doc, getDoc } from "firebase/firestore"
import { useRouter } from "vue-router"

const email = ref("")
const password = ref("")
const user = ref(null)
const role = ref("") // 保存用户角色
const router = useRouter()
const auth = getAuth()
const db = getFirestore()

const signin = async () => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
        user.value = userCredential.user;

        // 从 Firestore 获取用户角色
        const docRef = doc(db, "users", user.value.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            role.value = docSnap.data().role;
            console.log("Logged in as:", user.value.email, "with role:", role.value);
        } else {
            console.log("No such document for this user!");
        }

        router.push("/"); // 登录后跳转到主页
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

input, button {
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