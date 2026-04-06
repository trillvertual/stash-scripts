const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36";

async function request(method, params) {
  return new Promise((resolve) => {
    $httpClient[method.toLowerCase()](params, (error, response, data) => {
      resolve({ error, response, data });
    });
  });
}

async function main() {
  const { error, response } = await request("GET", {
    url: "https://www.youtube.com/generate_204",
    headers: { "User-Agent": UA },
    timeout: 8,
  });

  if (error || !response) {
    $done({ content: "Unavailable", backgroundColor: "" });
    return;
  }

  const status = response.status || response.statusCode || 0;

  $done({
    content: status >= 200 && status < 400 ? "Available" : "Unavailable",
    backgroundColor: status >= 200 && status < 400 ? "#88A788" : "",
  });
}

(async () => { main().catch(() => $done({})); })();
