<script setup lang="ts">
import ModalEditChat from '@/components/UI/ModalEditChat.vue';
import type { IRoom } from '@/types/Room';
import { ModalsContainer, useModal } from 'vue-final-modal'
import { onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import { useChat } from '@/store/chats';
import { CHAT_ROUTE } from '@/utils/consts';


interface Props {
    elems: IRoom[]
    isNavOpened: boolean
}
const props = defineProps<Props>()

const emit = defineEmits(['navOpenTrue']);
const isPicking = ref<boolean>(false)
const pickedElement = ref<HTMLElement | null>();
const itemOptContainer = ref<HTMLElement | null>(null);
const options = ref<HTMLElement | null>(null);

const chats = useChat();
const router = useRouter();
const route = useRoute();

const navOpenTrue = (event: MouseEvent) => {
    const clickedElement = event.currentTarget as HTMLElement;
    pickedElement.value = clickedElement;
    emit('navOpenTrue');
};

const { open, close } = useModal({
    component: ModalEditChat,
    attrs: {
        onConfirm() {
            close()
        },
        onClose() {
            close()
        }
    }
})

// для обработки нажатия на три точки у другого элемента
const calculateItemOptStyle = () => {
  if (pickedElement.value) {
    const rect = pickedElement.value.getBoundingClientRect();
    return {
      top: `${rect.top}px`,
      left: `${rect.right}px`,
    };
  }
  return {};
};

function handleActiveClick(event: MouseEvent) {
    const clicked = event.currentTarget as HTMLElement;
    if (clicked.parentNode === pickedElement.value && isPicking.value) {
        isPicking.value = false
    } else {
        isPicking.value = true
    }
}

function handleDelete() {
    let id  = (pickedElement.value?.parentNode! as any).id ;
    id = parseInt(id)
    isPicking.value = false
    chats.deleteChat(id);
    if (route.path == CHAT_ROUTE + '/' + id){
        router.push('/');
    }
    
}
onMounted(() => {
    const closePicker = (event: MouseEvent) => {
        const clickedElement = event.target as HTMLElement;

        if (!clickedElement.classList.contains('options3-icon')) {
            isPicking.value = false;
        }
    };

  document.addEventListener('click', closePicker);

  onUnmounted(() => {
    document.removeEventListener('click', closePicker);
  });
});


const handle = async (event: MouseEvent,id : number) => {
    const clickedElement = event.target as HTMLElement;
    if (clickedElement.classList.contains('options3-icon') ||
    clickedElement.classList.contains('opt') ||
    clickedElement.classList.contains('item-opt') ||
    (clickedElement.parentNode instanceof HTMLElement && clickedElement.parentNode.classList.contains('opt'))) return

    await chats.getChatInfo(id)
    router.push({ path: '/chat/' + id });
};
</script>

<template>
    <li v-for="elem in elems" :key="elem.id" :id="elem.id + ''" :name="elem.name" >
        <a class="item" :class="!isNavOpened ? 'item-closed' : ''" @click="navOpenTrue($event as MouseEvent),handle($event as MouseEvent, elem.id!)">
            <div class="left">
                <i class="pi pi-envelope icon" :class="!isNavOpened ? 'icon-closed' : ''"></i>
                <span v-if="isNavOpened" class="name">{{ elem.name }}</span>
            </div>
            <div class="right" @click="handleActiveClick($event as MouseEvent)" v-if="isNavOpened">
                <i
                    ref="options"
                    class="pi pi-ellipsis-h options3-icon"
                >
                </i>
            </div>
        </a>
        <div class="item-opt" v-if="isPicking" :style="calculateItemOptStyle()" ref="itemOptContainer">
            <div class="opt" @click="open(), isPicking = false">
                <i class="pi pi-file-edit"></i>
                <span>Редактировать</span>
            </div>
            <div class="opt" @click="handleDelete">
                <i class="pi pi-trash"></i>
                <span>Удалить</span>
            </div>
        </div>
    </li>

    <ModalsContainer />
</template>


<style scoped>
.item-opt {
    padding: 10px 5px;
    left: 250px;
    z-index: 999;
    width: 160px;
    position: fixed;
    background-color: white;
    box-shadow: 0 4px 13px #3030301a;
    border-radius: 7px;
}
.opt {
    display: flex;
    align-items: center;
    max-width: 150px;
    width: 100%;
    height: 30px;
    margin: 0 auto;
    padding: 5px;
    cursor: pointer;
    border-radius: 5px;
}
.opt:hover {
    background-color: var(--gray-color);
}
.opt > .pi {
    font-size: 14px;
    margin-right: 10px;
    margin-left: 5px;
}
.opt > span {
    font-size: 13px;
    color: var(--text-color);
}
.item-closed {
    width: 45px !important;
    justify-content: center;
}

.icon-closed {
    /* margin-left: 5px; */
    margin: 0 auto;
}

li {
    margin-top: 1px;
}

.item {
    height: 40px;
    width: 260px;
    padding: 10px;
    border-radius: 7px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
}

.item:hover {
    background-color: var(--gray-color);
}

.item:hover .options3-icon {
    color: black;
}

.left {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.icon {
    margin-right: 10px;
    margin-left: 5px;
}

.options3-icon {
    color: var(--white-color);
    font-size: 14px;
}

.options3-icon:hover {
    color: var(--green-btn-color) !important;
}

.name {
    color: var(--text-color);
    font-size: 13px;
}
</style>