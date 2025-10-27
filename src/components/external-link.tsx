
'use client';

import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';

// NOTE: This should probably be in a config file
const allowedDomains = [
  'snakewolf.dev', // Current site
  'twitter.com',
  'x.com',
  'youtube.com',
  'twitch.tv',
  'instagram.com',
  'facebook.com',
  'github.com',
  'linkedin.com',
  'store.steampowered.com',
  'play.google.com',
  'apps.apple.com',
  'epicgames.com',
  'fanme.jp',
];

interface ExternalLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

export function ExternalLink({ href, children, className, ...props }: ExternalLinkProps) {
  const [showWarning, setShowWarning] = useState(false);

  const isAllowedDomain = (url: string) => {
    try {
      const hostname = new URL(url).hostname;
      // Allow relative paths (same origin)
      if (!hostname) return true;
      // Allow www. subdomain
      const rootHostname = hostname.startsWith('www.') ? hostname.substring(4) : hostname;
      return allowedDomains.some(domain => rootHostname === domain);
    } catch (e) {
      // Invalid URL, treat as not allowed
      return false;
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href === '#' || isAllowedDomain(href)) {
      // Allow navigation for '#' links or allowed domains
      return;
    }
    
    // Prevent default navigation and show warning
    e.preventDefault();
    setShowWarning(true);
  };

  const handleContinue = () => {
    window.open(href, '_blank', 'noopener,noreferrer');
    setShowWarning(false);
  };

  const handleCancel = () => {
    setShowWarning(false);
  };

  return (
    <>
      <a
        href={href}
        onClick={handleClick}
        target={isAllowedDomain(href) ? '_blank' : undefined}
        rel="noopener noreferrer"
        className={cn(className)}
        {...props}
      >
        {children}
      </a>

      <AlertDialog open={showWarning} onOpenChange={setShowWarning}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>外部リンクへの移動</AlertDialogTitle>
            <AlertDialogDescription>
              これは外部サイトへのリンクです。移動しますか？
              <br />
              <span className="text-sm text-muted-foreground break-all">{href}</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>キャンセル</AlertDialogCancel>
            <AlertDialogAction onClick={handleContinue}>続行</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
