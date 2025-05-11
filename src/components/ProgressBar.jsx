import React from 'react';

const steps = [
  { label: 'Counselling starts', value: 'NOT_STARTED' },
  { label: 'Application Submission Started', value: 'APPLICATION_SUBMISSION_STARTED' },
  { label: 'Application Submission Closed', value: 'APPLICATION_SUBMISSION_CLOSED' },
  { label: 'Allocation Result Out', value: 'ALLOCATION_RESULT_OUT' },
];

const CounsellingStepper = ({ currentStatus }) => {
  const currentIndex = steps.findIndex(step => step.value === currentStatus);

  return (
    <div className="relative flex justify-between items-center w-full max-w-5xl mx-auto px-4 py-8">
      {/* Background progress line */}
      <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 z-0 transform -translate-y-1/2" />

      {/* Filled progress line */}
      <div
        className="absolute top-1/2 left-0 h-1 bg-blue-500 z-10 transform -translate-y-1/2 transition-all duration-300"
        style={{
          width: `${(currentIndex / (steps.length - 1)) * 100}%`
        }}
      />

      {/* Step circles and labels */}
      {steps.map((step, index) => {
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex;

        return (
          <div key={step.value} className="flex flex-col items-center relative z-20 w-1/4">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full border-2 
                ${isCompleted ? 'border-blue-500' :
                  isCurrent ? 'border-blue-500' : 'border-gray-400'}`}
            >
              <div className={`w-3 h-3 rounded-full 
                ${isCompleted ? 'bg-blue-500' :
                  isCurrent ? 'bg-blue-500' : 'bg-gray-400'}`} />
            </div>
            <div className={`mt-2 text-sm text-center 
              ${isCurrent ? 'text-blue-600 font-semibold' : 'text-gray-700'}`}>
              {step.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CounsellingStepper;
