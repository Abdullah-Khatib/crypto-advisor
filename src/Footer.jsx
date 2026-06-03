<link rel="stylesheet" href="./import.css" />
import React, { useContext, useState, useEffect } from "react";
import { CoinContext } from "./CoinContext.jsx";
import { useTranslation } from 'react-i18next';

function Footer() {

    const { lastUpdated } = useContext(CoinContext);
    const { t, i18n } = useTranslation();
    const [timeLeft, setTimeLeft] = useState(60);

    useEffect(() => {
        // Update the countdown every second
        const timer = setInterval(() => {
            const secondsPassed = Math.floor((Date.now() - lastUpdated) / 1000);
            const remaining = Math.max(0, 60 - secondsPassed);
            setTimeLeft(remaining);
        }, 1000);

        return () => clearInterval(timer);
    }, [lastUpdated]);

    return(
        <footer className="bg-[#2a2a2a] text-[#948466] border-t border-[#948466]/20 w-full p-8">
            <div className="flex flex-col items-center justify-center gap-2">
                
                <div className="flex flex-col justify-center items-center">
                    <p className="text-sm font-medium text-[#948466]">
                        {i18n.language === 'ar' ? 'التحديث القادم خلال: ' : 'Next refresh in: '}
                    </p>
                    <p className="text-[#749A96] font-mono text-lg self-center">{timeLeft}s</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <p className="text-center text-sm text-[#948466]/80">
                        &copy; {new Date().getFullYear()} My CryptoWeb Test. All rights reserved.
                    </p>
                    <p className="text-xs italic text-[#948466]/60">
                        Data provided by{" "}
                        <a 
                            href="https://www.coingecko.com/" className="text-[#749A96] hover:underline hover:text-[#dde3c0]">
                            CoinGecko
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
export default Footer