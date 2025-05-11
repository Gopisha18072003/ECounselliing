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
    <div className="flex items-center justify-between w-full max-w-5xl mx-auto px-4 py-8">
      {steps.map((step, index) => {
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex;

        return (
          <div key={step.value} className="flex-1 flex flex-col items-center relative">
            {/* Line before the circle */}
            {index !== 0 && (
              <div className={`absolute top-4 left-0 w-full h-1 z-0 ${isCompleted ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            )}

            {/* Step circle */}
            <div className={`relative z-10 w-8 h-8 flex items-center justify-center rounded-full border-2 
              ${isCompleted ? 'border-green-500 bg-white' :
                isCurrent ? 'border-blue-500 bg-white' :
                  'border-gray-400 bg-white'}`}>
              <div className={`w-3 h-3 rounded-full 
                ${isCompleted ? 'bg-green-500' :
                  isCurrent ? 'bg-blue-500' : 'bg-gray-400'}`} />
            </div>

            {/* Step label */}
            <div className={`mt-2 text-sm text-center ${isCurrent ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}>
              {step.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CounsellingStepper;
