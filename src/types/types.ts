export interface DecodedToken {
	userId: string;
	username: string;
	email: string;
	role: string;
	exp: number;
	iat: number;
 } 

 export interface SearchSuggestionProps {
	 placeholder?: string;
	value: string;
	onChange: (value: string) => void;
 }
 //todo: add more types here
 //availableRides