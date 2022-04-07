# FWDMostafaImageProcessingAPI

### The scripts needed to test/start/build my application

| todo                       | run                           |
| :------------------------- | :---------------------------- |
| test                       | npm run test                  |
| start                      | npm run start                 |
| build                      | npm run build                 |
| linting, Formating and fix | npm run lintingAndFormating:f |

### the endpoints

| endpoint                                  | what's it doing ?                                                        |
| :---------------------------------------- | :----------------------------------------------------------------------- |
| /                                         | show hello massage                                                       |
| /images/imageName                         | get the full image from full folder                                      |
| /images/imageName?w=num&h=num             | get the the resize image from thumbnail folder if don't exist create one |
| any other paths                           | response html page with 404 not found                                    |
| if any parameter is not a number (w or h) | response with bad request 400                                            |

### other functionality

if you resize the image with send one parameter (w) without the other (h) you get the image with the full h rather than auto height
