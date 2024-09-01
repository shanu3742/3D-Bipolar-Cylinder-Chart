const createImageBorder = (selection,x, y,index,radius=20,lineLength=40) => {
    const  dataToJoin =[1];                 
    selection.selectAll(`circle#border-${index}`)
               .data(dataToJoin)
               .join('circle')
               .attr('id',`border-${index}`)
               .attr('cx',x)
               .attr('cy',(y-lineLength - radius))
               .attr('r',radius)
               .attr("stroke", 'grey')
               .attr('fill','transparent')
      return selection;
    }
export {createImageBorder}