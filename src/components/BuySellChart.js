import Box from "@material-ui/core/Box";
import { useEffect, useState } from "react";
import { RadialChart } from "react-vis";
import FinnhubAPI from "../apis/finnhubAPI";
import style from "../style";
import Loading from "./Loading";

export default function BuySellChart(props) {

    const [state, setState] = useState({});

    useEffect(() => {
        new FinnhubAPI().recommendation(props.symbol, (response, data, error) => {

            if (!error && data.length !== 0) {
                setState((state) => {
                    return {
                        ...state,
                        recommendation: data[0]
                    }
                })
            } else {
                setState((state) => {
                    return {
                        ...state,
                        recommendation: null
                    }
                })
            }

        })
    }, [props])

    if (!state.recommendation) {
        return state.recommendation === null ? null : <Loading />
    }

    const recommendation = state.recommendation;
    const total = recommendation.strongBuy + recommendation.buy + recommendation.hold + recommendation.sell + recommendation.strongSell;
    const buy = (recommendation.buy + recommendation.strongBuy)/total;
    const hold = recommendation.hold/total;
    const sell = (recommendation.sell + recommendation.strongSell)/total;

    const data = [
        {color: style.mainGreen, angle: buy},
        {color: 'grey', angle: hold},
        {color: style.mainRed, angle: sell}
    ]

    return (
        <Box>
            <RadialChart
            style={{stroke: "black", strokeWidth: "2px"}}
            data={data.filter((el => el.angle > 0))}
            width={300}
            height={300}
            radius={148}
            innerRadius={112}
            padAngle={0.04}
            colorType='literal'
            />
            <Box width={144} height={144} fontSize={24} fontWeight={500} textAlign="center" style={{position: "relative", bottom: "222px", left: "78px"}}>
                <Box p={1} color={style.mainGreen}>
                    {Math.round(buy*100)}% Buy
                </Box>
                <Box p={1} color="#808080">
                    {Math.round(hold*100)}% Hold
                </Box>
                <Box p={1} color={style.mainRed}>
                    {Math.round(sell*100)}% Sell
                </Box>
            </Box>
        </Box>
        
    )
}