export function calculateProductPrice(product, employee, selectedOptions) {
  let price = 0
  const fmtc = selectedOptions.familyMembersToCover

  switch (product.type) {
    case 'medical': {
      function medTotalCost(subTotal, optionSelection){
        return subTotal + product.costs.find(costs => {return costs.role === optionSelection}).price
        } 
      price =  fmtc.reduce(medTotalCost,0)
      return parseInt(price * 100) / 100
    }

    case 'volLife': {
      function employeeDiscount(subTotal){
        if (product.employerContribution.mode === 'dollar') {
              return product.employerContribution.contribution
        } else {
              return subTotal * (product.employerContribution.contribution / 100)
        }
      }
      function volLifeSubTotal(total, optionSelection){
          let volLifeLevel = selectedOptions.coverageLevel.find(coverageLevel => {
            return coverageLevel.role === optionSelection})
          let volCost = product.costs.find(costs => {
            return costs.role === optionSelection})
          return total + ((volLifeLevel.coverage / volCost.costDivisor) * volCost.price)
        }
      price = fmtc.reduce(volLifeSubTotal, 0)
      price = price - employeeDiscount(price)

      return parseInt(price * 100) / 100
    }

    case 'ltd': {
      if (fmtc.includes('ee')) {
        const eeCoverage = product.coverage.find(coverage => {
          return coverage.role === 'ee'
        })

        const eeCost = product.costs.find(cost => {
          return cost.role === 'ee'
        })

        const salaryPercentage = eeCoverage.percentage / 100

        price += ((employee.salary * salaryPercentage) / eeCost.costDivisor) * eeCost.price
      }

      if (product.employerContribution.mode === 'dollar') {
        price = price - product.employerContribution.contribution
      } else {
        const dollarsOff = price * product.employerContribution.contribution
        price = price - dollarsOff
      }

      return parseInt(price * 100) / 100
    }

    case 'commuter':{
      function commutingCosts(subTotal, optionSelection){
        return subTotal + product.costs.find(costs => {
          return costs.type === optionSelection
        }).price
      }
      price = selectedOptions.commutingType.reduce(commutingCosts, 0)
      return parseInt(price * 100) / 100
    }

    default:
      throw new Error(`Unknown product type: ${product.type}`)
  }
}
