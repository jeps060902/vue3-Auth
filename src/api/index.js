import axios from "axios";
const Api = axios.create({
    baseURL:'http://pa_auth_jwt.test'
}
)
export default Api