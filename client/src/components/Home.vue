<template>
  <div>
    <h1>새 게시글 만들기</h1>
    <textarea v-model="content"></textarea>
    <div>
      <button @click="createArticle">생성하기</button>
    </div>
    <h2>작성된 게시글</h2>
    <ul>
      <Card v-for="a in articles" :key="a._id" :article="a" @update="updateCard" @delete="deleteCard"/> 
    </ul>
  </div>
</template>
<script>
import axios from 'axios'
import {onMounted, ref} from 'vue'
import Card from '@/components/Card'

export default {
  components: {
    Card
  },
  name: 'Home',
  setup() {
    const articles = ref([])
    const content = ref('')

    const getArticle = async () => {
      const {data} = await axios.get('http://localhost:9000/read')
      articles.value = data
      console.log(articles.value)
    }

    const createArticle = async () => {
      console.log('content',content.value)
      if(content.value.length === 0) {
        window.alert('글을 입력하세요')
        return 
      }
      const {data} = await axios.post('http://localhost:9000/create', {
        content: content.value
      })

      if(!data) return window.alert('생성에 실패했습니다.')
      window.alert('생성에 성공했습니다.')
      articles.value = [...articles.value, data]
      content.value =''
    }

    const updateCard = ({content, id}) => {
      const idx = articles.value.findIndex(v => v._id === id)
      if(idx >-1) {
        articles.value[idx].content = content
      }
    }

    const deleteCard = (id) => {
        const idx = articles.value.findIndex(v => v._id === id)
      if(idx >-1) {
        articles.value.splice(idx, 1)
      }
    }

    onMounted(async () => {
      getArticle()
      console.log(content)
    })    

    return {
      articles,
      content,
      createArticle,
      updateCard,
      deleteCard
    }
  }
}

</script>
<style>
  
</style>