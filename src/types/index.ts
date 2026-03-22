export interface LoanInputs {
  principal: number;
  interestRate: number;
  years: number;
  propertyTax: number;
  insurance: number;
  extraPayment: number;
}

export interface AmortizationPeriod {
  month: number;
  payment: number;
  principalPaid: number;
  interestPaid: number;
  remainingBalance: number;
}

export interface CalculationResults {
  monthlyPI: number;
  monthlyPayment: number;
  totalInterest: number;
  totalCost: number;
  schedule: AmortizationPeriod[];
}