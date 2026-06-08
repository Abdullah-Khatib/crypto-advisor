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
      "score": "Advice Score",
      "contact_title": "Contact Our Advisors",
      "full_name": "Full Name",
      "full_name_placeholder": "Your Name",
      "email_address": "Email Address",
      "email_placeholder": "crypto@example.com",
      "purpose": "Purpose of Contact",
      "purpose_select": "-- Select Option --",
      "purpose_technical": "Technical Support / App Issues",
      "purpose_api": "CoinGecko Data Feed Delay",
      "purpose_suggestion": "Advisor Strategy Suggestion",
      "purpose_other": "Other / Business Inquiries",
      "message": "Your Message",
      "message_placeholder": "Provide your inquiry details here...",
      "submit_btn": "Submit Message",
      "send_another": "Send another message",
      "message_sent": "Message Sent!",
      "message_thanks": "Thank you for reaching out. Our cryptocurrency analytics team will review your inquiry shortly.",
      "name_required": "Full name is required.",
      "name_short": "Name must be at least 2 characters long.",
      "email_required": "Email address is required.",
      "email_invalid": "Please enter a valid email address (e.g., name@domain.com).",
      "purpose_required": "Please select your purpose of contact.",
      "message_empty": "Message text body cannot be empty.",
      "message_short": "Please describe your request in more detail (minimum 15 characters)."
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
      "score": "النصيحة",
      "contact_title": "اتصل بمستشارينا",
      "full_name": "الاسم الكامل",
      "full_name_placeholder": "اسمك",
      "email_address": "عنوان البريد الإلكتروني",
      "email_placeholder": "crypto@example.com",
      "purpose": "الغرض من الاتصال",
      "purpose_select": "-- اختر خيار --",
      "purpose_technical": "الدعم الفني / مشاكل التطبيق",
      "purpose_api": "تأخير خلاصة بيانات CoinGecko",
      "purpose_suggestion": "اقتراح استراتيجية المستشار",
      "purpose_other": "استفسارات أخرى / تجارية",
      "message": "رسالتك",
      "message_placeholder": "قدم تفاصيل استفسارك هنا...",
      "submit_btn": "إرسال الرسالة",
      "send_another": "إرسال رسالة أخرى",
      "message_sent": "تم إرسال الرسالة!",
      "message_thanks": "شكراً لتواصلك معنا. ستقوم فريق تحليلات العملات الرقمية لدينا بمراجعة استفسارك قريباً.",
      "name_required": "الاسم الكامل مطلوب.",
      "name_short": "يجب أن يكون الاسم بطول 2 حرف على الأقل.",
      "email_required": "عنوان البريد الإلكتروني مطلوب.",
      "email_invalid": "يرجى إدخال عنوان بريد إلكتروني صحيح (على سبيل المثال، name@domain.com).",
      "purpose_required": "يرجى تحديد الغرض من الاتصال.",
      "message_empty": "نص الرسالة لا يمكن أن يكون فارغاً.",
      "message_short": "يرجى وصف طلبك بمزيد من التفاصيل (15 حرف على الأقل)."
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