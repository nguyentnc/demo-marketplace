module.exports = {
  plugins: {
    "tailwindcss/nesting": "postcss-nested",
    "postcss-import": {},
    tailwindcss: {},
    autoprefixer: {},
    "postcss-preset-env": {
      features: { "nesting-rules": false },
    },
  },
};
