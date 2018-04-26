/*!
 * findImages, http://tpkn.me/
 */

const fs = require('fs');
const imageSize = require('image-size');
const readdirRec = require('readdirrec');

/**
 * Make sure we have nice and smooth list of images
 * 
 * @param  {String | Array} list
 * @return {Array}
 */
function formatInput(list){
   let images_rule = /\.(jpe?g|png|gif|svg|bmp|ico)$/i;

   if(Array.isArray(list)){
      // Filter out nonexistent images and non-images
      list = list.filter(item => images_rule.test(item) && fs.existsSync(item));
   }else if(fs.existsSync(list)){
      list = readdirRec(list, { filter: item => images_rule.test(item) });
   }else{
      list = [];
   }

   return list;
}

function getTargetRes(resolution){
   resolution = String(resolution).split('x');
   let target_width = resolution[0];
   let target_height = resolution[1];

   return { target_width, target_height };
}

function getIgnoredOptions(w, h, size){
   let skip_size = typeof size !== 'number' ? true : false;
   // Ignore width/height if it's responsive (=100%)
   let skip_width = w.indexOf('%') != -1 ? true : false;
   let skip_height = h.indexOf('%') != -1 ? true : false;

   return { skip_size, skip_width, skip_height };
}

function findImages(input, resolution, size_limit = 200) {
   let results = [];

   input = formatInput(input);
   let { target_width, target_height } = getTargetRes(resolution);
   let { skip_size, skip_width, skip_height } = getIgnoredOptions(target_width, target_height, size_limit)

   if(!/^\d+\%?$/i.test(target_width)){
      return Promise.reject('Wrong width => ' + target_width);
   }
   if(!/^\d+\%?$/i.test(target_height)){
      return Promise.reject('Wrong height => ' + target_height);
   }

   for(let i = 0, len = input.length; i < len; i++){
      let file = input[i];

      let res = imageSize(file);
      let img_width = res.width;
      let img_height = res.height;
      let img_size = (fs.statSync(file).size / 1024).toFixed(2);

      if(!skip_size && img_size > size_limit){
         continue;
      }
      if(!skip_width && target_width != img_width){
         continue;
      }
      if(!skip_height && target_height != img_height){
         continue;
      }

      results.push({ path: file, resolution: img_width + 'x' + img_height, size: img_size });
   }

   return Promise.resolve(results);
}


function findImagesSync(input, resolution, size_limit = 200) {
   let results = [];
   
   input = formatInput(input);
   let { target_width, target_height } = getTargetRes(resolution);
   let { skip_size, skip_width, skip_height } = getIgnoredOptions(target_width, target_height, size_limit)

   if(!/^\d+\%?$/i.test(target_width)){
      throw new Error('Wrong width => ' + target_width);
   }
   if(!/^\d+\%?$/i.test(target_height)){
      throw new Error('Wrong height => ' + target_height);
   }

   for(let i = 0, len = input.length; i < len; i++){
      let file = input[i];

      let res = imageSize(file);
      let img_width = res.width;
      let img_height = res.height;
      let img_size = (fs.statSync(file).size / 1024).toFixed(2);

      if(!skip_size && img_size > size_limit){
         continue;
      }
      if(!skip_width && target_width != img_width){
         continue;
      }
      if(!skip_height && target_height != img_height){
         continue;
      }

      results.push({ path: file, resolution: img_width + 'x' + img_height, size: img_size });
   }

   return results;
}

module.exports = findImages;
module.exports.sync = findImagesSync;
