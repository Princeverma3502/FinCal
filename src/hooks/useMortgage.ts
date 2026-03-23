"use client";

import { useState, useMemo } from 'react';
import { LoanInputs } from '@/types';
import { calculateMortgage, CurrencyCode } from '@/utils/finance';

/**
 * Enhanced useMortgage Hook
 * @param initialCurrency - Pass the currency state from your page.tsx here
 */
export const useMortgage = (initialCurrency: CurrencyCode = 'INR') => {
  const [inputs, setInputs] = useState<LoanInputs>({
    principal: 5000000,
    interestRate: 8.5,
    years: 20,
    extraPayment: 0,
    lumpSumAmount: 0,
    propertyTax: 0,
    insurance: 0,
    taxBracket: 30,
  });
  const [currency] = useState<CurrencyCode>(initialCurrency);

  const updateInput = (key: keyof LoanInputs, value: number) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  const results = useMemo(() => {
    return calculateMortgage(inputs, currency);
  }, [inputs, currency]);

  return { 
    inputs, 
    results, 
    updateInput 
  };
};