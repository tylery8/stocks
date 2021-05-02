import { useEffect, useState } from "react";
import FinnhubAPI from "../apis/finnhubAPI";
import '../../node_modules/react-vis/dist/style.css';
import { XYPlot, LineSeries, XAxis, YAxis } from 'react-vis';
import Box from "@material-ui/core/Box";
import Loading from "./Loading";
import style from "../style";

const getResolutionAndCount = function(period) {

    const marketOpen = new Date();
    if (marketOpen.getDay() === 0) {
        marketOpen.setDate(marketOpen.getDate() - 2);
    } else if (marketOpen.getDay() === 6) {
        marketOpen.setDate(marketOpen.getDate() - 1);
    }

    marketOpen.setHours(9);
    marketOpen.setMinutes(30);
    marketOpen.setSeconds(0);
    marketOpen.setMilliseconds(0);

    let minutesIntoDay = (new Date().getTime() - marketOpen.getTime()) / 1000 / 60;
    if (minutesIntoDay < 0) {
        minutesIntoDay += 24*60;
    }

    switch(period) {
        case "1W":
            return {resolution: 15, count: Math.ceil((6*24*60 + minutesIntoDay)/15)};

        case "1M":
            return {resolution: 60, count: 30*24};

        case "1Y":
            return {resolution: 'W', count: 52};

        case "5Y":
            return {resolution: 'W', count: 261};

        default:
            return {resolution: 1, count: Math.ceil(minutesIntoDay)};
    }
}

const formatDate = function(time, period) {
    if (!time) {
        return ""
    }

    const timeStr = time.toLocaleTimeString();

    switch(period) {
        case "1W":
            return `${time.getMonth()+1}/${time.getDate()} ${timeStr.substr(0, timeStr.length-9) + timeStr.substr(timeStr.length-2, 2)}`

        case "1M":
            return `${time.getMonth()+1}/${time.getDate()}`

        case "1Y":
        case "5Y":
            return `${time.getMonth()+1}/${time.getDate()}/${(time.getFullYear() + "").substr(2,2)}`;

        default:
            return timeStr.substr(0, timeStr.length-6) + timeStr.substr(timeStr.length-3, 3);
    }
}

export default function HistoricalChartPlot(props) {

    const [state, setState] = useState({});

    useEffect(() => {
        let mounted = true;

        if (!props.symbol) {
            return
        }

        setState((state) => {
            return {
                ...state,
                times: undefined,
                prices: undefined
                }
            }
        )

        const {resolution, count} = getResolutionAndCount(props.period);

        new FinnhubAPI().stockCandles(props.symbol, resolution, count, (response, data, error) => {
            if (mounted) {
                if (!error && data.s !== "no_data") {
                    setState((state) => {
                        return {
                            ...state,
                            times: data.t.map(time => new Date(time*1000)),
                            prices: data.c
                            }
                        }
                    )
                } else {
                    setState((state) => {
                        return {
                            ...state,
                            times: null,
                            prices: null
                            }
                        }
                    )
                }
            }
        });

        return () => {mounted = false;}
    }, [props])

    return (
        props.symbol && state.times && state.prices ?
            <XYPlot height={400} width={600} margin={{left: 60, bottom: 60}} >
                <XAxis tickFormat={i => formatDate(state.times[i], props.period)} tickLabelAngle={-45}/>
                <YAxis />
                <LineSeries curve={'curveMonotoneX'} color={state.prices[0] > state.prices[state.prices.length-1] ? style.mainRed : style.mainGreen} data={state.prices.map((price, i) => {return {x: i, y: price}})} />
            </XYPlot>
        :
            <Box height={400} width={600} textAlign="center">
                {props.symbol ?
                    state.times === null && state.prices === null ?
                        "An error occurred. Please refresh"
                    :
                        <Loading height={400} width={600} />
                :
                    ""
                }
            </Box>
    )
}