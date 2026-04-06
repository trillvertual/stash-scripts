$httpClient.get({
  url: "https://gemini.google.com/generate_204",
  timeout: 8
}, function(error, response, data) {
  const status = response?.status || response?.statusCode || 0;
  const ok = !error && status >= 200 && status < 400;

  $done({
    content: ok ? "Available" : "Unavailable",
    backgroundColor: ok ? "#88A788" : "",
  });
});
