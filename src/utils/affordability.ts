export const calculateAffordability = (
  annualIncome: number,
  monthlyDebts: number,
  downPayment: number,
  interestRate: number
) => {
  const monthlyGrossIncome = annualIncome / 12;
  
  // 28% Rule for Housing Expenses
  const maxMonthlyPayment = monthlyGrossIncome * 0.28;
  
  // 36% Rule for Total Debt
  const maxTotalDebt = (monthlyGrossIncome * 0.36) - monthlyDebts;
  
  // The lower of the two is the "Safe" limit
  const recommendedPayment = Math.min(maxMonthlyPayment, maxTotalDebt);
  
  // Reverse Mortgage Formula to find Principal
  const monthlyRate = interestRate / 100 / 12;
  const n = 360; // 30 years
  const maxLoan = (recommendedPayment * (Math.pow(1 + monthlyRate, n) - 1)) / 
                  (monthlyRate * Math.pow(1 + monthlyRate, n));

  return {
    maxHomePrice: maxLoan + downPayment,
    recommendedPayment,
    dtiRatio: ((recommendedPayment + monthlyDebts) / monthlyGrossIncome) * 100
  };
};