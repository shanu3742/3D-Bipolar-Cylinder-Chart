const createLabel = (selection,x, y,index,imageSize=20,value='',lineLength=40) => {
    const  dataToJoin =[1]; 
    const labelYOffset=4;                
    selection.selectAll(`text#label-${index}`)
               .data(dataToJoin)
               .join('text')
               .attr('id',`label-${index}`)
               .attr('x', x)
               .attr('y',(y-lineLength - imageSize*2-labelYOffset))
               .text(value)
               .attr("stroke", 'grey')
               .attr('fill','transparent')
               .attr('text-anchor','middle')
      return selection;
    }

export {createLabel}