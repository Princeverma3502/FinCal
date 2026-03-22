import { LoanInputs, CalculationResults, AmortizationPeriod } from "@/types";

export const calculateMortgage = (inputs: LoanInputs): CalculationResults => {
  const { principal, interestRate, years, propertyTax, insurance } = inputs;
  
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = years * 12;
  
  // 1. Calculate Monthly Principal & Interest (P&I)
  // Formula: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]
  let monthlyPI = 0;
  if (monthlyRate === 0) {
    monthlyPI = principal / totalMonths;
  } else {
    monthlyPI = 
      (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
      (Math.pow(1 + monthlyRate, totalMonths) - 1);
  }

  const monthlyTax = propertyTax / 12;
  const monthlyInsurance = insurance / 12;
  const totalMonthlyPayment = monthlyPI + monthlyTax + monthlyInsurance;

  // 2. Generate Amortization Schedule
  let balance = principal;
  const schedule: AmortizationPeriod[] = [];

  for (let i = 1; i <= totalMonths; i++) {
    const interest = balance * monthlyRate;
    const principalPaid = monthlyPI - interest;
    balance -= principalPaid;

    schedule.push({
      month: i,
      payment: totalMonthlyPayment,
      interestPaid: interest,
      principalPaid: principalPaid,
      remainingBalance: Math.max(0, balance),
    });
  }

  return {
    monthlyPI,
    monthlyPayment: totalMonthlyPayment,
    totalInterest: (monthlyPI * totalMonths) - principal,
    totalCost: (monthlyPI * totalMonths) + propertyTax * years + insurance * years,
    schedule
  };
};

export const formatCurrency = (val: number) => 
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);