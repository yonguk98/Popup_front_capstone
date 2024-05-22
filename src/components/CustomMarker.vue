<script setup>
import { ref, watch } from 'vue'
import { NaverMarker } from 'vue3-naver-maps'
	
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
})
	
const marker = ref(null)
	
watch(() => [marker.value], () => {
  if (!marker.value) return

  marker.value.setIcon({
    content: (
      `<div class="marker">
        <img src="${props.imageUrl}" />
      </div>`
    ),
  })
})
</script>

<template>
  <naver-marker
    :latitude="lat"
    :longitude="lng"
    @on-load="marker = $event"
  />
</template>

<style scoped></style>