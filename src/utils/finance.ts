import { LoanInputs, AmortizationPeriod } from "@/types";

export const formatCurrency = (val: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(val);

export const getPayoffDate = (years: number): string => {
  const date = new Date();
  date.setFullYear(date.getFullYear() + Number(years));
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

export const calculateMortgage = (inputs: LoanInputs) => {
  const { principal, interestRate, years, propertyTax, insurance, extraPayment } = inputs;

  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = years * 12;

  // Monthly Principal & Interest (Standard Formula)
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
  const baseMonthlyPayment = monthlyPI + monthlyTax + monthlyInsurance;

  let balance = principal;
  const schedule: AmortizationPeriod[] = [];
  let totalInterestPaid = 0;

  for (let i = 1; i <= totalMonths; i++) {
    if (balance <= 0) break;

    const interest = balance * monthlyRate;
    // User pays base monthly + extra
    let actualPrincipalPaid = (monthlyPI - interest) + extraPayment;
    
    // Ensure we don't overpay the remaining balance
    if (actualPrincipalPaid > balance) {
      actualPrincipalPaid = balance;
    }

    totalInterestPaid += interest;
    balance -= actualPrincipalPaid;

    schedule.push({
      month: i,
      payment: baseMonthlyPayment + extraPayment,
      interestPaid: interest,
      principalPaid: actualPrincipalPaid,
      remainingBalance: Math.max(0, balance),
    });
  }

  return {
    monthlyPayment: baseMonthlyPayment + extraPayment,
    totalInterest: totalInterestPaid,
    totalCost: principal + totalInterestPaid + (propertyTax * years) + (insurance * years),
    schedule,
    payoffDate: getPayoffDate(schedule.length / 12),
    monthsSaved: totalMonths - schedule.length
  };
};