const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3/",
  apiKey: "0afedb678eef90e6cd8307a8f3385bce",
  access_token: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYWZlZGI2NzhlZWY5MGU2Y2Q4MzA3YThmMzM4NWJjZSIsInN1YiI6IjYyOGU1ZGFkN2Q1ZGI1MTBhNTE3ODAzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TwBbjW-vG1UB2H8Z7y7lmzUlSU8cRRWsFuT_ygBijrY',
  originalImage: (imagePath) =>
    `https://image.tmdb.org/t/p/original/${imagePath}`,
  w500Image: (imagePath) => `https://image.tmdb.org/t/p/w500/${imagePath}`,
};

export default apiConfig;
