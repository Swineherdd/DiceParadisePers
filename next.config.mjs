import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['i.imgur.com', 'png.pngtree.com', 'cryptologos.cc'],
	},
}

export default withNextIntl(nextConfig)
