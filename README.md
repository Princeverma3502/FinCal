🏠 FinCal | Professional Mortgage & Equity Tracker
FinCal is a high-performance, interactive mortgage calculator built for homeowners who want to visualize their financial future. Unlike basic calculators, FinCal offers multi-currency support, tax benefit estimations, and a "Baseline" comparison tool to track how prepayments or rate changes impact long-term wealth.

✨ Key Features
Real-Time Amortization: Instant updates to Equity Growth and Balance Projection charts as you slide parameters.

Multi-Currency Engine: Seamlessly switch between INR (₹), USD ($), GBP (£), and EUR (€) with localized formatting.

Baseline Comparison: Save a "Snapshot" of your current loan to compare against new "What-If" scenarios (refinancing, prepayments, etc.).

Smart Analysis:

Tax Benefit Tracker: Estimate annual savings based on interest components.

Rent vs. Buy: Data-driven comparison to help make the big decision.

Goal Tracking: Progress bars showing how close you are to owning your home 100%.

Professional Exports: Download a branded PDF report or export the full schedule to CSV for Excel analysis.

🚀 Tech Stack
Framework: Next.js 15 (App Router + Turbopack)

Language: TypeScript (Strict Mode)

Styling: Tailwind CSS

Charts: Recharts (Customized for high-density financial data)

Icons: Lucide React

Testing: Playwright (Cross-browser automation)

PDF Generation: jsPDF + AutoTable

🛠️ Getting Started
Prerequisites
Node.js 20.9.0 or later

npm or yarn

Installation
Clone the repository:

Bash
git clone https://github.com/Princeverma3502/FinCal.git
cd FinCal
Install dependencies:

Bash
npm install
Run the development server:

Bash
npm run dev
Open http://localhost:3000 to see the result.

🧪 Testing
We use Playwright for end-to-end testing to ensure financial calculations remain accurate across all browsers.

Bash
# Install browsers
npx playwright install

# Run tests
npx playwright test
🏗️ CI/CD Workflow
The project includes a robust GitHub Actions pipeline that:

Validates TypeScript types (Strict Mode).

Builds the production bundle using Node 20.

Runs E2E tests across Chromium, Firefox, and Webkit.

Uploads test traces if a failure occurs.

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.