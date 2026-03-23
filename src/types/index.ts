export interface LoanInputs {
  principal: number;
  interestRate: number;
  years: number;
  extraPayment: number;
  lumpSumAmount: number;
  propertyTax: number;
  insurance: number;
  taxBracket: number;
}

export interface AmortizationItem {
  month: number;
  payment: number;
  principalPayment: number;
  interestPayment: number;
  remainingBalance: number;
}

export interface LoanResults {
  monthlyPayment: number;
  totalInterest: number;
  totalCost: number;
  schedule: AmortizationItem[];
  payoffDate: Date;
  monthsSaved: number;
  totalTaxSavings: number;
}

export interface BaselineData {
  inputs: LoanInputs;
  results: LoanResults;
}