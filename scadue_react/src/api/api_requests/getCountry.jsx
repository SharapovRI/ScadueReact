import axios from "axios";
import baseURL from "../consts";

const getCountry = async (country_name) => {
    return await axios.get(`${baseURL}AdministrativeUnits/Country/${country_name}`).then(response => response.data).catch(error => console.log(error));
}

export default getCountry;