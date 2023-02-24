import express from 'express';
import Image from '../../utilities/imageProcessing';

interface ImageDetail {
  filename?: string;
  width?: string;
  height?: string;
}

const imageRouter: express.Router = express.Router();

const validateImageDetail = async (query: ImageDetail) => {
  const { filename, width, height } = query;
  if (!filename) {
    const availableImageNames = await Image.getImageList();
    const formattedImageNames = availableImageNames.join(', ');
    return `Please provide a valid filename. Available names are: ${formattedImageNames}`;
  }
  if (!(await Image.checkImageExistence(filename)))
    return `The image "${filename}" is not available`;

  if (width && isNaN(parseInt(width)))
    return `Please provide a valid numerical value for the width`;

  if (height && isNaN(parseInt(height)))
    return `Please provide a valid numerical value for the height`;
  return null;
};

const handleImageRequest = async (
  request: express.Request,
  response: express.Response
) => {
  const query = request.query;
  const validationMessage = await validateImageDetail(query);
  if (validationMessage) return response.send(validationMessage);

  let error: string | null = '';
  if (!(await Image.isThumbAvailable(query)))
    error = await Image.generateThumb(query);
  if (error) return response.send(error);

  const path = await Image.retrieveImagePath(query);
  if (path) return response.sendFile(path);
  response.send('An unknown error has occurred');
};

imageRouter.get('/', handleImageRequest);

export default imageRouter;
