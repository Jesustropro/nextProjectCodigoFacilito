const BASE_URL = "https://api.quotable.io/quotes/random";

const fetcher = async (queryParams?: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}${queryParams?.length ? queryParams : ""}`
    );
    const data = await response.json();
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};
export default fetcher;
