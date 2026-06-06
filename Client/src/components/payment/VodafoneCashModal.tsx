import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Phone, CheckCircle, Shield, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VodafoneCashModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  amount: number;
  courseName: string;
}

const VodafoneCashModal = ({ isOpen, onClose, onSuccess, amount, courseName }: VodafoneCashModalProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pin, setPin] = useState('');
  const [step, setStep] = useState<'phone' | 'pin' | 'processing' | 'success'>('phone');
  const [error, setError] = useState('');

  const validatePhone = (phone: string) => {
    // Egyptian Vodafone numbers start with 010, 011, 012, 015
    const phoneRegex = /^01[0125][0-9]{8}$/;
    return phoneRegex.test(phone);
  };

  const handlePhoneSubmit = () => {
    if (!validatePhone(phoneNumber)) {
      setError('Please enter a valid Egyptian mobile number');
      return;
    }
    setError('');
    setStep('pin');
  };

  const handlePinSubmit = async () => {
    if (pin.length !== 6) {
      setError('PIN must be 6 digits');
      return;
    }
    setError('');
    setStep('processing');
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setStep('success');
    
    setTimeout(() => {
      onSuccess();
      // Reset state
      setPhoneNumber('');
      setPin('');
      setStep('phone');
    }, 2000);
  };

  const handleClose = () => {
    setPhoneNumber('');
    setPin('');
    setStep('phone');
    setError('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-card p-6 rounded-2xl max-w-md w-full"
            onClick={e => e.stopPropagation()}
          >
            {/* Vodafone Cash Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-lg">Vodafone Cash</h2>
                  <p className="text-sm text-muted-foreground">Secure Payment</p>
                </div>
              </div>
              <button onClick={handleClose} className="p-1 hover:bg-muted rounded-lg transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Payment Amount */}
            <div className="bg-muted/50 rounded-xl p-4 mb-6">
              <p className="text-sm text-muted-foreground mb-1">You're paying for:</p>
              <p className="font-medium line-clamp-1 mb-2">{courseName}</p>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Amount:</span>
                <span className="font-display font-bold text-2xl text-primary">${amount}</span>
              </div>
            </div>

            {step === 'phone' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Mobile Number</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">+20</span>
                    <Input
                      type="tel"
                      placeholder="01XXXXXXXXX"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 11))}
                      className="pl-12"
                    />
                  </div>
                  {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
                </div>

                <Button
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                  onClick={handlePhoneSubmit}
                >
                  Continue
                </Button>
              </div>
            )}

            {step === 'pin' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Enter Your PIN</label>
                  <Input
                    type="password"
                    placeholder="••••••"
                    maxLength={6}
                    value={pin}
                    onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="text-center text-2xl tracking-widest"
                  />
                  {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
                  <p className="text-xs text-muted-foreground mt-2">
                    Enter your 6-digit Vodafone Cash PIN
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setStep('phone')}>
                    Back
                  </Button>
                  <Button
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                    onClick={handlePinSubmit}
                  >
                    Pay Now
                  </Button>
                </div>
              </div>
            )}

            {step === 'processing' && (
              <div className="text-center py-8">
                <Loader2 className="h-12 w-12 text-red-600 mx-auto mb-4 animate-spin" />
                <h3 className="font-display font-bold text-lg mb-2">Processing Payment</h3>
                <p className="text-muted-foreground text-sm">
                  Please wait while we process your payment...
                </p>
              </div>
            )}

            {step === 'success' && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">Payment Successful!</h3>
                <p className="text-muted-foreground text-sm">
                  Your course has been unlocked. Enjoy learning!
                </p>
              </div>
            )}

            {/* Security Note */}
            {(step === 'phone' || step === 'pin') && (
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                <Shield className="h-4 w-4 text-green-600" />
                <span className="text-xs text-muted-foreground">
                  Your payment information is encrypted and secure
                </span>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VodafoneCashModal;
