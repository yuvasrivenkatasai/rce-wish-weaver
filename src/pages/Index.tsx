import React, { useState } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import StarBackground from '@/components/StarBackground';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import HowItWorks from '@/components/HowItWorks';
import GreetingForm, { FormData } from '@/components/GreetingForm';
import GreetingCard, { GreetingData } from '@/components/GreetingCard';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import SampleGreetingModal from '@/components/SampleGreetingModal';
import { toast } from '@/hooks/use-toast';

const IndexContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [greeting, setGreeting] = useState<GreetingData | null>(null);
  const [showSample, setShowSample] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const scrollToForm = () => {
    setShowForm(true);
    setTimeout(() => {
      const formElement = document.getElementById('form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleFormSubmit = async (formData: FormData) => {
    setIsLoading(true);
    
    try {
      // Simulate AI generation (will be replaced with actual API call)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate greeting based on language
      const isEnglish = formData.language === 'EN';
      const yearText = ['1st', '2nd', '3rd', '4th'][parseInt(formData.year) - 1];
      
      // Generate unique greeting variations
      const greetingVariations = isEnglish ? [
        `Dear ${formData.name}, as we welcome 2026, may this year bring you extraordinary success in your ${formData.branch} journey. Your ${yearText} year is a stepping stone to greatness!`,
        `Hello ${formData.name}! The dawn of 2026 brings new opportunities for a brilliant ${formData.branch} student like you. May your ${yearText} year be filled with learning and achievements!`,
        `Greetings ${formData.name}! As 2026 unfolds, may you discover new passions and excel in ${formData.branch}. Your journey in the ${yearText} year is just beginning!`,
      ] : [
        `ప్రియమైన ${formData.name}, 2026 లోకి అడుగుపెడుతున్న ఈ సమయంలో, మీ ${formData.branch} ప్రయాణంలో అసాధారణ విజయాలు సాధించాలని కోరుకుంటున్నాము!`,
        `హలో ${formData.name}! 2026 కొత్త అవకాశాలను తీసుకువస్తుంది. ${formData.branch} లో మీ ${yearText} సంవత్సరం గొప్ప విజయాలతో నిండాలని కోరుకుంటున్నాం!`,
        `శుభాకాంక్షలు ${formData.name}! 2026 మీ జీవితంలో నూతన ఆరంభాన్ని సూచిస్తుంది. ${formData.branch} లో మీ ప్రతిభను చూపించండి!`,
      ];
      
      const quoteVariations = isEnglish ? [
        `"Small steps every day can make 2026 your best year yet."`,
        `"Dream big, work hard, and let 2026 be the year you surprise yourself."`,
        `"Success is not final, failure is not fatal. Keep pushing forward in 2026!"`,
        `"Every expert was once a beginner. Make 2026 your year of growth."`,
      ] : [
        `"ప్రతిరోజు చిన్న అడుగులు 2026 ను మీ అత్యుత్తమ సంవత్సరంగా మార్చగలవు."`,
        `"పెద్ద కలలు కనండి, కష్టపడి పని చేయండి, 2026 మిమ్మల్ని ఆశ్చర్యపరిచే సంవత్సరం కానివ్వండి."`,
        `"విజయం అంతిమం కాదు, వైఫల్యం మరణకరం కాదు. 2026 లో ముందుకు సాగండి!"`,
      ];

      // Add goal-based personalization
      let goalMessage = '';
      if (formData.goal) {
        goalMessage = isEnglish 
          ? `\n\nWe know your goal for 2026 is to "${formData.goal}" – and we believe you have what it takes to achieve it!`
          : `\n\nమీ 2026 లక్ష్యం "${formData.goal}" అని మాకు తెలుసు – మీరు దానిని సాధించగలరని మేము నమ్ముతున్నాము!`;
      }

      const randomGreeting = greetingVariations[Math.floor(Math.random() * greetingVariations.length)];
      const randomQuote = quoteVariations[Math.floor(Math.random() * quoteVariations.length)];

      const generatedGreeting: GreetingData = {
        name: formData.name,
        branch: formData.branch,
        year: `${yearText} Year`,
        greetingTitle: isEnglish 
          ? `Happy New Year 2026, ${formData.name}! 🎉`
          : `${formData.name}, నూతన సంవత్సర శుభాకాంక్షలు 2026! 🎉`,
        greetingBody: randomGreeting + goalMessage,
        motivationalQuote: randomQuote,
      };

      setGreeting(generatedGreeting);
      
      // Scroll to greeting card
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);

      toast({
        title: isEnglish ? 'Greeting Generated!' : 'శుభాకాంక్షలు సృష్టించబడ్డాయి!',
        description: isEnglish 
          ? 'Your personalized greeting is ready!'
          : 'మీ వ్యక్తిగతీకరించిన శుభాకాంక్షలు సిద్ధంగా ఉన్నాయి!',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to generate greeting. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewGreeting = () => {
    setGreeting(null);
    setShowForm(true);
    setTimeout(() => {
      const formElement = document.getElementById('form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen relative">
      <StarBackground />
      <Navbar />
      
      <main className="relative z-10">
        {greeting ? (
          <div className="pt-24">
            <GreetingCard greeting={greeting} onNewGreeting={handleNewGreeting} />
          </div>
        ) : (
          <>
            <HeroSection 
              onGetGreeting={scrollToForm}
              onViewSample={() => setShowSample(true)}
            />
            <HowItWorks />
            {showForm && (
              <GreetingForm onSubmit={handleFormSubmit} isLoading={isLoading} />
            )}
            <AboutSection />
          </>
        )}
      </main>

      <Footer />
      
      <SampleGreetingModal 
        isOpen={showSample}
        onClose={() => setShowSample(false)}
      />
    </div>
  );
};

const Index = () => {
  return (
    <LanguageProvider>
      <IndexContent />
    </LanguageProvider>
  );
};

export default Index;
