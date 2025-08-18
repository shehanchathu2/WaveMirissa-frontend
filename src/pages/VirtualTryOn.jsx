import React, { useState, useCallback, useEffect } from 'react';
import {
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import QuestionStep from '../components/PersonalityVirtualTryon/QuestionStep';
import ImageUploadStep from '../components/PersonalityVirtualTryon/ImageUploadStep';
import ResultsStep from '../components/PersonalityVirtualTryon/ResultsStep';
import ProgressBar from '../components/PersonalityVirtualTryon/ProgressBar';
import sampleimg from '../assets/sampleProducts/CowrieShell-Black_01.jpeg';
import {SizeSelectionModal} from '../components/ProductPreview/SizeSelectionModal';




const VirtualTryOn = () => {
  const [currentStep, setCurrentStep] = useState('questionnaire');
  const [questionnaire, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [personalityType, setPersonality] = useState(null);
  const [jewelry, setJewelry] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSizeModal, setShowSizeModal] = useState(false);

  const isSizeModalOpen = showSizeModal; // Alias for clarity
  const handleCloseSizeModal = () => setShowSizeModal(false);
  const handleCheckout = () => {
    // Add your checkout logic here
    console.log("Proceed to checkout with:", jewelry);
    setShowSizeModal(false);
  };



    const fetchQuestions = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8080/virtual_try_on/api/questions"); // Spring Boot endpoint
      const data = await response.json();

      // Shuffle function
      const shuffleArray = (arr) => arr
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

      // Randomize questions
      const randomized = shuffleArray(data.questions);

      // Transform backend response into your frontend format
      const formattedQuestions = randomized.map((q, index) => ({
        id: (index + 1).toString(),
        text: q,
        type: 'text',
        placeholder: 'Write your answer here...'
      }));

      setQuestions(formattedQuestions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);



  const submitAnswers = useCallback(async (answers) => {
    setIsLoading(true);
    try {
      // Send answers to backend
      const response = await fetch("http://localhost:8080/virtual_try_on/api/answers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(answers)
      });

      const result = await response.text();
      console.log("Backend response:", result);

      // Mock personality detection for now
      const mockPersonality = {
        personality: 'Open-Hearted & Creative',
        description: 'You are highly creative, curious, and open to new experiences...'
      };

      setPersonality(mockPersonality);
      setAnswers(answers);
      setCurrentStep('upload');
    } catch (error) {
      console.error("Error submitting answers:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);


 

  const processImage = useCallback(async (imageData) => {
    setIsLoading(true);
    setUploadedImage(imageData);
    await new Promise(resolve => setTimeout(resolve, 3000));

  const JewelryItem = {
  id: 'classic-necklace',
  name: 'Cowrie Shell Necklace with Black String',
  basePrice: 800,
  image: sampleimg,
  description: 'Like you, this necklace embodies creativity and openness to the unknown. The moonstone reflects your intuitive nature and love for artistic beauty, while the rose gold speaks to your warm, agreeable personality. Each time light catches the stone, it mirrors your curious spirit exploring new possibilities. This piece perfectly complements your authentic self-expression and appreciation for meaningful beauty.',
  materials: ['Black String', 'Sea-shells'],
  type: 'necklace',
  gender: 'women'
  
  
};

    //const mockJewelry = {
      //name: 'Celestial Dreams Necklace',
    //   style: 'Modern Bohemian',
    //   material: 'Rose Gold with Moonstone',
    //   description: 'A delicate piece featuring ethereal moonstone gems that catch light beautifully, designed for those who appreciate subtle elegance with mystical undertones.',
    //   imageUrl: 'https://images.pexels.com/photos/1454169/pexels-photo-1454169.jpeg?auto=compress&cs=tinysrgb&w=400',
    //   personalizedStory: 'Like you, this necklace embodies creativity and openness to the unknown. The moonstone reflects your intuitive nature and love for artistic beauty, while the rose gold speaks to your warm, agreeable personality. Each time light catches the stone, it mirrors your curious spirit exploring new possibilities. This piece perfectly complements your authentic self-expression and appreciation for meaningful beauty.'
    // };

    setJewelry(JewelryItem);
    setProcessedImage(imageData);
    setCurrentStep('results');
    setIsLoading(false);
  }, []);

  const resetJourney = useCallback(() => {
    setCurrentStep('questionnaire');
    setAnswers([]);
    setUploadedImage(null);
    setPersonality(null);
    setJewelry(null);
    setProcessedImage(null);
    setQuestions([]);
  }, []);

  const goToStep = useCallback((step) => {
    setCurrentStep(step);
  }, []);

  useEffect(() => {
    if (currentStep === 'questionnaire' && questionnaire.length === 0) {
      fetchQuestions();
    }
  }, [currentStep, questionnaire.length, fetchQuestions]);

  const getStepNumber = (step) => {
    switch (step) {
      case 'questionnaire': return 1;
      case 'upload': return 2;
      case 'results': return 3;
      default: return 1;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-100">
      <div className="container px-4 py-8 mx-auto">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 mr-2 text-teal-700" />
            <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-teal-700 to-cyan-600 bg-clip-text">
              Personality Jewelry Finder
            </h1>
          </div>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Discover jewelry that reflects your unique personality through AI-powered analysis and virtual try-on
          </p>
        </div>

        <ProgressBar currentStep={getStepNumber(currentStep)} totalSteps={3} />

        <div className="max-w-4xl mx-auto mt-8">
          {currentStep === 'questionnaire' && (
            <QuestionStep
              questionnaire={questionnaire}
              onSubmit={submitAnswers}
              isLoading={isLoading}
            />
          )}

          {currentStep === 'upload' && (
            <ImageUploadStep
              onImageUpload={processImage}
              onBack={() => goToStep('questionnaire')}
              isLoading={isLoading}
              personalityType={personalityType}
            />
          )}

          {currentStep === 'results' && personalityType && jewelry && (
            <ResultsStep
              personalityType={personalityType}
              jewelry={jewelry}
              setShowSizeModal={setShowSizeModal}
              processedImage={processedImage}
              onReset={resetJourney}
              
            />
          )}
        </div>

        {currentStep !== 'questionnaire' && currentStep !== 'results' && (
          <div className="fixed transform -translate-x-1/2 bottom-8 left-1/2">
            <div className="flex items-center px-6 py-3 space-x-4 bg-white rounded-full shadow-lg">
              <button
                onClick={() => {
                  if (currentStep === 'upload') goToStep('questionnaire');
                }}
                className="flex items-center text-gray-600 transition-colors hover:text-teal-700"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </button>
            </div>
          </div>
        )}
      </div>
      {showSizeModal && (
      <SizeSelectionModal
              isOpen={isSizeModalOpen}
              onClose={handleCloseSizeModal}
              
              jewelry={jewelry}
              totalPrice={jewelry.basePrice}
              onCheckout={handleCheckout}
              
               
            />
      )}
    </div>
    
  );
}

export default VirtualTryOn;
