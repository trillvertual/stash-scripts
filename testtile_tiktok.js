const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36";

async function request(method, params) {
  return new Promise((resolve) => {
    $httpClient[method.toLowerCase()](params, (error, response, data) => {
      resolve({ error, response, data });
    });
  });
}

async function main() {
  const { error, response, data } = await request("GET", {
    url: "https://www.tiktok.com/",
    headers: { "User-Agent": UA, "Accept": "text/html,*/*;q=0.8", "Accept-Language": "en-US,en;q=0.9" },
    timeout: 8,
  });

  if (error || !response || !data) {
    $done({ content: "Unavailable", backgroundColor: "" });
    return;
  }

  const status = response.status || response.statusCode || 0;
  const body = data.toLowerCase();
  const blocked = body.includes("not available in your region") || body.includes("not available in your country");

  const ok = status >= 200 && status < 400 && !blocked;

  $done({
    content: ok ? "Available" : "Unavailable",
    backgroundColor: ok ? "#88A788" : "",
  });
}

(async () => { main().catch(() => $done({})); })();
