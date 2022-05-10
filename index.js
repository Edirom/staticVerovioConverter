import walker from 'folder-walker'
import fs from 'fs'
import verovio from 'verovio'

//process.argv.forEach((val, index, array) => {
//  console.log(index + ': ' + val);
//});

const verovioOptions = {
   "scale": 10,
   "pageWidth": 1500,
   "adjustPageHeight": true,
   "adjustPageWidth": true,
   "footer": "none",
   "header":"none",
   "openControlEvents": true,
   "outputFormatRaw": true,
   "removeIds": true,
   "svgFormatRaw": true,
   "svgHtml5": true,
   "svgRemoveXlink": true,
   "svgViewBox": true
}

let stream = walker(['/data'])

let processFile = (path) => {
  fs.readFile(path, 'utf-8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }

    const tk = new verovio.toolkit()

    //console.log('received ' + typeof data + ' at ' + path)
    try {
      let svg = tk.renderData(data, verovioOptions);
      fs.writeFile(path + '.svg', svg, writingError => {
        if (err) {
          console.error(writingError)
          return
        }
        //file written successfully
      })
      console.log('\x1b[32m%s\x1b[0m', 'Successfully rendered ' + path)
      // console.log('%cSuccessfully rendered ' + path, 'color: green;')
      //console.log(typeof svg)
    } catch(renderError) {
      console.log('Unable to render ' + path + ':')
      //console.error(renderError)
    }
    //console.log(data)
  });

}



stream.on('data', function (data) {

  if (data.basename.endsWith('.mei') || data.basename.endsWith('.xml')) {
    let path = data.filepath

    processFile(path)

  }

})
