import { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import LogoImg from './assets/logo.png';
import { CoinContext } from './CoinContext';

function Header({ setView }) {
    const { t, i18n } = useTranslation();
    const { currency, setCurrency } = useContext(CoinContext);
    const [isOpen, setIsOpen] = useState(false);

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'ar' : 'en';
        i18n.changeLanguage(newLang);
        document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    };

    const currencyHandler = (event) => {
        const values = {
            usd: { name: "usd", symbol: "$" },
            eur: { name: "eur", symbol: "€" },
            gbp: { name: "gbp", symbol: "£" }
        };
        setCurrency(values[event.target.value] || values.usd);
    };

    const menuVariants = {
        closed: { opacity: 0, height: 0, transition: { duration: 0.3 } },
        open: { opacity: 1, height: "auto", transition: { duration: 0.3 } }
    };

    return (
        <header className="sticky top-0 bg-[#2a2a2a] border-b border-[#948466]/30 z-50">
            <div className="flex justify-between items-center px-5 py-3">
                
                {/* Logo & Perfectly Proportioned Title */}
                <div className="flex flex-row items-center gap-3">
                    <img 
                        src={LogoImg} 
                        alt="Logo" 
                        className="w-10 h-10 md:w-11 md:h-11 rounded-full shadow-md border border-[#948466]/40 flex-shrink-0" 
                    />
                    {/* Balanced middle ground size: md:text-sm holds up beautifully next to compressed items */}
                    <h1 className="text-base font-bold text-[#dde3c0] whitespace-nowrap md:text-sm lg:text-lg xl:text-xl transition-all duration-200">
                        {t('title')}
                    </h1>
                </div>

                {/* Hamburger Button (Stays at md breakpoint) */}
                <button 
                    onClick={() => setIsOpen(!isOpen)} 
                    className="text-[#749a96] hover:text-[#dde3c0] text-3xl font-light leading-none focus:outline-none md:hidden block transition-colors"
                    aria-label="Toggle Menu"
                >
                    {isOpen ? '✕' : '☰'}
                </button>

                {/* Desktop Navigation (Kept at md breakpoint, optimized text-link distribution) */}
                <nav className="hidden md:flex items-center">
                    {/* md:gap-3 keeps them tight horizontally on smaller desktops, scaling up at lg */}
                    <ul className="flex flex-row items-center gap-3 lg:gap-6 text-sm md:text-xs lg:text-base text-[#dde3c0]/90 font-medium">
                        <li><a href="#home" onClick={(e) => { e.preventDefault(); setView('home'); setIsOpen(false); }} className="hover:text-[#749A96] transition-colors">{t('home')}</a></li>
                        <li><a href="#" className="hover:text-[#749A96] transition-colors">{t('about')}</a></li>
                        <li><a href="#" className="hover:text-[#749A96] transition-colors">{t('services')}</a></li>
                        <li><a href="#contact" onClick={(e) => { e.preventDefault(); setView('contact'); setIsOpen(false); }} className="hover:text-[#749A96] transition-colors">{t('contact')}</a></li>
                        
                        <select 
                            id="currency-select" 
                            onChange={currencyHandler} 
                            value={currency?.name || 'usd'} 
                            className='bg-[#343434] text-[#dde3c0] border border-[#948466]/40 focus:outline-none focus:ring-1 focus:ring-[#749A96] rounded px-1 py-0.5 text-xs font-mono'
                        >
                            <option value="usd">$</option>
                            <option value="eur">€</option>
                            <option value="gbp">£</option>
                        </select>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-[#dde3c0] text-[#343434] font-bold py-1 px-2.5 rounded text-[10px] lg:text-sm"
                            onClick={toggleLanguage}
                        >
                            {t('lang_btn')}
                        </motion.button>
                    </ul>
                </nav>
            </div>

            {/* Mobile Navigation Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.nav 
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        className="md:hidden bg-[#242424] overflow-hidden border-t border-[#948466]/20"
                    >
                        <ul className="flex flex-col items-center gap-4 py-4 text-lg text-[#dde3c0]/90">
                            <li><a href="#home" onClick={(e) => { e.preventDefault(); setView('home'); setIsOpen(false); }} className="hover:text-[#749A96]">{t('home')}</a></li>
                            <li><a href="#" onClick={() => setIsOpen(false)} className="hover:text-[#749A96]">{t('about')}</a></li>
                            <li><a href="#" onClick={() => setIsOpen(false)} className="hover:text-[#749A96]">{t('services')}</a></li>
                            <li><a href="#contact" onClick={(e) => { e.preventDefault(); setView('contact'); setIsOpen(false); }} className="hover:text-[#749A96]">{t('contact')}</a></li>
                            
                            <div className="flex items-center gap-4 pt-2 border-t border-[#948466]/20 w-full justify-center">
                                <select id="mobile-currency-select" onChange={currencyHandler} value={currency?.name || 'usd'} className='bg-[#343434] text-[#dde3c0] border border-[#948466]/40 focus:outline-none focus:ring-2 focus:ring-[#749A96] rounded px-2 py-1'>
                                    <option value="usd">$</option>
                                    <option value="eur">€</option>
                                    <option value="gbp">£</option>
                                </select>

                                <button
                                    className="bg-[#dde3c0] text-[#343434] font-bold py-1 px-3 rounded"
                                    onClick={toggleLanguage}
                                >
                                    {t('lang_btn')}
                                </button>
                            </div>
                        </ul>
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    );
}

export default Header;