import { resolve as resolvePath } from 'path';
import { promises as fs } from 'fs';
import sharp from 'sharp';

interface ResizingInputParams {
  source: string;
  target: string;
  width: number;
  height: number;
}

interface ImageDetails {
  filename?: string;
  width?: string;
  height?: string;
}

const resizeImage = async (inputs: ResizingInputParams) => {
  try {
    await sharp(inputs.source)
      .resize(inputs.width, inputs.height)
      .toFormat('jpeg')
      .toFile(inputs.target);
    return null;
  } catch {
    return 'Image could not be resized.';
  }
};

class Image {
  private static readonly fullImagesPath = resolvePath(
    __dirname,
    '../../resource/images/full'
  );
  private static readonly thumbImagesPath = resolvePath(
    __dirname,
    '../../resource/images/thumb'
  );

  static async retrieveImagePath({ filename, width, height }: ImageDetails) {
    if (!filename) {
      return null;
    }

    const requestedImagePath: string =
      width && height
        ? resolvePath(
            Image.thumbImagesPath,
            `${filename}-${width}x${height}.jpg`
          )
        : resolvePath(Image.fullImagesPath, `${filename}.jpg`);

    // Check file existence
    try {
      await fs.access(requestedImagePath);
      return requestedImagePath;
    } catch {
      return null;
    }
  }

  static async checkImageExistence(filename = '') {
    if (!filename) return false;
    return fs
      .readdir(Image.fullImagesPath)
      .then(filenames => filenames.includes(`${filename}.jpg`));
  }

  static async getImageList(): Promise<string[]> {
    try {
      const filenames = await fs.readdir(Image.fullImagesPath);
      return filenames.map(filename => filename.split('.')[0]);
    } catch {
      return [];
    }
  }

  static async isThumbAvailable({ filename, width, height }: ImageDetails) {
    if (!filename || !width || !height) return false;
    return fs
      .access(
        resolvePath(Image.thumbImagesPath, `${filename}-${width}x${height}.jpg`)
      )
      .then(
        () => true,
        () => false
      );
  }

  static async generateThumbPath() {
    return fs.mkdir(Image.thumbImagesPath, { recursive: true });
  }

  static async generateThumb({ filename, width, height }: ImageDetails) {
    if (!filename || !width || !height) return null;
    const fullImagePath = resolvePath(Image.fullImagesPath, `${filename}.jpg`);
    const thumbImagePath = resolvePath(
      Image.thumbImagesPath,
      `${filename}-${width}x${height}.jpg`
    );
    console.log(`Creating thumb ${thumbImagePath}`);
    return resizeImage({
      source: fullImagePath,
      target: thumbImagePath,
      width: parseInt(width),
      height: parseInt(height)
    });
  }
}

export default Image;
