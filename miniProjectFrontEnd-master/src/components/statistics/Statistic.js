import React from 'react'
import { StatiContextWrap } from '../../context/statiContext'


import { Cards } from './Cards/Cards';
import CountryPicker from './CountryPicker/CountryPicker';
import { Worldmap } from './map/map'
import Chart from './Chart/Chart';

import statisticStyle from './statistic.module.css';
import styles from './statistic.module.css';


function Statistic() {
    return (
        < React.Fragment  >
            <StatiContextWrap>

                <div className={statisticStyle.container} >

                    <Cards />
                    <CountryPicker />
                    <Worldmap />
                    <Chart />
                </div>
            </StatiContextWrap>
        </React.Fragment>
    )
}

export default Statistic;
