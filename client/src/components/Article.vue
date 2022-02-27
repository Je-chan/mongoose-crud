<template>
  <div>
    <div class="card">
      <Card :article = "article" @update="updateCard" @delete="moveToHome"/>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import {onMounted, ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import Card from '@/components/Card.vue'

export default {
  name: "Article",
  components: {
    Card
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
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

    const updateCard = ({content}) => {
      article.value.content = content
    }

    const moveToHome = () => {
      router.push('/')
    }

    onMounted(async () => {
      await findOneArticle()
    })
    

    return {
      article,
      updateCard,
      moveToHome
    }
  }
}
</script>
<style>
  
</style>