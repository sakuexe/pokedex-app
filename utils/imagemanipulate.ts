import {
  ImageResult,
  manipulateAsync,
  SaveFormat,
} from "expo-image-manipulator";

type ImageSize = {
  width: number;
  height?: number;
};

export async function resizeImage(
  uri: string,
  size: ImageSize,
  quality: number,
): Promise<ImageResult> {
  /*
   * Resize image to a given size and return the result
   * ---
   * @param uri: string - uri of the image
   * @param size: ImageSize - an object of width and heigh for the image
   * @param quality: number - compression quality of the image. Range: 0 - 1
   * @return Promise<ImageResult> - resulting image, in png format
   */
  // If height is not defined, height will be the same as width
  if (!size.height) {
    size.height = size.width;
  }

  const manipResult = await manipulateAsync(uri, [{ resize: size }], {
    compress: quality,
    format: SaveFormat.PNG,
  });

  return manipResult;
}
