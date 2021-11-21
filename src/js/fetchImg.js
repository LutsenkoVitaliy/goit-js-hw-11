import axios from "axios";

export default class ImagesApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    async fetchItemByName() {
        const BASE_URL = 'https://pixabay.com';
        const getAPI = await axios.get(`${BASE_URL}/api/?key=24021062-33a986e16cffce2cd7c29eb8f&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`)
        this.incrementPage();

        return getAPI;
    }


    resetPage() {
        this.page = 1;
    }

    incrementPage() {
        this.page += 1;
    }

    decrementPage() {
        this.page -= 1;
    }



}