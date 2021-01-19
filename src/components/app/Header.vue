<template>
    <header class="header">
        <div class="container">
            <router-link to="/"><img src="../../assets/logo.png" class="header__logo"></router-link>
        </div>
    </header>
</template>

<script>
export default {
    name: "Header"
}
</script>

<style lang="scss" scoped>
    .header {
        overflow: hidden;
        background: #2d67c5;
    }
    .header__logo {
        display: block;
        height: 50px;
        width: 75px;
        padding: 10px 0;
        margin: 0 auto;
    }
</style>