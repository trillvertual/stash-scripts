const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36";

$httpClient.get({
  url: "https://www.reddit.com/r/popular.json?limit=1&raw_json=1",
  headers: { "User-Agent": UA, "Accept": "application/json", "Referer": "https://www.reddit.com/" },
  timeout: 8
}, function(error, response, data) {
  const status = response?.status || response?.statusCode || 0;
  let ok = false;

  if (!error && status >= 200 && status < 400) {
    try {
      ok = !!JSON.parse(data)?.data?.children;
    } catch {}
  }

  $done({
    content: ok ? "Available" : "Unavailable",
    backgroundColor: ok ? "#88A788" : "",
  });
});
