import React, { useState, useCallback, useEffect } from "react";
import { Sparkles } from "lucide-react";
import QuestionStep from "../components/PersonalityVirtualTryon/QuestionStep";
import ImageUploadStep from "../components/PersonalityVirtualTryon/ImageUploadStep";
import ResultsStep from "../components/PersonalityVirtualTryon/ResultsStep";
import ProgressBar from "../components/PersonalityVirtualTryon/ProgressBar";
import { SizeSelectionModal } from "../components/ProductPreview/SizeSelectionModal";
import ErrorModal from "../components/PersonalityVirtualTryon/ErrorModal";

const VirtualTryOn = () => {
  const [currentStep, setCurrentStep] = useState("questionnaire");
  const [questionnaire, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [personalityType, setPersonality] = useState(null);
  const [jewelry, setJewelry] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSizeModal, setShowSizeModal] = useState(false);

  // errors
  const [errorMessage, setErrorMessage] = useState(null); // upload / processing errors
  const [showPersonalityError, setShowPersonalityError] = useState(false); // "cannot find personality" popup

  // key used to force remount of QuestionStep when needed
  const [questionKey, setQuestionKey] = useState(0);

  const handleCloseSizeModal = () => setShowSizeModal(false);
  const handleCheckout = () => {
    console.log("Proceed to checkout with:", jewelry);
    setShowSizeModal(false);
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) =>
      prev.map((a) => (a.id === questionId ? { ...a, answer: value } : a))
    );
  };

  const fetchQuestions = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:8080/virtual_try_on/api/questions");
      const data = await res.json();
      if (data && data.questions) {
        const formatted = data.questions.map((q, idx) => ({
          id: String(idx + 1),
          text: q,
          type: "text",
          placeholder: "Your answer here...",
          answer: "",
        }));
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
      const payload = answers.map((a) => ({
        questionId: a.id,
        questionText: a.text,
        answer: a.answer?.trim() || "",
      }));

      const res = await fetch("http://localhost:8080/virtual_try_on/api/answers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (
        data &&
        data.personality &&
        data.personality !== "Cannot find personality, please try again."
      ) {
        setPersonality({
          personality: data.personality,
          description: data.description,
        });
        setCurrentStep("upload");
      } else {
        // show the personality popup (full restart option)
        setShowPersonalityError(true);
      }
    } catch (err) {
      console.error("Error submitting answers:", err);
      setShowPersonalityError(true);
    }
    setIsLoading(false);
  }, [answers]);

  const processImage = useCallback(
    async (file) => {
      if (!personalityType) return;

      setIsLoading(true);
      setErrorMessage(null);

      try {
        const form = new FormData();
        form.append("userImage", file);
        form.append("personality", personalityType.personality);

        const res = await fetch("http://localhost:8080/virtual_try_on/api/tryon", {
          method: "POST",
          body: form,
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || `Server returned ${res.status}`);
        }

        const data = await res.json();

        if (!data.imageUrl) {
          throw new Error("Image URL missing from response");
        }

        setProcessedImage(data.imageUrl);

        setJewelry({
          id: data.necklaceId,
          name: data.name,
          type: "necklace",
          basePrice: data.price,
          description: data.personalityDescription,
          material: data.material,
          imageUrl1: data.imageUrl1,
          imageUrl2: data.imageUrl2,
          imageUrl3: data.imageUrl3,
        });

        setCurrentStep("results");
      } catch (err) {
        console.error("Virtual try-on error:", err);
        setErrorMessage("We couldn't process your photo. Please try again.");
        setCurrentStep("error");
      } finally {
        setIsLoading(false);
      }
    },
    [personalityType]
  );

  // Full restart: clears everything and forces QuestionStep remount
  const resetJourney = useCallback(() => {
    setCurrentStep("questionnaire");
    setAnswers([]);
    setPersonality(null);
    setJewelry(null);
    setProcessedImage(null);
    setQuestions([]);
    setErrorMessage(null);
    setShowPersonalityError(false);
    // increment key to force remount so internal QuestionStep index becomes 0
    setQuestionKey((k) => k + 1);
  }, []);

  // Back to questionnaire from upload-error: keep answers but start from question 1
  const backToQuestionsPreserveAnswers = useCallback(() => {
    setCurrentStep("questionnaire");
    // remount QuestionStep to reset its internal current-question index,
    // but keep the existing answers array
    setQuestionKey((k) => k + 1);
    setErrorMessage(null);
  }, []);

  const goToStep = useCallback((step) => setCurrentStep(step), []);

  useEffect(() => {
    if (currentStep === "questionnaire" && questionnaire.length === 0) {
      fetchQuestions();
    }
  }, [currentStep, questionnaire.length, fetchQuestions]);

  const getStepNumber = (step) => {
    switch (step) {
      case "questionnaire":
        return 1;
      case "upload":
        return 2;
      case "results":
        return 3;
      case "error":
        return 2;
      default:
        return 1;
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
          {currentStep === "questionnaire" && (
            // pass `key` so we can remount QuestionStep when needed
            <QuestionStep
              key={questionKey}
              questionnaire={questionnaire.map((q, idx) => ({
                ...q,
                answer: answers[idx]?.answer || "",
              }))}
              onSubmit={submitAnswers}
              onAnswerChange={handleAnswerChange}
              isLoading={isLoading}
            />
          )}

          {currentStep === "upload" && personalityType && (
            <ImageUploadStep
              onImageUpload={processImage}
              onBack={() => {
                // If user clicks back from upload, we want to keep answers and start at Q1
                backToQuestionsPreserveAnswers();
              }}
              isLoading={isLoading}
              personalityType={personalityType}
            />
          )}

          {currentStep === "results" && personalityType && jewelry && processedImage && (
            <ResultsStep
              personalityType={personalityType}
              jewelry={jewelry}
              processedImage={processedImage}
              setShowSizeModal={setShowSizeModal}
              onReset={resetJourney}
              enableDownload={true}
              goToStep={goToStep} // <-- add this line
            />
          )}

          {/* Upload / processing errors (image overlay/upload error) */}
          {currentStep === "error" && errorMessage && (
            <div className="max-w-2xl p-8 mx-auto bg-red-50 border border-red-400 text-red-700 rounded-xl text-center">
              <p className="text-lg font-semibold mb-6">{errorMessage}</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => goToStep("upload")}
                  className="px-6 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600"
                >
                  Re-upload Image
                </button>

                {/* Back to Questions: preserve previous answers, but force start at Q1 */}
                <button
                  onClick={() => backToQuestionsPreserveAnswers()}
                  className="px-6 py-3 bg-gray-500 text-white rounded-xl font-semibold hover:bg-gray-600"
                >
                  Back to Questions
                </button>
              </div>
            </div>
          )}
        </div>

        {showSizeModal && (
          <SizeSelectionModal
            isOpen={showSizeModal}
            onClose={handleCloseSizeModal}
            jewelry={jewelry}
            totalPrice={jewelry?.basePrice}
            onCheckout={handleCheckout}
          />
        )}
      </div>

      {/* Personality analysis "cannot find" popup -> full restart */}
      {showPersonalityError && (
        <ErrorModal
          message="Cannot find personality, please try again."
          onConfirm={() => {
            // full restart: clear answers & questions and remount QuestionStep
            resetJourney();
          }}
        />
      )}
    </div>
  );
};

export default VirtualTryOn;
