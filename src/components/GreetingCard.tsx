import React, { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Download, Link, QrCode, RefreshCw, Sparkles } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import html2canvas from 'html2canvas';

export interface GreetingData {
  name: string;
  branch: string;
  year: string;
  greetingTitle: string;
  greetingBody: string;
  motivationalQuote: string;
}

interface GreetingCardProps {
  greeting: GreetingData;
  onNewGreeting: () => void;
}

const GreetingCard = ({ greeting, onNewGreeting }: GreetingCardProps) => {
  const { t } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
      });
      
      const link = document.createElement('a');
      link.download = `RCE-NewYear-2026-${greeting.name.replace(/\s+/g, '-')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      
      toast({
        title: 'Downloaded!',
        description: 'Your greeting card has been saved.',
      });
    } catch (error) {
      toast({
        title: 'Download Failed',
        description: 'Could not download the card. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleCopyLink = () => {
    const link = `${window.location.origin}/greeting/sample`;
    navigator.clipboard.writeText(link);
    toast({
      title: 'Link Copied!',
      description: 'Share link has been copied to clipboard.',
    });
  };

  const handleShowQR = () => {
    toast({
      title: 'QR Code',
      description: 'QR code feature coming soon!',
    });
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Confetti effect */}
        <div className="relative">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-20px',
                backgroundColor: ['#FFD700', '#7C3AED', '#EC4899', '#10B981'][Math.floor(Math.random() * 4)],
                animation: `confetti ${3 + Math.random() * 2}s ease-out forwards`,
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            />
          ))}
        </div>

        {/* Card */}
        <div
          ref={cardRef}
          className="glass-card-strong p-8 sm:p-12 relative overflow-hidden"
        >
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-violet/20 rounded-full blur-3xl" />
          
          {/* Header */}
          <div className="relative text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Ramachandra College of Engineering</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-display font-bold gradient-text mb-2">
              {greeting.greetingTitle}
            </h2>
            
            <p className="text-muted-foreground">
              {greeting.branch} – {greeting.year} Year Student
            </p>
          </div>

          {/* Main Message */}
          <div className="relative mb-8 text-center">
            <p className="text-lg text-foreground leading-relaxed whitespace-pre-line">
              {greeting.greetingBody}
            </p>
          </div>

          {/* Motivational Quote */}
          <div className="relative glass-card p-6 mb-8">
            <div className="text-4xl text-primary/30 font-serif absolute -top-2 left-4">"</div>
            <p className="text-center text-foreground italic text-lg pl-8 pr-8">
              {greeting.motivationalQuote}
            </p>
            <div className="text-4xl text-primary/30 font-serif absolute -bottom-6 right-4">"</div>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-muted-foreground">
            {t.greeting.footer}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Button
            onClick={handleDownload}
            className="btn-glow bg-gradient-to-r from-primary to-gold-light text-primary-foreground"
          >
            <Download className="w-4 h-4 mr-2" />
            {t.greeting.download}
          </Button>
          
          <Button
            onClick={handleCopyLink}
            variant="outline"
            className="border-white/20 bg-white/5 hover:bg-white/10"
          >
            <Link className="w-4 h-4 mr-2" />
            {t.greeting.copyLink}
          </Button>
          
          <Button
            onClick={handleShowQR}
            variant="outline"
            className="border-white/20 bg-white/5 hover:bg-white/10"
          >
            <QrCode className="w-4 h-4 mr-2" />
            {t.greeting.showQR}
          </Button>
        </div>

        {/* New Greeting Button */}
        <div className="text-center mt-8">
          <Button
            onClick={onNewGreeting}
            variant="ghost"
            className="text-muted-foreground hover:text-foreground"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            {t.greeting.newGreeting}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GreetingCard;
