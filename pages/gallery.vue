<template>
  <div>
    <h1>Gallery</h1>
    <div v-if="pending" role="status" aria-live="polite">Loading…</div>
    <div v-else-if="error" role="alert">
      Error loading images: {{ error.message }}
    </div>
    <div v-else>
      <div
        v-for="(userGallery, index) in allByUser"
        :key="userGallery.userId"
        class="user-section"
      >
        <hr v-if="index !== 0" />
        <h2>{{ userGallery.name }}</h2>
        <p>Albums: {{ userGallery.stats?.albumCount }}</p>
        <p>Posts: {{ userGallery.stats?.postCount }}</p>
        <p>Comments: {{ userGallery.stats?.commentCount }}</p>
        <div class="gallery">
          <NuxtImg
            v-for="(img, i) in userGallery.photos"
            :key="img.id"
            :src="img.picture"
            :alt="`Photo by ${img.userName}`"
            :class="['photo', { shimmer: !loadedIds.has(img.id) }]"
            :fetchpriority="index === 0 && i < 3 ? 'high' : 'auto'"
            :loading="index === 0 && i < 3 ? 'eager' : 'lazy'"
            decoding="async"
            width="1200"
            height="800"
            sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
            @load="loadedIds.add(img.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { data, pending, error } = useFetch('/api/gallery');

const loadedIds = reactive(new Set());

const allByUser = computed(() => {
  if (!data.value) return [];
  const statsMap = Object.fromEntries(
    data.value.stats.map((s) => [s.userId, s]),
  );
  const map = data.value.photos.reduce((acc, img) => {
    if (!acc[img.userId])
      acc[img.userId] = {
        userId: img.userId,
        name: img.userName,
        photos: [],
        stats: statsMap[img.userId],
      };
    acc[img.userId].photos.push(img);
    return acc;
  }, {});
  return Object.values(map);
});

watch(error, (err) => { if (err) console.error('Failed to load images:', err); });
</script>

<style scoped>
.user-section {
  content-visibility: auto;
  contain-intrinsic-size: auto 500px;
}
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1vw;
}
@keyframes shimmer {
  0%,
  100% {
    background-color: #d1d5db;
  }
  50% {
    background-color: #e5e7eb;
  }
}
.photo {
  max-width: 100%;
  height: auto;
  object-fit: cover;
}
.shimmer {
  animation: shimmer 1.5s ease-in-out infinite;
}
</style>
