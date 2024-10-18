<template>
    <div class="container">
        <h1>Log Out</h1>
        <p v-if="user">You are logged in as: {{ user.email }} (Role: {{ role }})</p>
        <p v-if="user"><button @click="logout">Log out</button></p>
        <p v-else>You are not logged in</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { getAuth, signOut } from "firebase/auth"
import { getFirestore, doc, getDoc } from "firebase/firestore"
import { useRouter } from "vue-router"

const auth = getAuth()
const db = getFirestore()
const user = ref(auth.currentUser)
const role = ref("") // 保存用户角色
const router = useRouter()

onMounted(async () => {
    if (user.value) {
        const docRef = doc(db, "users", user.value.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            role.value = docSnap.data().role;
        } else {
            console.log("No such document for this user!");
        }
    } else {
        router.push("/FireLogin"); // 如果没有用户登录，重定向到登录页面
    }
});

const logout = async () => {
    try {
        await signOut(auth);
        user.value = null;
        role.value = "";
        router.push("/FireLogin"); // 登出后重定向到登录页面
        console.log("User logged out successfully.");
    } catch (error) {
        console.log("Error logging out:", error);
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

button {
    padding: 10px;
    margin: 10px 0;
    font-size: 16px;
    width: 100%;
    max-width: 300px;
    box-sizing: border-box;
    cursor: pointer;
}
</style>