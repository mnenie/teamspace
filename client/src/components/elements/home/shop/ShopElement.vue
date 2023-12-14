<script setup lang="ts">
   import type {IProduct} from '@/types/Product';
   const products : IProduct[] = [
      {id : 1, projectId : 1, name : 'coffee' , cost : 50, count : -1},
      {id : 1, projectId : 1, name : 'сникерс' , cost : 50, count : 23},
      {id : 1, projectId : 1, name : 'протеин' , cost : 50, count : -1},
      {id : 1, projectId : 1, name : 'чай' , cost : 50, count : -1},
    ]
</script>

<template>
  <div class="header-setting">
    <h3>Товары</h3>
  </div>
  <div class="members" v-for="product in products">
    <div class="member">
      <div class="member-left">
        <div class="circle">
          <span>иконка</span>
        </div>
        <div class="text">
          <span class="name">{{  product && product.name ? product.name : '' }}</span>
          <span v-if="product.count == -1" class="role">Неограничено</span>
          <span v-else class="role"> Осталось: {{ product.count }}</span>
        
        </div>
      </div>
      <span class="points">Стоимость: <span>{{product.cost}}</span></span>
    </div>
  </div>
</template>

<style scoped>
.header-setting {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header-setting > h3{
  color: var(--text-color);
  font-size: 25px;
}
.header-setting > button{
  background: rgb(229, 229, 229);
  border: none;
  cursor: pointer;
  border-radius: 5px;
  padding: 5px 10px;
  color: var(--text-color);
  margin-right: 30px;
} 
.header-setting > button:hover{
  opacity: 0.7;
} 
.members {
  display: flex;
  flex-direction: column;
}
.member {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.member-left {
  display: flex;
}
.circle {
    border-radius: 50%;
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--green-color);
    margin-right: 10px;
    cursor: pointer;
    -ms-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
}

.circle>span {
    color: var(--white-color);
    font-size: 20px;
}
.text {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.name {
  margin-bottom: 5px;
}
.role {
  color: var(--text-color);
  font-size: 13px;
}
.points {
  margin-right: 30px;
}
.points > span{
  color: #359f39;
}

</style>