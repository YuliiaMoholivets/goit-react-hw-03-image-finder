function fetchImages(keyWord, page) {
  return fetch(
    `https://pixabay.com/api/?q=${keyWord}&page=${page}&key=31851558-820ac2f97dae79a9951146e00&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (!response.ok) {
      return Promise.reject(new Error(`No images for keyword ${keyWord}`));
    }
    const getNormalazedImages = images =>
      images.map(({ id, webformatURL, largeImageURL }) => ({
        id,
        webformatURL,
        largeImageURL,
      }));
    return response.json().then(({ getNormalazedImages, totalHits }) => ({
      images: getNormalazedImages,
      totalImages: totalHits,
    }));
  });
}

export default fetchImages;
