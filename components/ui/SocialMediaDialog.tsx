'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Instagram, Linkedin, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface SocialMediaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  socialType: 'instagram' | 'linkedin';
}

export function SocialMediaDialog({ 
  open, 
  onOpenChange, 
  socialType 
}: SocialMediaDialogProps) {
  const isInstagram = socialType === 'instagram';
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isInstagram ? (
              <Instagram className="h-5 w-5 text-pink-500" />
            ) : (
              <Linkedin className="h-5 w-5 text-blue-500" />
            )}
            {isInstagram ? 'Instagram' : 'LinkedIn'} Will Be Added Soon
          </DialogTitle>
          <DialogDescription>
            Thanks for your interest in connecting with me on {isInstagram ? 'Instagram' : 'LinkedIn'}!
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex items-center justify-center p-6">
            {isInstagram ? (
              <div className="text-center space-y-4">
                <div className="h-16 w-16 mx-auto bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Instagram className="h-10 w-10 text-white" />
                </div>
                <p>I'm currently focused on my studies and development projects, but I'll be adding my Instagram profile soon to share my coding journey and projects!</p>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="h-16 w-16 mx-auto bg-blue-500 rounded-lg flex items-center justify-center">
                  <Linkedin className="h-10 w-10 text-white" />
                </div>
                <p>I don't currently possess a LinkedIn profile but will be creating it soon, as I prepare for higher education and career opportunities in development.</p>
              </div>
            )}
          </div>
          
          <div className="flex flex-col space-y-2">
            <h4 className="font-medium">In the meantime, you can:</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>Check out my projects on GitHub and GitLab</li>
              <li>Contact me via email for collaboration opportunities</li>
              <li>Follow my progress by bookmarking this portfolio</li>
            </ul>
          </div>
        </div>
        
        <div className="flex justify-end gap-3">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
          <Link href="/contact" passHref>
            <Button 
              onClick={() => onOpenChange(false)}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              View Contact Info
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}