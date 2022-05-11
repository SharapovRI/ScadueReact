import { useEffect, useState } from 'react';
import MapBlock from '../MapBlock/MapBlock/MapBlock';
import getCountry from '../../../api/api_requests/getCountry';
import getChildUnits from '../../../api/api_requests/getChildUnits';
import ChildsInfoTable from '../ChildsInfoTable/ChildsInfoTable/ChildsInfoTable';
import './MainPage.scss';
import getUnitInfo from '../../../api/api_requests/getUnitInfo';
import UnitDiagram from '../UnitDiagram/UnitDiagram/UnitDiagram';

const MainPage = () => {
    const [searchedCountry, setSearchedCountry] = useState("Беларусь");
    const [activeUnitName, setActiveInitName] = useState();
    const [lastResponse, setLastResponse] = useState();
    const [responseStack, setResponseStack] = useState([]);

    const [unitBuildings, setUnitBuildings] = useState([]);

    const [parentCenter, setParentCenter] = useState([]);
    const [lastParentCenter, setLastParentCenter] = useState();

    const[clickedUnit, setClickedUnit] = useState();

    useEffect(() => {
        doRequestCountry();
    }, [])

    useEffect(() => {
        if (activeUnitName && parentCenter?.length == responseStack.length) {
            doRequestChilds();
        }
    }, [activeUnitName])

    useEffect(() => {
        if (parentCenter.length > 1) {
            const lastCent = parentCenter[parentCenter.length - 2];
        }
    }, [parentCenter.length])

    function doRequestCountry() {
        async function fetchCountry() {
            const country_name = searchedCountry;
            const data = await getCountry(country_name);
            responseStack.push(data);
            setResponseStack(responseStack);
            setActiveInitName(country_name);
            setLastResponse(responseStack[responseStack.length - 1]);
            parentCenter.push([data?.centerLatitude, data?.centerLongitude])
            setParentCenter(parentCenter);
        }
        fetchCountry();
    }


    function doRequestChilds() {
        async function fetchChilds() {
            const parent_unit = activeUnitName;
            const data = await getChildUnits(parent_unit);
            responseStack.push(data);
            setResponseStack(responseStack);
            setLastResponse(responseStack[responseStack.length - 1]);
        }
        { activeUnitName && fetchChilds() }
    }

    // useEffect(() => {
    //     if (lastResponse?.length > 1) {
    //         const buildings = [];
    //         lastResponse.map((item, index) => {
    //             const query = {
    //                 adminLevel: item?.adminLevel,
    //                 unitName: item?.name,
    //             }
    //             const data = getUnitInfo(item?.adminLevel, item?.name);
    //             data.unitName = item?.name;
    //             data.population = item?.population;
    //             buildings.push(data);
    //         });
    //         setUnitBuildings(buildings);
    //     }
    // }, [lastResponse]);


    function pushCenter(coordArray) {
        parentCenter.push([coordArray[0], coordArray[1]]);
        setParentCenter(parentCenter);
    }

    function goBack() {
        console.log(responseStack);
        if (responseStack.length > 2) {
            responseStack.pop();
            setResponseStack(responseStack);
            setLastResponse(responseStack[responseStack.length - 1]);

            parentCenter.pop();
            setParentCenter(parentCenter);
            const activeUnitName = responseStack[responseStack.length - 2]?.name;
            setActiveInitName(activeUnitName);
        }
    }

    return (
        <div className="main_page_container">
            <div className="map_block">
                <MapBlock data={lastResponse} 
                    setActiveInitName={setActiveInitName} 
                    parentCenter={lastParentCenter} 
                    pushCenter={pushCenter} 
                    goBack={goBack} 
                    setClicked={setClickedUnit}
                />
            </div>
            <div className="aside_panel">
                <div className="childs_info_table">
                    <ChildsInfoTable data={lastResponse}/>
                </div>
                <div className="selected_unit_diagram">
                    <UnitDiagram unitName={clickedUnit} />
                </div>
            </div>
        </div>
    )
}

export default MainPage;