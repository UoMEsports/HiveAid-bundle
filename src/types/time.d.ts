export interface MsObj {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
	milliseconds: number;
	microseconds: number;
	nanoseconds: number;
}
export interface TimeStruct extends MsObj {
	formatted: string;
	raw: number;
	timestamp: number;
}