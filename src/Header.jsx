import { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import LogoImg from './assets/logo.png';
import { CoinContext } from './CoinContext';
//import ThemeToggle from './ThemeToggle';

function Header({ setView }) {
    const { t, i18n } = useTranslation();
    const { currency, setCurrency } = useContext(CoinContext);
    // 1. Initialize mobile menu state
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

    // Framer motion mobile dropdown animation
    const menuVariants = {
        closed: { opacity: 0, height: 0, transition: { duration: 0.3 } },
        open: { opacity: 1, height: "auto", transition: { duration: 0.3 } }
    };

    return (
        <header className="sticky top-0 bg-[#2a2a2a] border-b border-[#948466]/30 z-50">
            <div className="flex justify-between items-center px-5 py-3">
                
                <div className="flex flex-row items-center gap-4">
                    <img 
                        src={LogoImg} 
                        alt="Logo" 
                        className="w-12 h-12 md:w-16 md:h-16 rounded-full shadow-md border border-[#948466]/40" 
                    />
                    <h1 className="text-xl font-bold text-[#dde3c0] whitespace-nowrap md:text-2xl">
                        {t('title')}
                    </h1>
                </div>

                
                {/* Hamburger Button */}
                <button 
                    onClick={() => setIsOpen(!isOpen)} 
                    className="text-[#749a96] hover:text-[#dde3c0] text-3xl font-light leading-none focus:outline-none md:hidden block transition-colors"
                    aria-label="Toggle Menu"
                >
                    {isOpen ? '✕' : '☰'}
                </button>

                {/*Desktop Navigation*/}
                <nav className="hidden md:flex items-center">
                    <ul className="flex flex-row items-center gap-6 text-lg text-[#dde3c0]/90">
                        <li><a href="#home" onClick={(e) => { e.preventDefault(); setView('home'); setIsOpen(false); }} className="hover:text-[#749A96]">{t('home')}</a></li>
                        <li><a href="#" className="hover:text-[#749A96]">{t('about')}</a></li>
                        <li><a href="#" className="hover:text-[#749A96]">{t('services')}</a></li>
                        <li><a href="#contact" onClick={(e) => { e.preventDefault(); setView('contact'); setIsOpen(false); }} className="hover:text-[#749A96]">{t('contact')}</a></li>
                        
                        <select id="currency-select" onChange={currencyHandler} value={currency?.name || 'usd'} className='bg-[#343434] text-[#dde3c0] border border-[#948466]/40 focus:outline-none focus:ring-2 focus:ring-[#749A96] rounded px-1'>
                            <option value="usd">$</option>
                            <option value="eur">€</option>
                            <option value="gbp">£</option>
                        </select>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="bg-[#dde3c0] text-[#343434] font-bold py-1.5 px-3 rounded"
                            onClick={toggleLanguage}
                        >
                            {t('lang_btn')}
                        </motion.button>
                    </ul>
                </nav>
            </div>

            {/*Mobile Navigation Menu Dropdown */}
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