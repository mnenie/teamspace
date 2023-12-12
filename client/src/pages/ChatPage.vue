<script setup lang="ts">
import ChatService from '@/services/ChatService';
import { ref, onMounted, watch, nextTick, onBeforeUnmount } from 'vue';
import io from 'socket.io-client';
import { URL } from '@/api';
import type { IMessage } from '@/types/Message';
import {formatTime} from '@/helpers/formatTime';
import type { IRoom } from '@/types/Room';
import { useChat } from '@/store/chats';
import {useRoute} from 'vue-router'

const message = ref('');

const room = ref<IRoom>({} as IRoom);

const route = useRoute();

const messagesContainer = ref<HTMLElement | null>(null);
var socket = io(URL);
const scrollToBottom = async () => {
  await nextTick(() => {
    messagesContainer.value!.scrollTop = messagesContainer.value!.scrollHeight;
  });
};

const chats = useChat();


onMounted(async () => {
  await chats.getChatInfo(parseInt(route.params.id as string))
  .then( () => {
    room.value = chats.chatInfo.room;
  })

  socket.on('connect', () => {
    socket.emit('join room', chats.chatInfo.room.id );
    socket.on('message', (msg) => {
      chats.chatInfo.messages.push(msg);
      scrollToBottom();
    });
  });
  await scrollToBottom();
  document.addEventListener("scroll", scrollToBottom)
});
onBeforeUnmount(() => {
  document.removeEventListener("scroll", scrollToBottom);
});

const submit = async () => {
  const newMessage : IMessage = { userId: 1, 
    roomId: chats.chatInfo.room.id!,
    body: message.value,
    createdAt : new Date() } ;
    
  socket.emit('message', newMessage);
  await ChatService.sendMessage(newMessage);
  message.value = '';
  await scrollToBottom();
};

watch(() => chats.chatInfo.messages, async () => {
  await scrollToBottom();
});



</script>

<template>
  <div class="container">
    <div class="flex-container">
      <div class="header2 ">
        <h2>{{ chats.chatInfo.room.name }}</h2>
      </div>
      <div ref="messagesContainer" class="message-list">
        <div class="message-item" v-for="message in chats.chatInfo.messages" :key="message.id">
          <div class="message-header ">
            <strong>{{ "Тамара Константиновна" }}</strong> <span class="time">{{formatTime(message.createdAt + '')}}</span>
          </div>
          <div class="message-body">{{ message.body }}</div>
        </div>
      </div>
    </div>
    <form @submit.prevent="submit" class="form-group">
      <input class="form-control" placeholder="Введите сообщение..." v-model="message" />
    </form>
  </div>
</template>

<style scoped>
.message-body{
  font-weight: 500;
  opacity: 0.85;
}

.container {
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  height: 80vh;
}

.flex-container {
  display: flex;
  flex-direction: column;
}

.header2 {
  background-color: var(--green-btn-color);
  color: #ffffff;
  padding: 10px;
  text-align: center;
  border-radius: 8px 8px 0 0;
  
}

.time{
  color: var(--green-color);
}

.message-list {
  overflow-y: auto;
  max-height: 60vh;
  margin-top: 10px;
}

.message-item {
  background-color: #ffffff;
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  margin-bottom: 10px;
  padding: 10px;
}

.message-header {
  margin-bottom: 5px;
  font-weight: bold;
}

form {
  margin-top: 20px;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-right: 10px;
  margin-bottom: 10px;
}

input[type="text"] {
  height: 40px;
  font-size: 16px;
}

input[type="submit"] {
  background-color: #3498db;
  color: #ffffff;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

input[type="submit"]:hover {
  background-color: #2980b9;
}
</style>