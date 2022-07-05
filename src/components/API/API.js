const API_KEY = '25182566-6d97045846fa1b6cae2a84492';
const BASE_URL = 'https://pixabay.com';

export const fetchQuery = (nextSearchQuery, page) =>
  fetch(
    `${BASE_URL}/api/?q=${nextSearchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error(`Nothing found on the topic ${nextSearchQuery}`)
    );
  });