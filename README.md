# COMPOUND — Money, in motion.

A distinctive editorial financial-literacy website built with React 19 and Vite. It is a learning experience, not a finance dashboard.

## Run locally

```bash
npm install
npm run dev
```

Build and preview:

```bash
npm run build
npm run preview
```

## Included and interactive

- Animated opening sequence, abstract CSS illustration, and scroll reveals
- Responsive editorial layouts and reduced-motion support
- Four clickable learning modules with read/completion progress
- Working Nigerian-naira compound-growth calculator and SVG chart
- Adjustable initial amount, monthly contribution, time horizon and assumed annual return
- Financial-safety quiz with feedback
- Mobile navigation and responsive type/layout

## Calculation assumptions

The calculator derives a monthly rate from the selected annual return and adds contributions at the end of each month. It excludes fees, taxes, inflation, and volatility. Returns are assumptions, not predictions or guarantees. Actual investment returns may be negative.

## Research sources

- Investor.gov, Compound Interest Calculator: https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator
- Investor.gov, Compound Interest: https://www.investor.gov/introduction-investing/investing-basics/glossary/compound-interest
- Investor.gov, fraud warning signs: https://www.investor.gov/
- Consumer Financial Protection Bureau, emergency savings guide: https://www.consumerfinance.gov/an-essential-guide-to-building-an-emergency-fund/
- Consumer Financial Protection Bureau, financial education tools: https://www.consumerfinance.gov/consumer-tools/educator-tools/adult-financial-education/tools-and-resources/

## Notes

Lesson completion is kept in React state for the current page session; there is no account or backend. Google Fonts are remote and require internet access. This portfolio demo does not provide personal financial advice.
