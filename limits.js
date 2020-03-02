export const limits = [
	['purple', transportClimateBudget, 'soutenable sur une journée'],
	['red', transportClimateBudget * 30, 'non soutenable sur une journée']
	//	['red', Infinity, 'non soutenable sur un mois']
]

const // Rough estimate of the 2050 budget per person to stay under 2° by 2100
	climateBudgetPerYear = 2000,
	climateBudgetPerDay = climateBudgetPerYear / 365,
	// Based on current share of the annual mean of 12 ton per french
	// Source : http://ravijen.fr/?p=440
	transportShare = 1 / 4

export const transportClimateBudget = climateBudgetPerDay * transportShare
