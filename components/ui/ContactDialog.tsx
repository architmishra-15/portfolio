// ContactDialog.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, User, Mail, MessageSquare } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface ContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ContactDialog: React.FC<ContactDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [sending, setSending] = React.useState(false);
  const [sent, setSent] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simulate sending
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setTimeout(() => {
        onOpenChange(false);
        // Reset form after dialog closes
        setTimeout(() => {
          setName('');
          setEmail('');
          setMessage('');
          setSent(false);
        }, 300);
      }, 2000);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md backdrop-blur-lg bg-background/80 border-none shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Get In Touch
          </DialogTitle>
        </DialogHeader>
        <AnimatePresence mode="wait">
          {!sent ? (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-4 mt-4"
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <User className="text-muted-foreground" size={18} />
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                </div>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-background/50 border-border/50 focus:border-primary/50 backdrop-blur-sm"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Mail className="text-muted-foreground" size={18} />
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-background/50 border-border/50 focus:border-primary/50 backdrop-blur-sm"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="text-muted-foreground" size={18} />
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                </div>
                <Textarea
                  id="message"
                  placeholder="How can I help you?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="min-h-32 bg-background/50 border-border/50 focus:border-primary/50 backdrop-blur-sm"
                />
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={sending}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                >
                  {sending ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    >
                      <Send className="mr-2 h-4 w-4" />
                    </motion.div>
                  ) : (
                    <Send className="mr-2 h-4 w-4" />
                  )}
                  {sending ? 'Sending...' : 'Send Message'}
                </Button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center mb-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </motion.div>
              <h3 className="text-xl font-bold">Message Sent!</h3>
              <p className="text-center text-muted-foreground mt-2">
                Thank you for reaching out. I'll get back to you soon!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};
