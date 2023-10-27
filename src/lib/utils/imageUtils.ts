import { IMAGE_SIZES } from './CONSTANTS';

export async function convertToWebP(file: File): Promise<string[]> {
	const results = [];
	for (const size of IMAGE_SIZES) {
		const img = new Image();
		const fileReader = new FileReader();
		fileReader.onload = () => {
			const result = fileReader.result;
			if (typeof result === 'string') {
				img.src = result;
			}
		};
		fileReader.readAsDataURL(file);
		const result = await new Promise((resolve: (value: string) => void, reject) => {
			img.onload = () => {
				try {
					const canvas = document.createElement('canvas');
					canvas.width = img.width;
					canvas.height = img.height;
					const ctx = canvas.getContext('2d');
					const scaleFactor = Math.min(size / img.width, size / img.height);
					const newWidth = img.width * scaleFactor;
					const newHeight = img.height * scaleFactor;
					canvas.width = newWidth;
					canvas.height = newHeight;
					ctx?.drawImage(img, 0, 0, newWidth, newHeight);
					resolve(canvas.toDataURL('image/webp') as string);
				} catch (e) {
					reject(e);
				}
			};
		});
		results.push(result as string);
	}
	return results;
}

export function base64ToArrayBuffer(base64: string) {
	const binaryString = atob(base64.replace('data:image/webp;base64, ', ''));
	const bytes = new Uint8Array(binaryString.length);
	for (let i = 0; i < binaryString.length; i++) {
		bytes[i] = binaryString.charCodeAt(i);
	}
	return bytes.buffer;
}
export async function convertFileToBase64(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result?.toString() || '');
		reader.onerror = (error) => reject(error);
	});
}
export function convertFileToBuffer(file: File): Promise<ArrayBuffer> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsArrayBuffer(file);
		reader.onload = () => resolve(reader.result as ArrayBuffer);
		reader.onerror = (error) => reject(error);
	});
}
