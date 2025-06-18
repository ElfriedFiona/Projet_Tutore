import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';
import {
    ResponsiveContainer,
    ResponsiveSection,
    ResponsiveHeading,
    ResponsiveTwoColumns
} from '../components/common/ResponsiveComponents';

const Contact = () => {
    const { success, error } = useToast();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        category: 'general'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const contactCategories = [
        { value: 'general', label: 'Question générale' },
        { value: 'technical', label: 'Support technique' },
        { value: 'books', label: 'Question sur les livres' },
        { value: 'account', label: 'Problème de compte' },
        { value: 'suggestion', label: 'Suggestion d\'amélioration' },
        { value: 'complaint', label: 'Réclamation' }
    ];

    const contactInfo = [
        {
            icon: '📍',
            title: 'Adresse',
            details: [
                'ENSPD - École Nationale Supérieure Polytechnique de Douala',
                'BP 2701 Douala, Cameroun'
            ]
        },
        {
            icon: '📞',
            title: 'Téléphone',
            details: [
                '+237 233 40 57 95',
                '+237 233 40 47 31'
            ]
        },
        {
            icon: '📧',
            title: 'Email',
            details: [
                'bibliotheque@enspd.cm',
                'support@bibliotheque-enspd.cm'
            ]
        },
        {
            icon: '🕒',
            title: 'Horaires',
            details: [
                'Lundi - Vendredi: 8h00 - 18h00',
                'Samedi: 9h00 - 15h00',
                'Dimanche: Fermé'
            ]
        }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }; const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            success('Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.');

            // Reset form
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: '',
                category: 'general'
            });
        } catch {
            error('Erreur lors de l\'envoi du message. Veuillez réessayer.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFAQNavigation = () => {
        // Navigate to homepage and scroll to FAQ section
        window.location.href = '/#faq';
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
            {/* Header Section */}
            <ResponsiveSection size="compact" className="bg-gradient-to-r from-primary-600 to-primary-800 text-white p-4">
                <ResponsiveContainer className="text-center">
                    <ResponsiveHeading variant="h1" className="text-white mb-4">
                        Contactez-nous
                    </ResponsiveHeading>
                    <p className="text-primary-100 text-lg max-w-2xl mx-auto">
                        Nous sommes là pour vous aider. N'hésitez pas à nous contacter pour toute question,
                        suggestion ou problème concernant nos services.
                    </p>
                </ResponsiveContainer>
            </ResponsiveSection>            {/* Main Content */}
            <ResponsiveSection size="standard">
                <ResponsiveContainer>                    <ResponsiveTwoColumns
                    left={
                        /* Contact Form */
                        <div className="bg-white rounded-2xl shadow-xl p-8 h-fit">
                            <h2 className="text-2xl font-bold text-primary-800 mb-6">
                                Envoyez-nous un message
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name Field */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                                        Nom complet *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                                        placeholder="Votre nom complet"
                                    />
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                                        Adresse email *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                                        placeholder="votre.email@exemple.com"
                                    />
                                </div>

                                {/* Category Field */}
                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium text-neutral-700 mb-2">
                                        Catégorie *
                                    </label>
                                    <select
                                        id="category"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                                    >
                                        {contactCategories.map(category => (
                                            <option key={category.value} value={category.value}>
                                                {category.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Subject Field */}
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-2">
                                        Sujet *
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                                        placeholder="Résumé de votre demande"
                                    />
                                </div>

                                {/* Message Field */}
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        rows={6}
                                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none"
                                        placeholder="Décrivez votre demande en détail..."
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-primary-700 hover:to-primary-800 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Envoi en cours...
                                        </div>
                                    ) : (
                                        'Envoyer le message'
                                    )}
                                </button>
                            </form>
                        </div>
                    }
                    right={
                        <div className="space-y-6 ml-4">
                            <div className="bg-white rounded-2xl shadow-xl p-8">
                                <h2 className="text-2xl font-bold text-primary-800 mb-6">
                                    Informations de contact
                                </h2>

                                <div className="space-y-6">
                                    {contactInfo.map((info, index) => (
                                        <div key={index} className="flex items-start space-x-4">
                                            <div className="text-2xl">{info.icon}</div>
                                            <div>
                                                <h3 className="font-semibold text-primary-700 mb-2">
                                                    {info.title}
                                                </h3>
                                                {info.details.map((detail, detailIndex) => (
                                                    <p key={detailIndex} className="text-neutral-600 text-sm">
                                                        {detail}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* FAQ Quick Links */}
                            <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-2xl p-8">
                                <h3 className="text-xl font-bold text-primary-800 mb-4">
                                    Questions fréquentes
                                </h3>
                                <p className="text-neutral-600 text-sm mb-4">
                                    Avant de nous contacter, consultez notre FAQ qui pourrait répondre à vos questions.
                                </p>
                                <button
                                    onClick={handleFAQNavigation}
                                    className="inline-flex items-center text-primary-600 hover:text-neutral-50 font-medium text-sm transition-colors"
                                >                        Consulter la FAQ
                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>

                            {/* Emergency Contact */}
                            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                                <h3 className="text-lg font-bold text-red-800 mb-2">
                                    Contact d'urgence
                                </h3>
                                <p className="text-red-700 text-sm mb-3">
                                    Pour les urgences (livres perdus, problèmes de sécurité, etc.)
                                </p>
                                <div className="flex items-center space-x-2">
                                    <span className="text-red-600">📞</span>
                                    <span className="font-semibold text-red-800">+237 650 000 000</span>
                                </div>
                            </div>
                        </div>}
                />
                </ResponsiveContainer>
            </ResponsiveSection>
        </div>
    );
};

export default Contact;
