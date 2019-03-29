export interface Donation {
	name: string;
	visibility: string;
	comment: string;
	rawAmount: string | number;
	newTotal: string | number;
	domain: string;
}