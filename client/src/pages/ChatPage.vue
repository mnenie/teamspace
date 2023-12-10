<script setup lang="ts">
  import ChatService from '@/services/ChatService';
import { ref, onMounted } from 'vue';
import io from 'socket.io-client';
import {URL} from '@/api';
import type { IMessage } from '@/types/Message';

  const username = ref('username');
  const messages = ref<IMessage[]>([]);
  const message = ref('');
  
  onMounted(() => {
    // websocket connect
    var socket = io(URL)
    socket.on('connect',() =>{
      console.log('websocket connect');
    });
    ChatService.getMessagesByRoom(2).then(resp => {console.log(resp);messages.value = resp.data});

});
  
  const submit = async () => {
    ChatService.sendMessage({userId: 1, roomId: 1, body : message.value});
    message.value = '';
  };
  </script>

<template>
    <div class="container">
      <div class="flex-container bg-white">
        <div class="header2 p-3 border-bottom">
          <input class="fs-5 fw-semibold" v-model="username" />
        </div>
        <div class="message-list border-bottom scrollarea">
          <div class="message-item py-3 lh-tight" v-for="message in messages" :key="message.id">
            <div class="message-header d-flex w-100 align-items-center justify-content-between">
              <strong class="mb-1">{{ message }}</strong>
            </div>
            <div class="message-content col-10 mb-1 small">{{ message }}</div>
          </div>
        </div>
      </div>
      <form @submit.prevent="submit">
        <input class="form-control" placeholder="Write a message" v-model="message" />
      </form>
    </div>
  </template>
  
  
<style>
.container {
  display: flex;
  flex-direction: column;
}

.flex-container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-shrink: 0;
}

.header2 {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.message-list {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border-bottom: 1px solid #dee2e6;
  overflow-y: auto;
  min-height: 500px;
}

.message-item {
  display: flex;
  flex-direction: column;
  padding: 0.75rem 1.25rem;
  border-bottom: 1px solid #dee2e6;
}

.message-header {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
}

.message-content {
  flex: 0 1 83.33333%; 
  margin-bottom: 0.25rem;
}

.form-control {
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}
</style>
  