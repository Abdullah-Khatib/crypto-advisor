import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function Contact() {
    const { t, i18n } = useTranslation();
    
    // Form Input state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        purpose: '',
        message: ''
    });

    // Validation Errors state
    const [errors, setErrors] = useState({});
    
    // Submission status state
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Updates state dynamically as user inputs characters
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        
        // Clear field error instantly as the user formats the correction
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    //Validation Checks
    const validateForm = () => {
        let tempErrors = {};
        const emailRegex = /\S+@\S+\.\S+/; // matches smthn@smthn.smthn

        if (!formData.name.trim()) {
            tempErrors.name = "Full name is required.";
        } else if (formData.name.trim().length < 2) {
            tempErrors.name = "Name must be at least 2 characters long.";
        }

        if (!formData.email.trim()) {
            tempErrors.email = "Email address is required.";
        } else if (!emailRegex.test(formData.email)) {
            tempErrors.email = "Please enter a valid email address (e.g., name@domain.com).";
        }

        if (!formData.purpose) {
            tempErrors.purpose = "Please select your purpose of contact.";
        }

        if (!formData.message.trim()) {
            tempErrors.message = "Message text body cannot be empty.";
        } else if (formData.message.trim().length < 15) {
            tempErrors.message = "Please describe your request in more detail (minimum 15 characters).";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            console.log("Form submitted successfully! Packet:", formData);
            setIsSubmitted(true);
            
            setFormData({ name: '', email: '', purpose: '', message: '' });
        }
    };

    return (
        <div className="p-4 md:p-8 bg-[#343434] min-h-screen text-[#dde3c0] flex items-center justify-center" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
            <div className="bg-[#2a2a2a] border-2 border-[#948466]/20 p-6 md:p-8 rounded-xl shadow-xl max-w-lg w-full transition-all">
                
                <h2 className="text-2xl font-bold border-b border-[#948466]/20 pb-3 mb-6 text-center">
                    {i18n.language === 'ar' ? 'اتصل بمستشارينا' : 'Contact Our Advisors'}
                </h2>

                {isSubmitted ? (
                    <div className="bg-[#749a96]/10 border border-[#749a96] text-[#749a96] p-6 rounded-lg text-center my-4 animate-fadeIn">
                        <p className="font-bold text-lg mb-1">Message Sent!</p>
                        <p className="text-sm opacity-90">Thank you for reaching out. Our cryptocurrency analytics team will review your inquiry shortly.</p>
                        <button 
                            onClick={() => setIsSubmitted(false)}
                            className="mt-4 text-xs font-mono underline hover:text-[#dde3c0]"
                        >
                            Send another message
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        
                        {/* Name Field */}
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-mono font-semibold text-[#948466] uppercase tracking-wider">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                className={`bg-[#343434] border ${errors.name ? 'border-[#b56152]' : 'border-[#948466]/40'} rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#749A96] text-[#dde3c0] placeholder-[#948466]/40`}
                            />
                            {errors.name && <span className="text-xs text-[#b56152] font-mono mt-0.5">{errors.name}</span>}
                        </div>

                        {/* Email Field */}
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-mono font-semibold text-[#948466] uppercase tracking-wider">Email Address</label>
                            <input
                                type="text"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="crypto@example.com"
                                className={`bg-[#343434] border ${errors.email ? 'border-[#b56152]' : 'border-[#948466]/40'} rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#749A96] text-[#dde3c0] placeholder-[#948466]/40`}
                            />
                            {errors.email && <span className="text-xs text-[#b56152] font-mono mt-0.5">{errors.email}</span>}
                        </div>

                        {/* Purpose Box */}
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-mono font-semibold text-[#948466] uppercase tracking-wider">Purpose of Contact</label>
                            <select
                                name="purpose"
                                value={formData.purpose}
                                onChange={handleChange}
                                className={`bg-[#343434] border ${errors.purpose ? 'border-[#b56152]' : 'border-[#948466]/40'} rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#749A96] text-[#dde3c0]`}
                            >
                                <option value="">-- Select Option --</option>
                                <option value="technical">Technical Support / App Issues</option>
                                <option value="api">CoinGecko Data Feed Delay</option>
                                <option value="suggestion">Advisor Strategy Suggestion</option>
                                <option value="other">Other / Business Inquiries</option>
                            </select>
                            {errors.purpose && <span className="text-xs text-[#b56152] font-mono mt-0.5">{errors.purpose}</span>}
                        </div>

                        {/* Message Box */}
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-mono font-semibold text-[#948466] uppercase tracking-wider">Your Message</label>
                            <textarea
                                name="message"
                                rows="4"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Provide your inquiry details here..."
                                maxLength={500}
                                className={`bg-[#343434] border ${errors.message ? 'border-[#b56152]' : 'border-[#948466]/40'} rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#749A96] text-[#dde3c0] placeholder-[#948466]/40 resize-none`}
                            />
                            <div className="flex justify-between mt-0.5">
                                {errors.message ? (
                                    <span className="text-xs text-[#b56152] font-mono">{errors.message}</span>
                                ) : (
                                    <div />
                                )}
                                <span className="text-[10px] font-mono text-[#948466]/60">{formData.message.length}/500</span>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="bg-[#dde3c0] text-[#343434] font-bold py-2 rounded-lg text-sm mt-2 hover:bg-[#749a96] hover:text-[#dde3c0] transition-colors duration-200"
                        >
                            Submit Message
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default Contact;