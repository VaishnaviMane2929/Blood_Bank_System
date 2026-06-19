import axios from "axios";

const API =
"http://localhost:5000/api/reports";

export const getReports =
async () => {
const res =
await axios.get(API);

return res.data;
};