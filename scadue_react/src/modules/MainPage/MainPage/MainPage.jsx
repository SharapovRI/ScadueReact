import { useEffect, useState } from 'react';
import MapBlock from '../MapBlock/MapBlock/MapBlock';
import getCountry from '../../../api/api_requests/getCountry';
import getChildUnits from '../../../api/api_requests/getChildUnits';
import './MainPage.scss';

const MainPage = () => {
    const [searchedCountry, setSearchedCountry] = useState("Беларусь");
    const [activeUnitName, setActiveInitName] = useState();
    const [lastResponse, setLastResponse] = useState();
    const [responseStack, setResponseStack] = useState([]);

    useEffect(() => {
        doRequestCountry();
    }, [])

    useEffect(() => {
        {activeUnitName && doRequestChilds()}
    }, [activeUnitName])

    function doRequestCountry() {
        async function fetchCountry() {
            const country_name = searchedCountry;
            const data = await getCountry(country_name);
            responseStack.push(data);
            setResponseStack(responseStack);
            setActiveInitName(country_name);
            setLastResponse(responseStack[responseStack.length - 1]);
        }
        fetchCountry();
    }


    function doRequestChilds() {
        async function fetchChilds() {
            const parent_unit = activeUnitName;
            const data = await getChildUnits(parent_unit);
            responseStack.push(data);
            console.log("childsStack");
            console.log(responseStack.length);
            setResponseStack(responseStack);
            setLastResponse(responseStack[responseStack.length - 1]);
        }
        {activeUnitName && fetchChilds()}
    }

    return (
        <div className="main_page_container">
            <div className="map_block">
                <MapBlock data={lastResponse}/>
            </div>
            <div className="aside_panel">
                <button onClick={() => console.log(responseStack)}>QQQQQQQQQQQQ</button>
                <div className="childs_info_table">

                </div>
                <div className="selected_unit_diagram">
                    
                </div>
            </div>
        </div>
    )
}

export default MainPage;