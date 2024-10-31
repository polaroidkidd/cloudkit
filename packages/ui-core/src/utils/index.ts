/**
 * Converts a File object to a base64-encoded string.
 * @param file The File object to convert.
 * @returns A Promise that resolves with the base64-encoded string.
 */
export async function convertFileToBase64(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result?.toString() || '');
		reader.onerror = (error) => reject(error);
	});
}
