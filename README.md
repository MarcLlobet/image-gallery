![image-gallery](image-gallery-screenshot.gif)

# image-gallery
The definitive image gallery of all times.

## Installation
Run `npm install`.

## Quick start
Run `npm run start`.
Run `npm run build` for production purposes.

## Tech Stack
 - React
 - Redux
 - Sagas
 - Webpack
 - Jest
 - Styled-Component
 - Styled-System

### Libraries
 - Masonry
 - react-bottom-scroll-listener

## Giphy API
Image Gallery is using Giphy API to show images in an infinite scroll way.
This is achieved by using its own parameters:
 - q: Search query term or phrase (Required)
 - limit: The maximum number of objects to return (Default: “25”)
 - offset: Specifies the starting position of the results (Default: “0”)

### Infinite Scroll
Every time scroll reaches the bottom it triggers a call. Then uses the current state to fetch the desired images with `limit` and `offset`.