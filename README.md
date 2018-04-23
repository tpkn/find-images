# findImages   
Searching for images by resolution and size for Node.js


## API

### findImages(input, resolution[, size_limit])]

### input
Type: _String_ | _Array_  
Could be a path to images folder or an array of images  


### resolution
Type: _String_  
Searching for images with this resolution. To ignore width or height, just set it's value as a percentage: `100%x250`


### size_limit
Type: _Number_  
Default: `200`  
Filter images by size (in KB)  



## Usage
```javascript
const findImages = require('find-image');

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
