<template>
<div></div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'App',
  setup() {
    const getArticle = async () => {
      const {data} = await axios.get('/read')
      console.log(data)
    }
    
    getArticle()
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
