type Params = {
	path: string
	endingParams: Record<string, number>[]
}

export const getRemoteImagesPath = ({ endingParams, path }: Params): string => {
	const end = endingParams
		.map(param => {
			const key = Object.keys(param)

			return `&${key[0]}=${param[key[0]]}`
		})
		.join('')

	return `/_next/image?url=${encodeURIComponent(path)}${end}`
}
