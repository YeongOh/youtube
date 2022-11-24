export default class Youtube {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async search(keyword) {
    return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
  }

  async channelImageURL(id) {
    return this.apiClient
      .channels({ params: { part: 'snippet', id } })
      .then((res) => res.data.items[0].snippet.thumbnails.default.url);
  }

  async relatedVideos(id) {
    return this.apiClient
      .search({
        params: {
          part: 'snippet',
          maxResults: 25,
          type: 'video',
          relatedToVideoId: id,
        },
      })
      .then((res) =>
        res.data.items.map((item) => ({ ...item, id: item.id.videoId }))
      );
  }

  // # <-- private function, can only be called within this class
  async #searchByKeyword(keyword) {
    console.log('fetching');
    return this.apiClient
      .search({
        params: {
          part: 'snippet',
          maxResults: 25,
          type: 'video',
          q: keyword,
        },
      })
      .then((res) =>
        res.data.items.map((item) => ({ ...item, id: item.id.videoId }))
      );
  }

  async #mostPopular() {
    console.log('fetching');
    return this.apiClient
      .videos({
        params: {
          part: 'snippet',
          maxResults: 25,
          chart: 'mostpopular',
        },
      })
      .then((res) => res.data.items);
  }
}

//   fetch example
//
//   const {
//     isLoading,
//     error,
//     data: videos,
//   } = useQuery(['videos', keyword], async () => {
//     return fetch(`/videos/${keyword ? 'search' : 'popular'}.json`)
//       .then((res) => res.json())
//       .then((data) => data.items);
//   });