<template>
  <div id="app">
      <Header />
      <main>
        <router-view />
      </main>
  </div>
</template>

<script>
import Header from '../src/components/app/Header';

export default {
  components: {
    Header,
  }
  
}
</script>

<style lang="scss">
//Загальные классы

@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 100%;
  font-family: 'Roboto', sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.delete {
  background: #e51f1f;
  cursor: pointer;
  &:hover {
    color: #fff;
  }
}

.edit {
  background: #f59b00;
  cursor: pointer;
  &:hover {
    color: #fff;
  }
}
</style>