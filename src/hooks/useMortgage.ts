import { useState, useMemo } from 'react';
import { calculateMortgage } from '@/utils/finance';
import { LoanInputs } from '@/types';

export const useMortgage = () => {
  // Initial default values for a standard home loan
  const [inputs, setInputs] = useState<LoanInputs>({
    principal: 300000,
    interestRate: 6.5,
    years: 30,
    propertyTax: 3000,
    insurance: 1200,
    extraPayment: 0,
  });

  // Recalculate only when inputs change for maximum performance
  const results = useMemo(() => calculateMortgage(inputs), [inputs]);

  // Helper to update any specific input field
  const updateInput = (key: keyof LoanInputs, value: number) => {
    setInputs((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return {
    inputs,
    results,
    updateInput,
  };
};