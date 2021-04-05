<template>
    <div>
        <div class="lg-steps">
            <div class="lg-steps-line"></div>
            <div
                class="lg-step"
                v-for="index in count"
                :key="index"
                :style="{ color: active > index ? activeColor : defaultColor }"
            >
                {{ index }}
            </div>
        </div>
        <button @click="active += 1">Click Me</button>
    </div>
</template>

<script>
import "./Step.css";
export default {
    name: "LgSteps",
    props: {
        count: {
            type: Number,
            default: 3,
        },
        active: {
            type: Number,
            default: 0,
        },
        activeColor: {
            type: String,
            default: "red",
        },
        defaultColor: {
            type: String,
            default: "green",
        },
    }
}
</script>

<style>
</style>