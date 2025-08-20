import React, { useState, useCallback, useEffect } from 'react';
import { Sparkles, ArrowLeft } from 'lucide-react';
import QuestionStep from '../components/PersonalityVirtualTryon/QuestionStep';
import ImageUploadStep from '../components/PersonalityVirtualTryon/ImageUploadStep';
import ResultsStep from '../components/PersonalityVirtualTryon/ResultsStep';
import ProgressBar from '../components/PersonalityVirtualTryon/ProgressBar';
import sampleimg from '../assets/sampleProducts/CowrieShell-Black_01.jpeg';
import { SizeSelectionModal } from '../components/ProductPreview/SizeSelectionModal';

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
  const [errorMessage, setErrorMessage] = useState(null);

  const isSizeModalOpen = showSizeModal;
  const handleCloseSizeModal = () => setShowSizeModal(false);

  const handleCheckout = () => {
    console.log("Proceed to checkout with:", jewelry);
    setShowSizeModal(false);
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev =>
      prev.map(a => (a.id === questionId ? { ...a, answer: value } : a))
    );
  };

  const fetchQuestions = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:8080/virtual_try_on/api/questions");
      const data = await res.json();

      if (data && data.questions) {
        const formatted = data.questions
          .map((q, idx) => ({
            id: String(idx + 1),
            text: q,
            type: 'text',
            placeholder: 'Your answer here...',
            answer: ''
          }))
          .sort(() => Math.random() - 0.5);

        setQuestions(formatted);
        setAnswers(formatted);
      }
    } catch (err) {
      console.error("Error fetching questions:", err);
    }
    setIsLoading(false);
  }, []);

  const submitAnswers = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const payload = answers.map(a => ({
        questionId: a.id,
        questionText: a.text,
        answer: a.answer?.trim() || ''
      }));

      console.log("📤 Sending answers to backend:", payload);

      const res = await fetch("http://localhost:8080/virtual_try_on/api/answers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (data && data.personality) {
        setPersonality({ personality: data.personality });
        setCurrentStep('upload');
      } else {
        setErrorMessage("Cannot find personality, please try again.");
        setCurrentStep('error');
      }

    } catch (err) {
      console.error("Error submitting answers:", err);
      setErrorMessage("Cannot find personality, please try again.");
      setCurrentStep('error');
    }
    setIsLoading(false);
  }, [answers]);

  const processImage = useCallback(async (imageData) => {
    setIsLoading(true);
    setUploadedImage(imageData);
    await new Promise(resolve => setTimeout(resolve, 3000));

    const JewelryItem = {
      id: 'classic-necklace',
      name: 'Cowrie Shell Necklace with Black String',
      basePrice: 800,
      image: sampleimg,
      description: 'Like you, this necklace embodies creativity and openness to the unknown...',
      materials: ['Black String', 'Sea-shells'],
      type: 'necklace',
      gender: 'women'
    };

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
    setErrorMessage(null);
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
      case 'error': return 2;
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
              questionnaire={questionnaire.map((q, idx) => ({
                ...q,
                answer: answers[idx]?.answer || ''
              }))}
              onSubmit={submitAnswers}
              onAnswerChange={handleAnswerChange}
              isLoading={isLoading}
            />
          )}

          {currentStep === 'upload' && personalityType && (
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

          {currentStep === 'error' && errorMessage && (
            <div className="max-w-2xl p-8 mx-auto bg-red-50 border border-red-400 text-red-700 rounded-xl text-center">
              <p className="text-lg font-semibold mb-6">{errorMessage}</p>
              <button
                onClick={() => goToStep('questionnaire')}
                className="px-6 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600"
              >
                Back to Questions
              </button>
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
    </div>
  );
};

export default VirtualTryOn;
