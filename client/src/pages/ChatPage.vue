<script setup lang="ts">
import ChatService from '@/services/ChatService';
import { ref, onMounted } from 'vue';
import io from 'socket.io-client';
import { URL } from '@/api';
import type { IMessage } from '@/types/Message';

const username = ref('username');
const messages = ref<IMessage[]>([]);
const message = ref('');

const room = {
  id: 1,
  name: "Ой чатик чатик",
  projectId: 23,
}

const messagesContainerRef = ref<HTMLElement | null>(null);
var socket = io(URL);


onMounted(() => {
  socket.on('connect', () => {
    socket.emit('join room', 1);
    socket.on('message', (msg) => {
      messages.value.push(msg);
      scrollToBottom();
    });
  });
  ChatService.getMessagesByRoom(room.id).then((resp) => {
    messages.value = resp.data;
    scrollToBottom();
  });
  document.addEventListener("scroll", scrollToBottom)
});

const submit = async () => {
  const newMessage = { userId: 1, roomId: room.id, body: message.value };
  messages.value.push(newMessage);
  const socket = io(URL);
  socket.emit('message', newMessage);
  await ChatService.sendMessage(newMessage);
  message.value = '';
  scrollToBottom();
};

const scrollToBottom = () => {
  if (messagesContainerRef.value as HTMLElement) {
    messagesContainerRef.value!.scrollTop = messagesContainerRef.value!.scrollHeight;
  }
};
</script>

<template>
  <div class="container">
    <div class="flex-container">
      <div class="header2 ">
        <h2>{{ room.name }}</h2>
      </div>
      <div ref="messagesContainer" class="message-list">
        <div class="message-item " v-for="message in messages" :key="message.id">
          <div class="message-header ">
            <strong>{{ message.userId }}</strong>
          </div>
          <div>{{ message.body }}</div>
        </div>
      </div>
    </div>
    <form @submit.prevent="submit" class="form-group">
      <input class="form-control" placeholder="Введите сообщение..." v-model="message" />
    </form>
  </div>
</template>

<style scoped>
.container {
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  height: 100vh;
}

.flex-container {
  display: flex;
  flex-direction: column;
}

.header2 {
  background-color: var(--proj-color);
  color: #ffffff;
  padding: 10px;
  text-align: center;
  border-radius: 8px 8px 0 0;
}

.message-list {
  overflow-y: auto;
  max-height: 500px;
  height: 80%;
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