const allowedOrigins = [
  "http://localhost:3000",
  "https://verbose-space-trout-jj5x654r59553q7vj-3000.app.github.dev",
  "https://ai-interviewer.vercel.app" // add your future frontend domain
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like curl or Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS origin not allowed"));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);
