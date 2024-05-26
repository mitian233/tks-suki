<script setup lang="ts">
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

const haveNormalCard = ref<Boolean>(false)
const haveTrainedCard = ref<Boolean>(false)
const resourceSetName = ref<String>('')
const dialogOpen = ref<Boolean>(false)
const onHover = ref<Boolean>(false)
const dataCache = ref<any>({})
// const cardInfoState = useState('cardInfoState')
const showHoverNotice = useCookie('hoverStatus', {expires: new Date(Date.now() + 1000 * 60 * 60 * 24)})
const isLoading = ref<Boolean>(true)
const {pending: isFetchLoading, data: imgData} = await useFetch('/api/dailyImg', {lazy: true, server: false})
if (showHoverNotice.value === undefined) {
  showHoverNotice.value = 'true'
}

const getCardPic = (data: any) => {
  resourceSetName.value = data.resourceSetName
  if (data.type === 'birthday') {
    haveNormalCard.value = false
    haveTrainedCard.value = true
  } else if (data.stat.training) {
    haveNormalCard.value = true
    haveTrainedCard.value = true
  } else {
    haveNormalCard.value = true
    haveTrainedCard.value = false
  }
}

const getDate = (timeStamp: number) => {
  const date = new Date();
  date.setTime(timeStamp);
  const locale = 'ja-JP'
  return date.toLocaleDateString(locale, {year: 'numeric', month: 'long', day: 'numeric'})
}

// if(cardInfoState.value === undefined) {
//   await callOnce(async () => {cardInfoState.value = await $fetch<{ generatedDate: number, todayImgData: any }>('/api/dailyImg')})
//   getCardPic(cardInfoState.value)
//   isLoading.value = false
// } else {
//   getCardPic(cardInfoState.value)
//   isLoading.value = false
// }

watch(imgData, (newVal, oldVal) => {
  getCardPic((newVal as { generatedDate: number, todayImgData: any })?.todayImgData)
  dataCache.value = newVal
  isLoading.value = false
})

// useHead({
//   link: [
//     (haveNormalCard? {rel: 'prefetch', as: 'image', type: 'image/png', href: '/api/getImg?resourceSetName='+resourceSetName.value+'&afterTraining=true'} : {}),
//     (haveTrainedCard? {rel: 'prefetch', as: 'image', type: 'image/png', href: '/api/getImg?resourceSetName='+resourceSetName.value+'&afterTraining=false'} : {}),
//   ]
// })
</script>
.//
<template>
  <div class="absolute min-h-full w-full">
    <div v-if="!isLoading" class="absolute top-2 right-2 z-20">
      <button @click="dialogOpen = true">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 16v-4"/>
          <path d="M12 8h.01"/>
        </svg>
      </button>
      <NuxtLink to="/allcards">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="1"/>
          <circle cx="12" cy="5" r="1"/>
          <circle cx="12" cy="19" r="1"/>
        </svg>
      </NuxtLink>
      <TransitionRoot appear :show="dialogOpen.valueOf()" as="template">
        <Dialog as="div" @close="dialogOpen = false" class="relative z-30">
          <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100"
              leave-to="opacity-0"
          >
            <div class="fixed inset-0 bg-black/25 backdrop-blur-lg"/>
          </TransitionChild>
          <div class="fixed inset-0 overflow-y-auto">
            <div class="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                  as="template"
                  enter="duration-300 ease-out"
                  enter-from="opacity-0 scale-95"
                  enter-to="opacity-100 scale-100"
                  leave="duration-200 ease-in"
                  leave-from="opacity-100 scale-100"
                  leave-to="opacity-0 scale-95"
              >
                <DialogPanel
                    class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                >
                  <DialogTitle
                      as="h3"
                      class="text-lg font-medium leading-6 text-gray-900"
                  >
                    まいにちつーちゃん
                  </DialogTitle>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">毎日更新される二葉つくしのカード画像を表示します。</p>
                    <p class="text-sm text-gray-500">API が提供されています。API
                      ドキュメントを完成までお待ちください。</p>
                  </div>
                  <div class="mt-4 flex justify-end">
                    <button
                        type="button"
                        class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        @click="dialogOpen = false"
                    >
                      閉じる
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
    </div>
    <Transition name="fade">
      <div v-if="!isLoading && (showHoverNotice === 'true')"
           class="absolute h-[100lvh] w-full z-20 flex flex-col justify-center items-center blackbg"
           @mouseenter="showHoverNotice='false'">
        <h1 class="text-5xl text-white">Hover here</h1>
      </div>
    </Transition>
    <div class="absolute h-[100lvh] w-full overflow-hidden z-10" @mouseenter="onHover=true" @mouseleave="onHover=false">
      <Transition name="fade" mode="out-in">
        <div v-if="isLoading" class="h-[100lvh] w-full flex flex-col justify-center items-center">
          <img src="~/assets/loading.png" class="loading-animation"/>
          <p>お待ちください</p>
        </div>
        <div v-else-if="haveNormalCard && !haveTrainedCard"
             class="h-[100lvh] w-full overflow-hidden grid place-items-center">
          <img class="h-full md:w-full absolute object-cover hover-effect"
               :src="'/api/getImg?resourceSetName='+resourceSetName+'&afterTraining=false'" alt="normal card"/>
        </div>
        <div v-else-if="haveTrainedCard && !haveNormalCard"
             class="h-[100lvh] w-full overflow-hidden grid place-items-center">
          <img class="h-full md:w-full absolute object-cover hover-effect"
               :src="'/api/getImg?resourceSetName='+resourceSetName+'&afterTraining=true'" alt="trained card"/>
        </div>
        <div v-else class="h-[100lvh] w-full grid place-items-center overflow-hidden">
          <Transition name="fade-2">
            <img v-if="!onHover" class="absolute h-full md:w-full object-cover"
                 :src="'/api/getImg?resourceSetName='+resourceSetName+'&afterTraining=false'" alt="normal card"/>
            <img v-else class="absolute h-full md:w-full object-cover"
                 :src="'/api/getImg?resourceSetName='+resourceSetName+'&afterTraining=true'" alt="trained card"/>
          </Transition>
        </div>
        <!--      <div v-else
                   class="h-[100lvh] w-full grid grid-cols-1 grid-rows-2 md:grid-rows-1 md:grid-cols-2 place-items-center" @mouseenter="onHover=true" @mouseleave="onHover=false">
                <div class="h-full w-full overflow-hidden grid place-items-center">
                  <img class="h-full object-cover hover-effect"
                       :src="'/api/getImg?resourceSetName='+resourceSetName+'&afterTraining=false'" alt="normal card"/>
                </div>
                <div class="h-full w-full overflow-hidden grid place-items-center">
                  <img class="h-full object-cover hover-effect"
                       :src="'/api/getImg?resourceSetName='+resourceSetName+'&afterTraining=true'" alt="trained card"/>
                </div>
              </div>-->
      </Transition>
    </div>
    <Transition name="fade" mode="out-in">
      <div v-if="!isLoading" class="absolute z-20 bottom-10 left-[50%] translate-x-[-50%] flex flex-row justify-center">
        <div
            class="px-5 py-2 text-center rounded-lg backdrop-blur-lg hover:opacity-0 ease-in-out duration-200 border-[1px] bg-white/25">
          <p>{{ getDate(dataCache?.generatedDate) }}</p>
          <h1 class="text-xl">{{ dataCache?.todayImgData.prefix[0] }}</h1>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.fade-2-enter-active,
.fade-2-leave-active {
  transition: all 0.6s;
}

.fade-2-enter-from,
.fade-2-leave-to {
  opacity: 0;
  filter: blur(1rem);
  transform: scale(105%);
}

.hover-effect {
  transition: all 0.4s;
}

.hover-effect:hover {
  transform: scale(105%);
  filter: blur(0.1rem);
}

.blackbg::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: -1;
}

.loading-animation {
  animation: loadingAnimation 1.5s ease infinite;
}

@keyframes loadingAnimation {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.15);
  }
  100% {
    transform: scale(1);
  }
}
</style>
