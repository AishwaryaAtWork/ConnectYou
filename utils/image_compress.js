import imageCompression from 'browser-image-compression';

export default async function compressImage(file) {
    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1080,
        useWebWorker: true,
    };

    try {
        const compressedFile = await imageCompression(file, options);
        return compressedFile;
    } catch (error) {
        // console.error('Error compressing the image: ', error);
        throw error;
    }
}
