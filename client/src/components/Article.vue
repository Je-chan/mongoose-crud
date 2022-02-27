<template>
  <div>
    <div class="card">
      <div class="content">
        {{article.content}}
      </div>
      <div class="created-at">
        {{article.createdAt}}
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import {onMounted, ref} from 'vue'
import {useRoute} from 'vue-router'

export default {
  name: "Article",
  setup() {

    const route = useRoute()
    const article = ref({
      id: null,
      content: null,
      createdAt: null
    })
  
      const findOneArticle = async () => {
        const articleId = route.params.id
        console.log(route.params.id)
        const {data} = await axios.get(`http://localhost:9000/read/${articleId}`)
        article.value = {...data}
      }

    onMounted(async () => {
      await findOneArticle()
    })
    

    return {
      article
    }
  }
}
</script>
<style>
  
</style>