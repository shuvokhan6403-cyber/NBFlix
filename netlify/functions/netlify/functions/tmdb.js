exports.handler = async (event) => {
  try {
    const params = event.queryStringParameters || {};
    const endpoint = params.endpoint || "/movie/popular";

    if (!endpoint.startsWith("/") || endpoint.includes("..")) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid endpoint" })
      };
    }

    const query = { ...params };
    delete query.endpoint;

    const url = new URL(`https://api.themoviedb.org/3${endpoint}`);
    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });

    url.searchParams.set("api_key", process.env.TMDB_API_KEY);

    const response = await fetch(url);
    const data = await response.text();

    return {
      statusCode: response.status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: data
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "TMDB request failed" })
    };
  }
};
