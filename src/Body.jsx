<link rel="stylesheet" href="./import.css" />
import React, { useContext, useEffect, useState } from "react";
import { CoinContext } from "./CoinContext.jsx";
import { useTranslation } from 'react-i18next';
import { 
            getBuyRecommendations,
            getSellRecommendations, 
            getMarketLeaders 
        } from './utils/advisorLogic';
import CoinCard from './CoinCard';

function Body() {
    const { t, i18n } = useTranslation();
    const {allCoin, currency} = useContext(CoinContext);
    const [displayCoin, setDisplayCoin] = useState([]);

    const [buyList, setBuyList] = useState([]);
    const [sellList, setSellList] = useState([]);
    const [topList, setTopList] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");
    
    useEffect(()=>{
        //setDisplayCoin(allCoin);
        if (allCoin.length > 0) {
            setBuyList(getBuyRecommendations(allCoin));
            setSellList(getSellRecommendations(allCoin));
            setTopList(getMarketLeaders(allCoin));
        }
    },[allCoin])
    
    
    const sections = [
        { title: t('buy_title'), data: buyList, type: 'buy' },
        { title: t('sell_title'), data: sellList, type: 'sell' },
        { title: t('top_title'), data: topList, type: 'top' }
    ];
    



    return(
        <div className="p-4 md:p-8 bg-[#343434] min-h-screen text-[#dde3c0]" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
            <div className="max-w-7xl mx-auto mb-8 px-1 flex justify-start">
                <input
                    type="text"
                    placeholder={i18n.language === 'ar' ? 'ابحث عن العملات الرقمية...' : 'Search assets (e.g., BTC, Solana)...'}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-80 bg-[#2a2a2a] text-[#DDE3C0] border border-[#948466]/40 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#749A96] placeholder-[#948466]/60"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {sections.map((section) => (
                    <div key={section.type} className="flex flex-col gap-4">
                        <h2 className="text-xl font-bold text-[#dde3c0] border-b border-slate-700 pb-2 mb-2">
                            {section.title}
                        </h2>
                        {section.data.map((coin) => {
                            const matchesSearch = 
                                coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                coin.symbol.toLowerCase().includes(searchTerm.toLowerCase());

                            if (!matchesSearch) return null;

                            return (
                                <CoinCard 
                                    key={coin.id} 
                                    coin={coin} 
                                    currency={currency} 
                                    type={section.type} 
                                />
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Body