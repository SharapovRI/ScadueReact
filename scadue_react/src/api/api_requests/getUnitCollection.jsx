import axios from "axios";
import baseURL from "../consts";

const getUnitCollection = async (payload) => {
    return await axios.post(`${baseURL}UnitCollectionInfo`, payload).then(response => response.data).catch(error => console.log(error));
}

export default getUnitCollection;