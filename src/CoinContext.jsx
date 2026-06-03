import { createContext, use, useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
export const CoinContext = createContext();

const CoinContextProvider = (props)=>{
    
    const { i18n } = useTranslation();
    const [allCoin, setAllCoins] = useState([]);
    const [lastUpdated, setLastUpdated] = useState(Date.now());
    const [currency, setCurrency] = useState({
        name: "USD",
        symbol: "$"
    });

    const fetchAllCoins = async()=>{
        const options = {
            method: 'GET', 
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-RjAQhCNY4WAbV42TY6BwPu9u'}
        };

        const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}&order=market_cap_desc&per_page=50&page=1&sparkline=false&locale=${i18n.language}`;

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            setAllCoins(data);
            setLastUpdated(Date.now()); 
        } catch (err) {
            console.error("Error fetching coins:", err);
        }
            

    }
    
    useEffect(() => {
        fetchAllCoins();
        // fetch data every minute automatically
        const interval = setInterval(() => {
            fetchAllCoins();
            console.log("Data refresh");
        }, 60000);

        return () => clearInterval(interval);

    }, [currency, i18n.language]);
    const contextvalue = {
        allCoin,
        lastUpdated,
        currency,
        setCurrency
    }
    return(
        <CoinContext.Provider value={contextvalue}>
            {props.children}
        </CoinContext.Provider>
    )
 }

 export default CoinContextProvider;