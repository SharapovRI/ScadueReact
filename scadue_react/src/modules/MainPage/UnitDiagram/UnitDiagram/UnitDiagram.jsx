import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import React, { Component } from 'react'

import 'echarts/lib/echarts';
// Импортировать круговую диаграмму
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react'
// Представляем стиль css
//import styles from './Echarts.module.scss'
import getUnitInfo from '../../../../api/api_requests/getUnitInfo';
import { Chart, ArcElement } from 'chart.js'
import './UnitDiagram.scss';

const UnitDiagram = ({ unitName }) => {
    const [unitInfo, setUnitInfo] = useState();
    const [dataset, setDataSet] = useState();

    useEffect(() => {
        async function fetchInfo() {
            if (unitName) {
                const data = await getUnitInfo(0, unitName);
                setUnitInfo(data);
            }
        }

        fetchInfo();
    }, [unitName]);

    useEffect(() => {
        if (unitInfo?.buildings){
            const data = [];
            console.log(unitInfo);
            unitInfo.buildings.map((item) => {
                const dataEd = {
                    value: item?.count,
                    name: item?.class,
                }
                data.push(dataEd);
            })
            setDataSet(data);
            console.log(data);
        }
    },[unitInfo])

    
    const getEchartAge = ()=>{
        const a = dataset;
        console.log(a);
        let option = {
            title: {
                text: unitName || "Выберите область",
                left: 'center'
              },
              tooltip: {
                trigger: 'item'
              },
              legend: {
                orient: 'horizontal',
                top: 'bottom',
              },
              series: [
                {
                  name: 'Buildings type',
                  type: 'pie',
                  radius: '50%',
                  data: dataset,
                  emphasis: {
                    itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }
              ]
        };
        return option;
    }

    return (
        <>
            {dataset && <ReactEcharts option={getEchartAge()}/>}
        </>
    )
}

export default UnitDiagram;