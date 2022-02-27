<template>
  <article>
    <div class="content" v-if="!isEditing">{{article.content}}</div>
    <textarea v-else class="content" v-model="content"></textarea>
    <div class="createdAt">{{formattedDay}}</div>
    <button @click="toggleTextArea">{{isEditing ? '수정 취소' : '수정'}}</button>
    <button v-if="!isEditing" @click="deleteArticle">삭제</button>
    <button v-else @click="updateArticle">수정 완료</button>
  </article>
</template>
<script>
import dayjs from 'dayjs'
import { ref } from '@vue/reactivity'
import axios from 'axios'

export default {
  props: {
    article:{
      default: {
        content: null,
        _id: null,
        createdAt: null
      }
    }
  },

  setup (props, context) {
    const formattedDay = dayjs(props.article.createdAt).format('M월 D일 HH:mm:ss')
    const content = ref(props.article.content)
    const isEditing = ref(false)
    
    const toggleTextArea = () => {
      isEditing.value = !isEditing.value
      content.value = props.article.content
    }

    const updateArticle = async () => {
      const {data} = await axios.patch('http://localhost:9000/update', {
        id: props.article._id,
        content: content.value
      })
      if(!data) return;
      context.emit('update', {content: content.value, id: props.article._id})
      isEditing.value = false
    }

    const deleteArticle = async () => {
      await axios.delete(`http://localhost:9000/delete/${props.article._id}`)
      context.emit('delete', props.article._id)
    }

    return {
      formattedDay,
      content,
      isEditing,
      toggleTextArea,
      updateArticle,
      deleteArticle
    }
  }
}
</script>
<style>
  article {
    padding: 1em;
    box-shadow: 0 3px 3px #22222222;
    margin-bottom: 1em;
    background: #fafafa;
  }
</style>