import './sass/main.scss';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import  ImagesApiService  from './js/fetchImg';
import {getRefs} from './js/getRefs';
import renderImg  from './js/render-img';

const refs = getRefs();
const imagesApiService = new ImagesApiService();
refs.loadMoreBtn.classList.add('is-hidden');

refs.searchForm.addEventListener('submit', onSearch)
refs.loadMoreBtn.addEventListener('click', onSearchMore)

async function onSearch(e) {
    e.preventDefault();
    imagesApiService.resetPage();
    imagesApiService.searchQuery = e.currentTarget.elements.query.value;
    refs.gallery.innerHTML = '';

    if (imagesApiService.searchQuery === '') {
        refs.gallery.innerHTML = '';
        refs.loadMoreBtn.classList.add('is-hidden');
        return Notiflix.Notify.failure('Please enter your search data.')
    }
     await imagesApiService.fetchItemByName().then(response => {
         const hitsImgLength = response.data.hits.length;
        if (hitsImgLength === 0) {
        refs.loadMoreBtn.classList.add('is-hidden');
        refs.gallery.innerHTML = '';
        return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        }

        Notiflix.Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
        renderImg(response);
        refs.loadMoreBtn.classList.remove('is-hidden');
    })
      e.target.reset();
};

async function onSearchMore() {
    imagesApiService.fetchItemByName().then(response => {
        const hitsImgLength = response.data.hits.length;
        console.log(hitsImgLength);
        if (40 > hitsImgLength) {
            refs.loadMoreBtn.classList.add('is-hidden');
            Notiflix.Notify.success("We're sorry, but you've reached the end of search results.");
        }
        renderImg(response);
    });
}





