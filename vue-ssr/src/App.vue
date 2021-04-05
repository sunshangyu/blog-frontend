<template>
    <div id="app">
        <h1>{{ message }}</h1>
        <h2>客户端动态交互</h2>
        <div>
            <input type="text" v-model="message" />
        </div>
        <div>
            <button @click="onClick">Click me</button>
        </div>
        <div>
        <ul>
            <li>
                <router-link to="/">Home</router-link>
            </li>
            <li>
                <router-link to="/about">About</router-link>
            </li>
        </ul>
        </div>
        <!-- 路由出口 -->
        <router-view />
    </div>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            message: "You Motherfuncker",
        };
    },
    methods: {
        onClick() {
            console.log("object");
        },
    },
};
</script>

<style>
</style>