import axios from 'axios';


const api = axios.create({
  baseURL: "http://localhost:3000/", 
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3IiOiJ7XCJpZFwiOlwiOWQwNGE1MzItYzRjMy00MGVhLTgwNmMtZWYwN2ZjMzczOTJkXCIsXCJlbWFpbFwiOlwiZXhhbXAxMWxlQGV4YW1wbGUyMjEuY29tXCIsXCJ1c2VybmFtZVwiOlwiSm9obiBEb2VcIn0iLCJpYXQiOjE3MzI5NDYzOTQsImV4cCI6MTczMjk0ODE5NH0.zBVQuPrt-BPLsDHNdSTkVy4U3myFS2DmIK_T_d92WaM" ,
  },
});

export default api;
