import { CSSProperties, FC, forwardRef } from 'react'
import { IChildren, IClassName } from '@/types'
import { cn } from '@/lib'

type General = {
	size: number
	style?: CSSProperties
} & IClassName &
	IChildren

type Props =
	| (General & {
			href?: never
	  } & { tag?: Omit<string & JSX.IntrinsicAttributes, 'a'> })
	| (General & {
			href?: string
	  } & { tag?: 'a' })

const Typography: FC<Props> = forwardRef(
	({ tag, href, className, size, children, style }, ref) => {
		const Tag = tag || 'p'
		return tag === 'a' ? (
			// @ts-ignore
			<Tag
				href={href}
				ref={ref}
				style={style}
				className={cn(`text-[${size}px]`, [className])}
			>
				{children}
			</Tag>
		) : (
			// @ts-ignore
			<Tag
				ref={ref}
				className={cn(`text-[${size}px]`, [className])}
				style={style}
			>
				{children}
			</Tag>
		)
	}
)

Typography.displayName = 'Typography'

export { Typography }
