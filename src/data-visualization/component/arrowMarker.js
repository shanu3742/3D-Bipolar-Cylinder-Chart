

    const createArrowMarker = (selection) => {
        const  dataToJoin =[1];                 
        const defs=    selection.selectAll(`defs#marker-defs`)
                                    .data(dataToJoin)
                                    .join('defs')
                                    .attr('id','defs')
                        
        const marker = defs.selectAll('marker#arrow')
                        .data(dataToJoin)
                        .join('marker')
                        .attr('id','arrow')
                        .attr('viewBox','0 0 10 10')
                        .attr('refX',5)
                        .attr('refY',5)
                        .attr('markerWidth',6)
                        .attr('markerHeight',6)
                        .attr('fill','#ff1308')
                        .attr('orient','auto-start-reverse')

                marker.selectAll('path#marker-path')
                        .data(dataToJoin)
                        .join('path')
                        .attr('id','marker-path')
                        .attr('d','M 0 0 L 10 5 L 0 10 z')
                  
          return selection;
        }
    export {createArrowMarker}