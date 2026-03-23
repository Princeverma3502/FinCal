import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { LoanInputs, LoanResults } from '@/types';
import { formatCurrency, CurrencyCode } from './finance'; // Import CurrencyCode

export const generatePDF = (inputs: LoanInputs, results: LoanResults, currency: CurrencyCode) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;

  // 1. Header & Branding
  doc.setFillColor(79, 70, 229); // Indigo-600
  doc.rect(0, 0, pageWidth, 40, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('FinCal. Mortgage Report', 15, 25);
  
  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth - 60, 25);

  // 2. Summary Section
  doc.setTextColor(30, 41, 59); // Slate-800
  doc.setFontSize(14);
  doc.text('Loan Summary', 15, 55);
  
  autoTable(doc, {
    startY: 60,
    head: [['Parameter', 'Value']],
    body: [

      ['Principal Amount', formatCurrency(inputs.principal, currency)],
      ['Interest Rate', `${inputs.interestRate}%`],
      ['Loan Tenure', `${inputs.years} Years`],
      ['Monthly EMI', formatCurrency(results.monthlyPayment, currency)],
      ['Total Interest Payable', formatCurrency(results.totalInterest, currency)],
      ['Total Tax Savings', formatCurrency(results.totalTaxSavings, currency)],
      ['Estimated Payoff Date', results.payoffDate.toLocaleDateString()],
    ],
    theme: 'striped',
    headStyles: { fillColor: [79, 70, 229] },
  });

  const yearlyData = results.schedule.filter(item => item.month % 12 === 0 || item.remainingBalance === 0);
  
  doc.setFontSize(14);
  doc.text('Yearly Amortization Schedule', 15, (doc as any).lastAutoTable.finalY + 15);

  autoTable(doc, {
    startY: (doc as any).lastAutoTable.finalY + 20,
    head: [['Year', 'Principal Paid', 'Interest Paid', 'Remaining Balance']],

    body: yearlyData.map(item => [
      `Year ${Math.ceil(item.month / 12)}`,
      formatCurrency(item.principalPayment, currency),
      formatCurrency(item.interestPayment, currency),
      formatCurrency(item.remainingBalance, currency)
    ]),
    headStyles: { fillColor: [30, 41, 59] },
  });

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(150);
  doc.text('This report is for estimation purposes only. Consult your bank for exact figures.', 15, doc.internal.pageSize.height - 10);

  doc.save(`FinCal_Report_${Date.now()}.pdf`);
};