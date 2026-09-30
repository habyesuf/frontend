# LMS frontend (React + Vite)

    npm install
    npm run dev        # http://localhost:5173

Set the API address in `.env` (`VITE_API_URL`). Django needs `django-cors-headers`
allowing `http://localhost:5173`.

Expected API shapes are listed at the top of `src/api/courses.js` usage in each page;
adjust field names there if your serializers differ.
