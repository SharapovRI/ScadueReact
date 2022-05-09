import axios from "axios";
import baseURL from "../consts";

const getChildUnits = async (unit_name) => {
    return await axios.get(`${baseURL}AdministrativeUnits/ChildUnits/${unit_name}`).then(response => response.data).catch(error => console.log(error));
}

export default getChildUnits;