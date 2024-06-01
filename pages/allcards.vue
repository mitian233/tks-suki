<script setup lang="ts">
const showTop = ref<Boolean>(true)
const router = useRouter()

const {data: listData} = await useFetch<{ generatedDate: number, char29Data: any }>('/api/getImgArray')

const backToPrevious = () => {
  return router.go(-1)
}
</script>

<template>
  <div class="absolute w-full">
  <TransitionGroup name="list">
    <div v-if="showTop" class="relative z-10 bg-black py-1 px-[10vw] text-center text-white flex justify-between" key="0">
      <div style="width: 1em"></div>
      <p>ようこそ</p>
      <button @click="showTop = false">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>
    </div>
    <div class="z-10 w-full p-3 top-0 sticky backdrop-blur bg-white/25 flex border-b justify-between items-center" key="1">
      <button @click="backToPrevious">
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m15 18-6-6 6-6"/>
        </svg>
      </button>
      <h1 class="text-xl">
        カード一覧
      </h1>
      <div style="width: 35px"></div>
    </div>
    <div class="min-h-[95vw] mb-[5vw] px-[10vw] pt-3 grid gap-3 md:gap-0" key="2">
      <div v-for="(data, index) in listData?.char29Data.toReversed()" :id="'c-'+index" :class="'flex flex-col-reverse ' + ( index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse' ) + ' md:justify-between md:items-center'">
        <div :class="'mt-3 md:mt-0 text-center ' + ( index % 2 === 0 ? 'md:text-left' : 'md:text-right')">
          <h1 class="text-xl md:text-3xl">{{ data.prefix[0] }}</h1>
          <p>{{ data.prefix[1] }}</p>
        </div>
        <div v-if="data.type === 'birthday'" class="card-pic">
          <img class="absolute w-full" :src="'/api/getImg?resourceSetName='+data.resourceSetName+'&afterTraining=true'" alt="after"/>
        </div>
        <div v-else-if="data.stat.training" class="card-pic">
          <img class="absolute w-full" :src="'/api/getImg?resourceSetName='+data.resourceSetName+'&afterTraining=true'" alt="after"/>
          <img class="absolute w-full hover:opacity-0 hover:scale-110 hover:blur-sm duration-200" :src="'/api/getImg?resourceSetName='+data.resourceSetName+'&afterTraining=false'" alt="before"/>
        </div>
        <div v-else class="card-pic">
          <img class="absolute w-full" :src="'/api/getImg?resourceSetName='+data.resourceSetName+'&afterTraining=false'" alt="before"/>
        </div>
      </div>
    </div>
  </TransitionGroup>
  </div>
</template>

<style scoped>
.card-pic{
  position: relative;
  width: 100%;
  aspect-ratio: 4/3;
  overflow: hidden;
  @apply rounded-2xl shadow-xl
}

@media (min-width: 768px) {
  .card-pic {
    width: 25vw;
  }
}

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
