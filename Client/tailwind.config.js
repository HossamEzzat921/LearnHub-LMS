/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", // الصفحة الرئيسية بره
    "./pages/**/*.html", // أي صفحة html جوه فولدر pages أو أي فولدر فرعي تحته
    "./src/**/*.{html,js}", // أي ملف في السورس
    "./components/**/*.html", // لو عملتوا فولدر كومبوننتس
    "./**/*.{html,js}", // (احتياطي) أي ملف html في أي حتة في المشروع
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
