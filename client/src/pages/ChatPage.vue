<script setup lang="ts">
import ChatService from '@/services/ChatService';
import { ref, onMounted,watch, nextTick, onBeforeUnmount } from 'vue';
import io from 'socket.io-client';
import { URL } from '@/api';
import type { IMessage } from '@/types/Message';
import {formatTime} from '@/helpers/formatTime';
import { useChat } from '@/store/chats';
import { useRoute } from 'vue-router'
import Navbar from '@/components/layout/Navbar.vue';
import Header from '@/components/layout/Header.vue';
import { useUser } from '@/store/user';
import type {IGetMessages} from '@/types/getMessagesResp'

const message = ref('');
const chats = useChat();
const user = useUser();

const route = useRoute();

const messagesContainer = ref<HTMLElement | null>(null);
var socket = io(URL);
const scrollToBottom = async () => {
  await nextTick(() => {
    messagesContainer.value!.scrollTop = messagesContainer.value!.scrollHeight;
  });
};



onMounted(async () => {
  await user.checkAuth();
  await chats.getChatInfo(parseInt(route.params.id as string));
  await new Promise((resolve : (value?: {} | PromiseLike<{}> | undefined) => void ) => {
    socket.on('connect', () => {
      socket.emit('join room', parseInt(route.params.id as string));
      socket.on('message', (msg) => {
        chats.chatInfo.messages.push(msg);
        scrollToBottom();
      });
      resolve(); 
    });
  });

  await scrollToBottom();
  document.addEventListener("scroll", scrollToBottom);
});


onBeforeUnmount(() => {
  document.removeEventListener("scroll", scrollToBottom);
});

const submit = async () => {
  message.value = message.value.trim();
  if (message.value === '') {
    return;
  }
  const newMessage:any = {
    User : {
      id : user.user.id!,
      username : user.user.username,
    },
    userId: user.user.id!,
    roomId: chats.chatInfo.room.id!,
    body: message.value,
    createdAt: new Date()
  };

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
  <div class="content">
    <div>
      <Navbar />
    </div>

    <div class="main">
      <Header />
      <main>
        <div class="container">
          <div class="flex-container">
            <div class="header2 ">
              <h2>{{ chats.chatInfo.room?.name }}</h2>
            </div>
            <div ref="messagesContainer" class="message-list">
              <div class="message-item" v-for="message in chats.chatInfo.messages" :key="message.id">
                <div class="message-header ">
                  <strong>{{ message.User.username }}</strong> <span class="time">{{ formatTime(message.createdAt +
                    '') }}</span>
                </div>
                <div class="message-body">{{ message.body }}</div>
              </div>
            </div>
          </div>
          <form @submit.prevent="submit" class="form-group">
            <input class="form-control" placeholder="Введите сообщение..." v-model="message" />
          </form>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.content {
  display: flex;
  width: 100%;
  overflow: hidden;
}

.main {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
}
.message-body {
  font-weight: 500;
  opacity: 0.85;
}

.container {
  margin: 0 auto;
  padding: 20px;
  position: relative;
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

.time {
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

.form-group {
  width: calc(100% - 40px);
  position: absolute;
  bottom: 0;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
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