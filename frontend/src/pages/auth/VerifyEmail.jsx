import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AppContext';
import Loading from '../../components/common/Loading';
import ErrorAlert from '../../components/common/ErrorAlert';
import BackButton from '../../components/common/BackButton';

const VerifyEmail = () => {
    const [verificationStatus, setVerificationStatus] = useState('verifying'); // 'verifying', 'success', 'error'
    const [localError, setLocalError] = useState('');
    const [resendLoading, setResendLoading] = useState(false);
    const [resendCooldown, setResendCooldown] = useState(0);
    const { verifyEmail, resendVerification, user } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    useEffect(() => {
        const verifyUserEmail = async () => {
            if (token) {
                try {
                    await verifyEmail(token);
                    setVerificationStatus('success');
                } catch (err) {
                    console.error('Registration error:', err);
                    setLocalError(`Le lien de vérification est invalide ou a expiré: ${err.message || 'Veuillez réessayer.'}`);
                }
            } else {
                setVerificationStatus('error');
                setLocalError('Lien de vérification manquant.');
            }
        };

        verifyUserEmail();
    }, [token, verifyEmail]);

    useEffect(() => {
        // Countdown for resend button
        if (resendCooldown > 0) {
            const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendCooldown]);

    const handleResendVerification = async () => {
        if (resendCooldown > 0) return;

        setResendLoading(true);
        setLocalError('');

        try {
            await resendVerification(user?.email);
            setResendCooldown(60); // 60 seconds cooldown
        } catch (err) {
            console.error('Registration error:', err);
            setLocalError(`Erreur lors de l'envoi: ${err.message || 'Veuillez réessayer.'}`);
        } finally {
            setResendLoading(false);
        }
    };

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    if (verificationStatus === 'verifying') {
        return <Loading message="Vérification de votre email..." />;
    }

    if (verificationStatus === 'success') {        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-surface-background to-primary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="relative max-w-md w-full">
                    <div className="bg-surface-card/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-surface-border/20 animate-bounce-in">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl mb-4 animate-pulse-shadow">
                                <svg className="w-8 h-8 text-neutral-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h2 className="text-3xl font-bold text-text-primary animate-text-focus-in">Email vérifié avec succès!</h2>
                            <p className="mt-4 text-text-secondary">Vous pouvez maintenant vous connecter.</p>
                            <button 
                                onClick={handleLoginRedirect} 
                                className="mt-6 w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-semibold rounded-2xl text-neutral-900 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 hover:scale-[1.02] hover:shadow-xl hover:shadow-green-500/25 active:scale-[0.98] transition-all duration-300"
                            >
                                Se connecter
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-surface-background to-primary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="relative max-w-md w-full">
                <div className="bg-surface-card/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-surface-border/20 animate-bounce-in">
                    {/* Back Button */}
                    <div className="mb-6">
                        <BackButton to="/login" />
                    </div>
                    
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl mb-4 animate-pulse-shadow">
                            <svg className="w-8 h-8 text-neutral-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-text-primary animate-text-focus-in">Erreur de vérification</h2>
                        <p className="mt-4 text-text-secondary">{localError || 'Une erreur est survenue.'}</p>
                        <button 
                            onClick={handleResendVerification} 
                            className={`mt-6 w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-semibold rounded-2xl text-neutral-900 transition-all duration-300 ${
                                resendLoading || resendCooldown > 0
                                ? 'bg-gradient-to-r from-neutral-400 to-neutral-500 cursor-not-allowed'
                                : 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary-500/25 active:scale-[0.98]'
                            }`}
                            disabled={resendLoading || resendCooldown > 0}
                        >
                {resendLoading ? 'Envoi en cours...' : `Renvoyer l'email de vérification${resendCooldown > 0 ? ` (${resendCooldown}s)` : ''}`}
            </button>
                        <button 
                            onClick={handleLoginRedirect} 
                            className="mt-4 w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-semibold rounded-2xl text-neutral-900 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary-500/25 active:scale-[0.98] transition-all duration-300"
                        >
                            Se connecter
                        </button>
                    </div>
                    {localError && <ErrorAlert message={localError} onClose={() => setLocalError('')} />}
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;