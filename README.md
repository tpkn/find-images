# Find Images   
Searching for images by resolution and size for Node.js



## Installation
```bash
npm install find-images
```


## API

### findImages(input[, resolution, size_limit])

### input
**Type**: _String_ | _Array_  
Could be a path to images folder or an array of images  


### resolution
**Type**: _String_  
**Default**: `100%x100%`   
Searching for images with this resolution. To ignore width or height, just set it's value as a percentage: `100%x250`. To skip this option leave it empty `''` or set it to `null`.


### size_limit
**Type**: _Number_  
Filter results by size (in KB)  



## Usage
```javascript
const findImages = require('find-images');

findImages(input, '100%x250', 500).then(results => {
   console.log(results);
}, err => {
   console.log(err);
})
```

Sync version also available
```javascript
let images_list = findImages.sync(input, '100%x250', 500);
```


## Output format
```
[{
   path: 'E:/find-images/test/970x250.jpg',
   resolution: '970x250',
   size: '70.08' 
}]
```




## Changelog 
#### v1.0.8 (2018-10-03):
- fixed bug, when size string was extracted with space

#### v1.0.5 (2018-05-14):
- fixed crash due to an `unsupported file type` error
