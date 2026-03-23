import { formatCurrency } from "./finance";

/**
 * Calculates how much a user can afford based on the 28/36 Debt-to-Income rule.
 */
export const calculateAffordability = (
  annualIncome: number,
  monthlyDebts: number,
  downPayment: number,
  interestRate: number
) => {
  const monthlyGross = annualIncome / 12;
  const maxHousingPayment = monthlyGross * 0.28; // Front-end ratio
  const maxTotalDebt = (monthlyGross * 0.36) - monthlyDebts; // Back-end ratio
  
  const recommendedPayment = Math.max(0, Math.min(maxHousingPayment, maxTotalDebt));
  
  const r = (interestRate / 100) / 12;
  const n = 360; // Standard 30-year term
  
  // Reverse Mortgage Formula: P = M / [ (r(1+r)^n) / ((1+r)^n - 1) ]
  const maxLoan = r === 0 ? recommendedPayment * n : 
    recommendedPayment / ((r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));

  return {
    maxHomePrice: maxLoan + downPayment,
    maxLoan,
    recommendedPayment,
    dtiRatio: ((recommendedPayment + monthlyDebts) / monthlyGross) * 100
  };
};

/**
 * Calculates the break-even point for refinancing.
 */
export const calculateRefinance = (
  currentPayment: number,
  newPayment: number,
  closingCosts: number
) => {
  const monthlySavings = currentPayment - newPayment;
  if (monthlySavings <= 0) return null;
  
  const monthsToBreakEven = closingCosts / monthlySavings;
  return {
    monthlySavings,
    monthsToBreakEven: Math.ceil(monthsToBreakEven),
    yearsToBreakEven: (monthsToBreakEven / 12).toFixed(1)
  };
};