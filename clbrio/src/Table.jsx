import React, { useEffect, useState } from 'react';
import { FixedSizeGrid as Grid } from 'react-window';


const EXOPLANET_ENDPOINT = "https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=cumulative&format=json";

function Table() {
    const [state, setState] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [sortNameAsc, setSortNameAsc] = useState(true)
    const [sortScoreAsc, setSortScoreAsc] = useState(true)

    useEffect(function effectFunction() {
        async function fetchState() {
            const response = await fetch(EXOPLANET_ENDPOINT);
            const json = await response.json();
            setState(json);
            setIsLoading(false)
        }
        fetchState();
    }, []);

    const headers = ["kepid", "kepler_name", "koi_score", "koi_period", "ra_str", "koi_kepmag"];
    const Row = (INOBJECT) => {
        const { columnIndex, rowIndex, style } = INOBJECT;
        return(
        isLoading? null:
        <div className="rowEntry" style={style}>
            {headers.map((header, index) => {
                if (!state[rowIndex] || !state[rowIndex][header]) {
                    return (
                        <span className="rowSection" key={index}>
                            none
                        </span>
                    )
                }
                return (
                <span className="rowSection" key={index}>
                    {state[rowIndex][header]}
                </span>
                )
            })}
        </div>
        )
    };

    function sortCompare(first, second, direction) {
        
        if (direction) {
            return first - second
        }
        return second - first
    }

    function sortCompareString(first,second, direction) {
        if (!first && !second)
            return 0
        if (direction)
            return first.localeCompare(second)
        return second.localeCompare(first)
    }

    function toggleSort(setValue, setEffect, header) {
        const sorted = [...state].sort((firstEl, secondEl) => { 
            if (typeof firstEl[header] == 'string') {
                return sortCompareString(firstEl[header],secondEl[header],setValue)
            }
            return sortCompare(firstEl[header], secondEl[header], setValue)
            })
        setState(sorted)
        setEffect(!setValue)
    }

    return (
        <div className="Table">
            <div className="TableButton">
                <button
                    onClick = {() => console.log(state)} 
                >
                    Console Print Expoplanets
                </button>
            </div>
            {isLoading ? 
            <div className="LoadingPage">
                Loading Exoplanets
            </div>
            :
            <div>
                <div className="rowEntryHeader">
                    {headers.map((header, index) => {
                        var sortButton = null
                        if (header == "kepler_name") {
                            sortButton = 
                            <button
                                onClick = {() => toggleSort(sortNameAsc, setSortNameAsc, "kepler_name")} 
                            >
                                sort
                            </button>
                        } else if (header == "koi_score") {
                            sortButton = 
                            <button
                                onClick = {() => toggleSort(sortScoreAsc, setSortScoreAsc, "koi_score")} 
                            >
                                sort
                            </button>
                        }
                        return (
                        <span className="rowSection" key={index+"header"}>
                            {header}
                            {sortButton}
                        </span>
                        )
                    })}
                </div>
                <Grid
                    height={1000}
                    columnWidth={window.innerWidth}
                    columnCount={1}
                    rowHeight={50}
                    rowCount={10000}
                    width={window.innerWidth}>
                        {Row}
                </Grid>
            </div>
            }

        </div>
    )
}
export default Table;