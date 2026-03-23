"use client";

export type CurrencyCode = 'INR' | 'USD' | 'GBP' | 'EUR';

export const CURRENCY_CONFIG: Record<CurrencyCode, { locale: string; symbol: string }> = {
  INR: { locale: 'en-IN', symbol: '₹' },
  USD: { locale: 'en-US', symbol: '$' },
  GBP: { locale: 'en-GB', symbol: '£' },
  EUR: { locale: 'en-EU', symbol: '€' },
};

export const formatCurrency = (amount: number, currency: CurrencyCode): string => {
  const config = CURRENCY_CONFIG[currency];
  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(amount);
};
export const getPayoffDate = (months: number): Date => {
  const date = new Date();
  date.setMonth(date.getMonth() + Math.round(months));
  return date;
};

export const calculateMortgage = (inputs: any, code: CurrencyCode = 'INR') => {
  const { 
    principal, 
    interestRate, 
    years, 
    propertyTax, 
    insurance, 
    extraPayment, 
    lumpSumAmount, 
    taxBracket 
  } = inputs;

  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = years * 12;

  const monthlyPI = monthlyRate === 0 
    ? principal / totalMonths 
    : (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
      (Math.pow(1 + monthlyRate, totalMonths) - 1);

  let balance = principal;
  const schedule = [];
  let totalInterestPaid = 0;

  for (let i = 1; i <= totalMonths; i++) {
    if (balance <= 0) break;

    const interest = balance * monthlyRate;
    

    const isLumpSumMonth = i % 12 === 0;
    const currentLumpSum = isLumpSumMonth ? lumpSumAmount : 0;
    
    let actualPrincipalPaid = (monthlyPI - interest) + extraPayment + currentLumpSum;
    
    if (actualPrincipalPaid > balance) {
      actualPrincipalPaid = balance;
    }

    totalInterestPaid += interest;
    balance -= actualPrincipalPaid;

    schedule.push({
      month: i,
      payment: monthlyPI + extraPayment + currentLumpSum,
      interestPayment: interest,
      principalPayment: actualPrincipalPaid,
      remainingBalance: Math.max(0, balance),
    });
  }

  const totalTaxSavings = totalInterestPaid * (taxBracket / 100);

  return {
    monthlyPayment: monthlyPI + (propertyTax / 12) + (insurance / 12) + extraPayment,
    totalInterest: totalInterestPaid,
    totalCost: principal + totalInterestPaid + (propertyTax * years) + (insurance * years),
    schedule,
    payoffDate: getPayoffDate(schedule.length),
    monthsSaved: totalMonths - schedule.length,
    totalTaxSavings,
    currencyCode: code
  };
};