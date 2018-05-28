declare module '*.png' {
	const content: string;
	export default content;
}

declare module '*.svg' {
	const content: string;
	export default content;
}

declare module '*.json' {
	const content: any;
	export default content;
}

declare const __DEV__: boolean;
