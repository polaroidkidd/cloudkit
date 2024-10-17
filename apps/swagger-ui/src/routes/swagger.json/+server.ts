export const GET = async () => {
	const spec = await import('@cloudkit/service-contract');
	return new Response(JSON.stringify(spec), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
