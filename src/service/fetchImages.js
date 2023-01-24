import axios from 'axios';

const params = {
  key: '31662888-485c328889ccd569f357119c9',
  options: '&image_type=photo&orientation=horizontal&safesearch=true',
};
axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function fetchImages(query, page) {
  const resp = await axios.get(
    `?key=${params.key}&q=${query}${params.options}&per_page=12&page=${page}`
  );
  if (resp.data.hits.length === 0 ) {
    throw new Error();
  } else {
    return resp.data;
  }
}
