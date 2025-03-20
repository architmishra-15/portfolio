'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Gitlab, Send, Copy, Check, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      label: 'Email',
      value: 'architmishra@example.com',
      action: 'Copy',
      key: 'email'
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: 'Phone',
      value: '+91 69696 96969',
      action: 'Copy',
      key: 'phone'
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: 'Location',
      value: 'Red Light Area, India',
      action: null,
      key: 'location'
    },
    {
      icon: <Github className="h-5 w-5" />,
      label: 'GitHub',
      value: 'github.com/architmishra-15',
      action: 'Visit',
      url: 'https://github.com/architmishra-15',
      key: 'github'
    },
    {
      icon: <Gitlab className="h-5 w-5" />,
      label: 'GitLab',
      value: 'gitlab.com/archit_mishra',
      action: 'Visit',
      url: 'https://gitlab.com/archit_mishra',
      key: 'gitlab'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle form submission, e.g., send email
    toast({
      title: "Message sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    });
    // Reset form
    setName('');
    setEmail('');
    setMessage('');
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
      toast({
        title: "Copied to clipboard",
        description: `${text} has been copied to your clipboard.`,
      });
    });
  };

  return (
    <main className="min-h-screen bg-background relative overflow-hidden py-20 px-4">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(120,119,198,0.15),transparent)]" />
      </div>

      {/* Home Button */}
      <div className="max-w-6xl mx-auto mb-6">
        <Link href="/">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Get in Touch</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <h2 className="text-2xl font-semibold">Contact Information</h2>
            <div className="space-y-4">
              {contactInfo.map((item) => (
                <Card key={item.key} className="overflow-hidden border border-border hover:border-primary/20 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full text-primary">
                          {item.icon}
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{item.label}</p>
                          <p className="font-medium">{item.value}</p>
                        </div>
                      </div>
                      {item.action && (
                        item.action === 'Copy' ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs"
                            onClick={() => copyToClipboard(item.value, item.key)}
                          >
                            {copied === item.key ? (
                              <Check className="h-4 w-4 mr-1 text-green-500" />
                            ) : (
                              <Copy className="h-4 w-4 mr-1" />
                            )}
                            {copied === item.key ? 'Copied!' : 'Copy'}
                          </Button>
                        ) : (
                          <Link href={item.url!} target="_blank" rel="noopener noreferrer">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-xs"
                            >
                              Visit
                            </Button>
                          </Link>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-card/60 backdrop-blur-sm border border-border p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-4">Availability</h3>
              <p className="text-muted-foreground mb-4">
                I'm currently in class 12th, so my availability varies. I'm most responsive:
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>Weekdays: After 6:00 PM IST</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>Weekends: 10:00 AM - 8:00 PM IST</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-card/60 backdrop-blur-sm border border-border p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Hello, I'd like to talk about..."
                    rows={5}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-full"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}