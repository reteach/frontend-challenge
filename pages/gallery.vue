<template>
  <div>
    <h2>Gallery</h2>
    <div v-if="pending">Loading…</div>
    <div v-else-if="error">Error loading images: {{ error.message }}</div>
    <div v-else>
      <div
        v-if="Object.keys(sortByUser).length !== 0"
        v-for="(userGallery, index) in Object.values(sortByUser)"
        :key="index"
      >
        <hr v-if="index !== 0" />
        <h2>{{ userGallery.name }}</h2>
        <div class="gallery">
          <template v-for="img in userGallery.photos" :key="img.id">
            <img :src="img.picture" :alt="img.title" class="photo" />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const {
  data: images,
  pending,
  error,
} = await useFetch('/api/gallery', { lazy: true });

const sortByUser = computed(() =>
  images.value.reduce((acc, img) => {
    if (!acc[img.userId]) {
      acc[img.userId] = { name: img.userName, photos: [] };
    }
    acc[img.userId].photos.push(img);
    return acc;
  }, {})
);

if (error.value) {
  console.error('Failed to load images:', error.value);
}
</script>

<style scoped>
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1svw;
}
.img-gallery {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.photo {
  max-width: 100%;
  height: auto;
  object-fit: cover;
}
</style>
