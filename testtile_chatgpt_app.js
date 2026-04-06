$httpClient.get({
  url: "https://ios.chat.openai.com/public-api/conversation_limit",
  headers: { "Accept": "application/json" },
  timeout: 8
}, function(error, response, data) {
  const status = response?.status || response?.statusCode || 0;
  const ok = !error && status >= 200 && status < 400;

  $done({
    content: ok ? "Available" : "Unavailable",
    backgroundColor: ok ? "#88A788" : "",
  });
});
