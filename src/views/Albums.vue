<template>
  <div class="AlbumDetails-container">
    <h2 class="title">Choose Album:</h2>
    <select v-model="selectedAlbum" @change="fetchPhotos" class="select-album">
      <option disabled value="">Please select an album</option>
      <option v-for="album in albums" :key="album.id" :value="album.id">{{ album.title }}</option>
    </select>
    <h2 class="title">Photos in Album {{ selectedAlbum }}</h2>
    <table v-if="photos.length" class="photos-table">
      <thead>
        <tr>
          <th>Thumbnail</th>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="photo in photos" :key="photo.id">
          <td><img :src="photo.thumbnailUrl" :alt="photo.title" /></td>
          <td>{{ photo.title }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useAlbumStore } from '../stores/AlbumStore';

export default {
  name: 'AlbumDetail',
  setup() {
    const selectedAlbum = ref('');
    const albums = ref([]);
    const photos = ref([]);
    const albumStore = useAlbumStore();

    const fetchAlbums = async () => {
      await albumStore.fetchAlbums();
      albums.value = albumStore.albums;
    };

    const fetchPhotos = async () => {
      if (selectedAlbum.value) {
        await albumStore.fetchPhotos(selectedAlbum.value);
        photos.value = albumStore.photos;
      }
    };

    onMounted(fetchAlbums);

    return {
      selectedAlbum,
      albums,
      photos,
      fetchPhotos
    };
  }
};
</script>

<style scoped>
.AlbumDetails-container {
  max-width: 600px;
  margin: 40px auto;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); 
  background-color: #e9a0da; 
}

.title {
  color: #333;
  text-align: center;
  font-weight: bold;
}

.select-album {
  margin: 0 auto;
  display: block;
}

.photos-table {
  margin: 0 auto;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;
}

.thumbnail {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border: 1px solid #007bff;
  border-radius: 5px;
  cursor: pointer;
  transition: border-color 0.3s;
}

.no-photos {
  text-align: center;
  margin-top: 20px;
}

.no-photos p {
  font-size: 18px;
}
</style>
