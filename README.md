## Scripts to Use 
- Install: ```npm install```
- Build: ```npm run build```
- Lint: ```npm run lint```
- Prettify: ```npm run format```
- Run unit tests: ```npm run test```
- Start server: ```npm run start```


## For Using Api 
http://localhost:3000


### Expected query arguments
- _filename_: Available filenames are:
  - encenadaport
  - fjord
  - icelandwaterfall
  - palmtunnel
  - santamonica
- _width_: numerical pixel value > 0
- _height_: numerical pixel value > 0


### Example
http://localhost:3000/api/imageprocess?filename=icelandwaterfall

Would display the icelandwaterfall image in it original size.
