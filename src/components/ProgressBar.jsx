import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = [
  { label: 'Counselling starts', value: 'NOT_STARTED' },
  { label: 'Application Submission Started', value: 'APPLICATION_SUBMISSION_STARTED' },
  { label: 'Application Submission Closed', value: 'APPLICATION_SUBMISSION_CLOSED' },
  { label: 'Allocation Result Out', value: 'ALLOCATION_RESULT_OUT' },
];

export default function CounsellingStepper({ currentStatus }) {
  const activeStep = steps.findIndex(step => step.value === currentStatus);

  return (
    <Box sx={{ width: '100%', padding: '20px' }}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{
          '& .MuiStepConnector-line': {
            borderColor: '#ccc',
            borderTopWidth: 2,
          },
          '& .MuiStepLabel-root .Mui-completed': {
            color: '#1976d2',
          },
          '& .MuiStepLabel-root .Mui-active': {
            color: '#1976d2',
            fontWeight: 'bold',
          },
        }}
      >
        {steps.map((step) => (
          <Step key={step.value}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
