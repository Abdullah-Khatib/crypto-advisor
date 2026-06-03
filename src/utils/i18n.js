import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      "title": "Crypto Tracker & Advisor",
      "home": "Home",
      "about": "About",
      "services": "Services",
      "contact": "Contact",
      "coin_name": "Coin Name",
      "price": "Price",
      "change": "24h Change",
      "market_cap": "Market Cap",
      "advice": "Should I Buy?",
      "yes": "Yes",
      "no": "No",
      "lang_btn": "AR",
      "modal_msg": "The language has been changed",
      "buy_title": "Best Buy Opportunities",
      "sell_title": "Sell / Take Profit",
      "top_title": "Market Leaders",
      "high_24h": "24h High",
      "low_24h": "24h Low",
      "ath_dist": "From ATH",
      "score": "Advice Score"
    }
  },
  ar: {
    translation: {
      "title": "متابع ومستشار العملات الرقمية", // Added
      "home": "الصفحة الرئيسية",
      "about": "معلومات عنا",
      "services": "الخدمات",
      "contact": "اتصل بنا",
      "coin_name": "اسم العملة",
      "price": "السعر",
      "change": "التغير خلال ٢٤ ساعة",
      "market_cap": "القيمة السوقية", 
      "advice": "هل يجب أن أشتري؟",
      "yes": "نعم",
      "no": "لا",
      "lang_btn": "EN",
      "modal_msg": "تم تغيير اللغة بنجاح",
      "buy_title": "أفضل فرصه للشراء",
      "sell_title": "أفضل فرصه للبيع",
      "top_title": "افضل عملات في السوق",
      "high_24h": "أعلى سعر اخر ٢٤ ساعة",
      "low_24h": "أقل سعر اخر ٢٤ ساعة",
      "ath_dist": "البعد عن القمة",
      "score": "النصيحة"
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;