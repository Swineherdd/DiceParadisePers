type Params = {
	str: string
	maxSymbols: {
		start: number
		end: number
		dotes: number | undefined
	}
}
export const centerEllipsesForStr = ({
	str,
	maxSymbols: { start, end, dotes = 3 },
}: Params): string | null => {
	if (str.length > start + end) {
		const startPart = str.split('').splice(0, start).join('')
		const endPart = str
			.split('')
			.splice(str.length - end)
			.join('')
		return `${startPart}${'.'.repeat(dotes)}${endPart}`
	}
	return null
}
