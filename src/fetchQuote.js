const fetchQuote = async () => {
  const URL = 'https://api.quotable.io/random';

  try {
    const response = await fetch(URL);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export default fetchQuote;
