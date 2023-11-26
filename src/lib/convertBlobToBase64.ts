export const convertBlobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = reject
    reader.onload = () => {
      // The result attribute contains the data as a base64 encoded string
      resolve(reader.result as string)
    }
    reader.readAsDataURL(blob) // Converts the blob to base64 and calls onload
  })
}
