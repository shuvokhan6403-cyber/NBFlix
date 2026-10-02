exports.handler = async function (event) {
  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "TMDB API key missing" })
    };
  }

  const endpoint =
    event.queryStringParameters?.endpoint || "/trending/all/week";

  const url = new URL(`https://api.themoviedb.org/3${endpoint}`);
  url.searchParams.set("api_key", apiKey);

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: response.status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "TMDB request failed" })
    };
  }
};
