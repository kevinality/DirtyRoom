export const medical = {
  name: 'Aetna Premiere PPO',
  vendor: 'Aetna',
  type: 'medical',
  costs: [
    { role: 'ee', price: 19.26, },
    { role: 'sp', price: 2.45, },
    { role: 'ch', price: 1.17, },
    { role: 'chs', price: 0, },
  ]
}

export const voluntaryLife = {
  name: 'SunLife Voluntary Life',
  vendor: 'Sunlife US',
  type: 'volLife',
  employerContribution: {
    mode: 'percentage', contribution: 10,
  },
  coverage: [
    { role: 'ee', minCoverage: 25000, maxCoverage: 300000, guaranteeIssue: 50000, increment: 10000 },
    { role: 'sp', minCoverage: 10000, maxCoverage: 100000, guaranteeIssue: 25000, increment: 5000 },
  ],
  costs: [
    { role: 'ee', costDivisor: 1000, price: 0.35 },
    { role: 'sp', costDivisor: 1000, price: 0.12 },
  ]
}

export const longTermDisability = {
  name: 'Guardian LTD',
  vendor: 'Guardian Insurance',
  type: 'ltd',
  employerContribution: { mode: 'dollar', contribution: 10 },
  coverage: [{ role: 'ee', percentage: 150 }],
  costs: [{ role: 'ee', costDivisor: 5000, price: 0.89 }]
}

export const commuter = {
  name: 'Commuter Assistance',
  vendor: 'Carmichael Transit and Parking',
  type: 'commuter',
  employerContribution: { mode: 'dollars', contribution: 75 },
  costs: [
    { type: 'train', price: 84.75 },
    { type: 'parking', price: 250 }
  ]
}
