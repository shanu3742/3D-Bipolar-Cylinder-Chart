const createVerticalLine = (selection,x, y,index,lineLength=40) => {
    const  dataToJoin =[1];
    selection.selectAll(`line#vertical-line-${index}`)
              .data(dataToJoin)
              .join('line')
              .attr('id',`vertical-line-${index}`)
              .attr('x1' ,x)
              .attr('x2' ,x)
              .attr('y1',y)
              .attr('y2',y-lineLength)
              .attr('stroke','black');
    return selection;
  }

  export {createVerticalLine}