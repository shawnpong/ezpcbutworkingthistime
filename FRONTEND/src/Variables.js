// export const variables = {
//     // API_URL:"http://127.0.0.1:8000/"
//     API_URL:"https://ezpcdjango.onrender.com/"
// }

export const variables = {
    API_URL: process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8000/' : 'https://ezpcdjango.onrender.com/'
};
  