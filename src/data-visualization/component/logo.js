
const createImage = (selection,x, y,index,imageSize=20,imageUrl,lineLength=40) => {
    const  dataToJoin =[1];         
    selection.selectAll(`image#logo-${index}`)
             .data(dataToJoin)
             .join('image')
             .attr('id',`logo-${index}`)
             .attr('x', x - imageSize/2)
             .attr('y', y-lineLength - imageSize - imageSize*0.5)
             .attr('width', imageSize)
             .attr('height', imageSize)
             .attr("href", imageUrl);
    return selection;
  }

  export {createImage}