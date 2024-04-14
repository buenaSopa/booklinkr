/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'covers.openlibrary.org',
				port: '',
			},
			{
				protocol: 'https',
				hostname: 'openlibrary.org',
				port: '',
			},
			{
				protocol: 'https',
				hostname: 'images-na.ssl-images-amazon.com',
				port: '',
			},
		],
	},
}

module.exports = nextConfig


