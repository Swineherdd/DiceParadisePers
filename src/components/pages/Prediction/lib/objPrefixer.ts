type FP_Object<T, R> = (params: T) => R

type TObjPrefixerReturn = any
type TObjPrefixerProps =
	| {
			prefix: string
			object: string
	  }
	| {
			prefix: string
			object: string[]
	  }
	| {
			prefix: string
			object: Record<string, string>
	  }

export const objPrefixer: FP_Object<TObjPrefixerProps, TObjPrefixerReturn> = ({
	object,
	prefix,
}) => {
	if (Array.isArray(object)) return object.map(el => `${prefix}${el}`)
	if (object instanceof Object) {
		const obj = object
		Object.keys(object).forEach(el => {
			obj[el] = `${prefix}${obj[el]}`
		})
		return obj
	}
	if (typeof object === 'string') return `${prefix}${object}`
	return null
}
