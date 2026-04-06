const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36";

$httpClient.get({
  url: "https://www.netflix.com/title/80018499",
  headers: { "User-Agent": UA, "Accept": "text/html,*/*;q=0.8" },
  timeout: 8
}, function(error, response, data) {
  const status = response?.status || response?.statusCode || 0;
  const body = (data || "").toLowerCase();
  const blocked = status === 403 || body.includes("not available in your region") || body.includes("not yet available in your country");
  const ok = !error && status >= 200 && status < 400 && !blocked;

  $done({
    content: ok ? "Available" : "Unavailable",
    backgroundColor: ok ? "#88A788" : "",
  });
});
