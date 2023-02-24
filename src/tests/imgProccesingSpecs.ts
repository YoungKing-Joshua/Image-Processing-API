import fs from 'fs';
import { resolve as resolvePath } from 'path';
import Image from '../utilities/imageProcessing';

describe('Verify image processing using sharp', () => {
  it('Returns error for invalid width value', async () => {
    const error: null | string = await Image.generateThumb({
      filename: 'tot',
      width: '-150',
      height: '450'
    });
    expect(error).not.toBeNull();
  });

  it('Returns error for non-existing filename', async () => {
    const error: null | string = await Image.generateThumb({
      filename: 'tot',
      width: '150',
      height: '450'
    });
    expect(error).not.toBeNull();
  });

  it('Writes resized thumb file correctly for valid file and size input', async () => {
    await Image.generateThumb({ filename: 'fjord', width: '97', height: '97' });

    const newImageSizePath = resolvePath('thumbs', 'fjord-97x97.jpg');

    let imageError: null | string = '';

    try {
      await fs.promises.access(newImageSizePath);
      imageError = null;
    } catch {
      imageError = 'Image was not generated';
    }

    expect(imageError).toBeNull();
  });
});
