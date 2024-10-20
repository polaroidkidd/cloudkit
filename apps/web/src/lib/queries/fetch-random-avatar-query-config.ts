export const fetchRandomAvatarQueryConfig = {
	queryKey: ['Avatar'],
	queryFn: async () => {
		const resp = await fetch('https://picsum.photos/736');

		const image = (await resp.blob()) as unknown as File;
		return image;
		//
		// const converted = await convertFileToBase64(image);
		// return converted;
	},
	enabled: false
};
