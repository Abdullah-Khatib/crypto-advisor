import React from 'react';
import { useTranslation } from 'react-i18next';

function CoinCard({ coin, currency, type }) {
    const { t } = useTranslation();

    // Define border colors based on the card type
    const borderColors = {
        buy: "border-[#749a96] shadow-[#749a96]/10",
        sell: "border-[#b56152] shadow-[#b56152]/10",
        top: "border-[#948466] shadow-[#948466]/10"
    };

    const badgeColors = {
        buy: "bg-[#749A96] text-[#343434]",
        sell: "bg-[#B56152] text-[#343434]",
        top: "bg-[#948466] text-[#343434]"
    };

    // save website from crashing
    const priceChange = coin?.price_change_percentage_24h ?? 0;
    const athChange = coin?.ath_change_percentage ?? 0;
    const currentPrice = coin?.current_price ?? 0;
    const high24h = coin?.high_24h ?? 0;
    const low24h = coin?.low_24h ?? 0;

    return (
        <div className={`bg-[#2a2a2a] border-2 p-4 rounded-xl shadow-lg font-sans ${borderColors[type]}`}>
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-baseline gap-1.5">
                    <p className="font-bold text-lg tracking-tight text-[#dde3c0]">{coin.name}</p>
                    <p className="text-xs font-mono font-semibold tracking-wider text-[#948466] uppercase">{coin.symbol}</p>
                </div>
                <p className="bg-[#343434] px-2 py-0.5 rounded text-xs font-mono font-medium text-[#dde3c0]/70">
                    #{coin.market_cap_rank}
                </p>
            </div>

            <div className="grid grid-cols-2 gap-y-2 gap-x-1 text-sm">
                <div>
                    <p className="text-[#948466] text-[11px] font-semibold uppercase tracking-wider mb-0.5">{t('price')}</p>
                    <p className="font-mono font-bold text-base text-[#dde3c0]">
                        {currency.symbol}{currentPrice.toLocaleString()}
                    </p>
                </div>
                <div>
                    <p className="text-[#948466] text-[11px] font-semibold uppercase tracking-wider mb-0.5">{t('change')}</p>
                    <p className={`font-mono font-bold text-base ${priceChange > 0 ? "text-[#749a96]" : priceChange < 0 ? "text-[#b56152]" : "text-[#948466]"}`}>
                        {priceChange.toFixed(2)}%
                    </p>
                </div>
                <div>
                    <p className="text-[#948466] text-[11px] font-semibold uppercase tracking-wider mb-0.5">{t('high_24h')}</p>
                    <p className="font-mono text-sm text-[#dde3c0]/80">{currency.symbol}{high24h.toLocaleString()}</p>
                </div>
                <div>
                    <p className="text-[#948466] text-[11px] font-semibold uppercase tracking-wider mb-0.5">{t('low_24h')}</p>
                    <p className="font-mono text-sm text-[#dde3c0]/80">{currency.symbol}{low24h.toLocaleString()}</p>
                </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#948466]/20 flex justify-between items-center">
                <div className="text-xs font-mono tracking-tight text-[#948466]">
                    {t('ath_dist')}: {athChange.toFixed(1)}%
                </div>
                {coin.score !== undefined && (
                    <div className={`text-xs font-mono font-bold px-2 py-0.5 rounded tracking-wide uppercase ${badgeColors[type]}`}>
                        {t('score')}: {coin.score}/8
                    </div>
                )}
            </div>
        </div>
    );
}

export default CoinCard;