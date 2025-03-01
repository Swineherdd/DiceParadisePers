type TAdditional = string | undefined

export const cn = (
	main: string,
	additional: TAdditional[] = [],
	mods: Record<string, boolean | undefined> = {}
): string => {
	return [
		...(main ? [main] : []),
		...additional.filter(Boolean),
		...Object.entries(mods)
			.filter(([_, val]) => Boolean(val))
			.map(([key, _]) => key),
	].join(' ')
}
