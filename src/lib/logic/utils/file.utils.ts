export async function blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(blob);
        fileReader.onload = () => {
            const base64: string = (fileReader.result as string).split(',')[1];
            resolve(base64);
        }
        fileReader.onerror = error => reject(error);
    });
}

export async function base64ToBlob(base64: string): Promise<Blob> {
    return await (await fetch(`data:;base64,${base64}`)).blob()
}