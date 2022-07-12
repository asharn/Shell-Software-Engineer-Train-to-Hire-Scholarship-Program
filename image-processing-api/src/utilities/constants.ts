export const constants = {
	rootPathUrl: '/',
	checkPathUrl: '/check',
	apiPathUrl: '/api',
	imagePathUrl: '/image',
	port: 3000,
	tooManyRequest:
		'Too many request created from this IP, please try again after a minute',
	common: 'common',
	maxHitPerMinute: 5,
	windowMs: 60 * 1000,
} as const;
