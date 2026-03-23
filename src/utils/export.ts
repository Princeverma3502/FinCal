export const exportToCSV = (data: any[], fileName: string) => {
  // Define Headers
  const headers = ["Month", "Payment", "Principal", "Interest", "Remaining Balance"];
  
  // Map data to CSV rows
  const rows = data.map(item => [
    item.month,
    item.payment.toFixed(2),
    item.principalPayment.toFixed(2),
    item.interestPayment.toFixed(2),
    item.remainingBalance.toFixed(2)
  ]);

  // Combine headers and rows
  const csvContent = [
    headers.join(","),
    ...rows.map(e => e.join(","))
  ].join("\n");

  // Create a download link and click it
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `${fileName}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};