import { Box } from "@material-ui/core";
import { useEffect, useState } from "react";
import FinnhubAPI from "../apis/finnhubAPI";
import Loading from "./Loading";
import NewsStory from "./NewsStory";

export default function MarketNews(props) {

    const [state, setState] = useState({});

    const symbol = props.symbol === "SPY" ? null : props.symbol;
    
    useEffect(() => {

        setState((state) => {
            return {
                ...state,
                news: undefined
            }
        })

        new FinnhubAPI().news(symbol, (response, data, error) => {
            if (!error) {
                setState((state) => {
                    return {
                        ...state,
                        news: data.filter((e, i) => i < (props.maxStories || 20))
                    }
                })
            } else {
                setState((state) => {
                    return {
                        ...state,
                        news: null
                    }
                })
            }
        });
    }, [props, symbol]);

    return (
        <Box>
            <Box fontSize="36px" fontWeight={500}>
                {(symbol || "Market") + " News"}
            </Box>
            {state.news ?
                state.news.map(story => <NewsStory {...story} />)
            :
                state.news === undefined ? <Loading /> : null
            }
        </Box>
    )
}