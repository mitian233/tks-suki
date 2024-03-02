<script setup lang="ts">
const showTop = ref<Boolean>(true)
</script>

<template>
  <div class="absolute w-full">
  <TransitionGroup name="list">
    <div v-if="showTop" class="bg-black py-1 px-[10vw] text-center text-white flex justify-between" key="0">
      <div style="width: 1em"></div>
      <p>ようこそ</p>
      <button @click="showTop = false">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>
    </div>
    <div class="w-full p-3 top-0 sticky backdrop-blur bg-white/25 flex border-b justify-between items-center" key="1">
      <NuxtLink to="/">
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m15 18-6-6 6-6"/>
        </svg>
      </NuxtLink>
      <h1 class="text-xl">
        カード一覧
      </h1>
      <div style="width: 35px"></div>
    </div>
    <div class="min-h-screen px-[10vw] pt-3" key="2">
      <div>Page WIP</div>
    </div>
  </TransitionGroup>
  </div>
</template>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.list-leave-active {
  position: absolute;
  width: 100%;
}
</style>
