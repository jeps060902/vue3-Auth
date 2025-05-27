import axios from "axios";
const Api = axios.create({
    baseURL:'http://pa_api_auth.test'
}
)
export default Api