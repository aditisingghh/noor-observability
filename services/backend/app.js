const express = require("express");
const client = require("prom-client");

const app = express();

// collect default system metrics
client.collectDefaultMetrics();

// custom metric: total requests
const requestCounter = new client.Counter({
    name: "app_requests_total",
    help: "Total number of requests",
});

// custom metric: request latency
const requestDuration = new client.Histogram({
    name: "app_request_duration_seconds",
    help: "Request latency",
    buckets: [0.1, 0.5, 1, 2, 5],
});

// middleware
app.use((req, res, next) => {
    const end = requestDuration.startTimer();
    requestCounter.inc();

    // 🔥 LOGGING (important for Loki)
    console.log(`API hit: ${req.method} ${req.url}`);

    res.on("finish", () => {
        end();
    });

    next();
});

// test API
app.get("/api", (req, res) => {
    console.log("API called 🚀");   // 🔥 THIS is what you'll search in Loki
    res.json({ message: "working 🚀" });
});

// metrics endpoint
app.get("/metrics", async (req, res) => {
    res.set("Content-Type", client.register.contentType);
    res.end(await client.register.metrics());
});

app.listen(4000, () => {
    console.log("Server running on port 4000");
});