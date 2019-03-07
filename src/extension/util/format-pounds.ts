/**
 * Formats an amount as GBP, pence optional.
 * @param amount - The amount to format.
 * @param pence - Whether or not to include pence in the formatted string.
 * @returns The formatted string.
 */
export function formatPounds(amount: number | string, {pence = true} = {}) {
	const fractionDigits = pence ? 2 : 0;
	const parsedAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
	return parsedAmount.toLocaleString('en-GB', {
		style: 'currency',
		currency: 'GBP',
		maximumFractionDigits: fractionDigits,
		minimumFractionDigits: fractionDigits
	});
}