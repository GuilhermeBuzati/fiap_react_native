import axios from 'axios';


const api = axios.create({
  baseURL: "http://localhost:3000/", 
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3IiOiJ7XCJpZFwiOlwiYzFjMDIyMWItNDM0Ni00NTQ0LWIwYzQtMDFiMDcxNWJiOGQ3XCIsXCJlbWFpbFwiOlwiZXhhbXBsZUBleGFtcGxlMS5jb21cIixcInVzZXJuYW1lXCI6XCJKb2huIERvZVwifSIsImlhdCI6MTczMjk0MTUyNCwiZXhwIjoxNzMyOTQzMzI0fQ.c6EOpE1Aq_IVLbAXyIHmNbnFxADXszAYtFK0xOVGGjs" ,
  },
});

export default api;
