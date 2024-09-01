const createDot = (selection,cx, cy,index) => {
    const  dataToJoin =[1]
    selection.selectAll(`circle#dot-${index}`)
                .data(dataToJoin)
                .join('circle')
                .attr('id',`dot-${index}`)
                .attr('cx',cx)
                .attr('cy',cy)
                .attr('r',4)
                .attr('fill','grey')
    return selection;
  }

  export {createDot}