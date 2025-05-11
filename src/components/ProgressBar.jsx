import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';

const steps = [
  { label: 'Counselling starts', value: 'NOT_STARTED' },
  { label: 'Application Submission Started', value: 'APPLICATION_SUBMISSION_STARTED' },
  { label: 'Application Submission Closed', value: 'APPLICATION_SUBMISSION_CLOSED' },
  { label: 'Allocation Result Out', value: 'ALLOCATION_RESULT_OUT' },
];

const CounsellingStepper = ({ currentStatus }) => {
  const getStepStatus = (stepValue) => {
    const currentIndex = steps.findIndex(s => s.value === currentStatus);
    const stepIndex = steps.findIndex(s => s.value === stepValue);

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  return (
    <div className="flex items-center justify-between w-full max-w-4xl mx-auto my-8">
      {steps.map((step, index) => {
        const status = getStepStatus(step.value);

        return (
          <div key={step.value} className="flex flex-col items-center w-full relative">
            {/* Line connector */}
            {index !== 0 && (
              <div className={`absolute top-3 left-0 w-full h-1 z-0 ${getStepStatus(steps[index - 1].value) !== 'upcoming' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            )}

            {/* Circle icon */}
            <div className={`relative z-10 w-8 h-8 flex items-center justify-center rounded-full border-2 ${status === 'completed' ? 'bg-green-500 border-green-500' : status === 'current' ? 'border-blue-500' : 'border-gray-400'}`}>
              {status === 'completed' ? (
                <CheckCircle className="text-white w-5 h-5" />
              ) : (
                <Circle className={status === 'current' ? 'text-blue-500' : 'text-gray-400'} />
              )}
            </div>

            {/* Label */}
            <span className={`text-sm mt-2 text-center ${status === 'current' ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}>
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default CounsellingStepper;
