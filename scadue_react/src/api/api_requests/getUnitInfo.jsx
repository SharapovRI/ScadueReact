import axios from "axios";
import baseURL from "../consts";

const getUnitInfo = async (adminLevel, unitName) => {
    return await axios.get(`${baseURL}UnitInfo?adminLevel=${adminLevel}&unitName=${unitName}`).then(response => response.data).catch(error => console.log(error));
}

export default getUnitInfo;