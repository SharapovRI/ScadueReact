import MapBlock from '../MapBlock/MapBlock/MapBlock';
import './MainPage.scss';

const MainPage = () => {
    return(
        <div className="main_page_container">
            <div className="map_block">
                <MapBlock/>
            </div>
            <div className="aside_panel">

            </div>
        </div>
    )
}

export default MainPage;