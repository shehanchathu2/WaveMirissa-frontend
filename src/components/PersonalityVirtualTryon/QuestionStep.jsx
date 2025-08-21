import React, { useState } from 'react';
import { ArrowRight, Loader, MessageCircle } from 'lucide-react';

const QuestionStep = ({ questionnaire, onSubmit, onAnswerChange, isLoading }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const currentQuestion = questionnaire[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questionnaire.length - 1;

  const canProceed = currentQuestion && currentQuestion.answer?.trim().length > 0;

  const handleNext = () => {
    if (!canProceed) return;

    if (isLastQuestion) {
      onSubmit();
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleChange = (value) => {
    onAnswerChange(currentQuestion.id, value);
  };

  if (isLoading && questionnaire.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Loader className="w-8 h-8 mb-4 text-teal-700 animate-spin" />
        <p className="text-gray-600">Loading your personality assessment...</p>
      </div>
    );
  }

  if (questionnaire.length === 0) {
    return (
      <div className="py-16 text-center">
        <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <p className="text-gray-600">No questions available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl p-8 mx-auto bg-white shadow-xl rounded-2xl">
      {/* Question Counter */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-2">
          <MessageCircle className="w-5 h-5 text-teal-700" />
          <span className="text-sm font-medium text-gray-600">
            Question {currentQuestionIndex + 1} of {questionnaire.length}
          </span>
        </div>
        <div className="w-32 h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 transition-all duration-300 rounded-full bg-gradient-to-r from-teal-700 to-cyan-600"
            style={{ width: `${((currentQuestionIndex + 1) / questionnaire.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h2 className="mb-6 text-2xl font-bold leading-relaxed text-gray-900">
          {currentQuestion.text}
        </h2>
        <div className="space-y-4">
          <textarea
            value={currentQuestion.answer || ''}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={currentQuestion.placeholder || 'Share your thoughts...'}
            className="w-full h-32 p-4 transition-colors duration-200 border-2 border-gray-200 resize-none rounded-xl focus:border-teal-600 focus:outline-none"
            rows={4}
          />
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Take your time to express yourself authentically</span>
            <span>{currentQuestion.answer?.length || 0} characters</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
            currentQuestionIndex === 0
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-600 hover:text-teal-700 hover:bg-teal-50'
          }`}
        >
          Previous
        </button>

        <button
          onClick={handleNext}
          disabled={!canProceed || isLoading}
          className={`px-8 py-3 rounded-xl font-semibold flex items-center space-x-2 transition-all duration-200 ${
            canProceed && !isLoading
              ? 'bg-gradient-to-r from-teal-700 to-cyan-600 text-white hover:from-teal-800 hover:to-cyan-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isLoading ? (
            <>
              <Loader className="w-4 h-4 animate-spin" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <span>{isLastQuestion ? 'Analyze Personality' : 'Next'}</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default QuestionStep;
