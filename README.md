# Find Images   
Searching for images by resolution and size for Node.js

It's synchronous flexible module for relatively small tasks.

## Installation
```bash
npm install find-images
```


## API

```javascript
FindImages(input[, resolution, size_limit])
```

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
const FindImages = require('find-images');

let results = FindImages(input, '540x100%', 500);
// => [{ path: '/test/540x180.jpg', resolution: '540x180', size: '70.08' }]
```


## Output format
```
[
   {
      path: '/test/540x180.jpg',
      resolution: '540x180',
      size: '70.08' 
   },
]
```




## Changelog 
#### v2.0.0 (2019-02-16):
- updated for new version of `ReadDirRec`
- removed async method

#### v1.0.8 (2018-10-03):
- fixed bug, when size string was extracted with space

#### v1.0.5 (2018-05-14):
- fixed crash due to an `unsupported file type` error
