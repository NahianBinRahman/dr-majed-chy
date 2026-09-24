const fs = require('fs');
const path = require('path');
const src = 'C:/Users/Nahian- PC/.gemini/antigravity-ide/brain/6557db74-f3f9-4c56-b347-0ec0b315c448/doctor_portrait_hd_1790226095228.jpg';
const dest = 'e:/dr-majed-chy/public/images/dr_majed_portrait_hd.jpg';
if (fs.existsSync(src)) {
  fs.copyFileSync(src, dest);
  console.log('Portrait copied successfully');
} else {
  console.error('Source does not exist: ' + src);
}
