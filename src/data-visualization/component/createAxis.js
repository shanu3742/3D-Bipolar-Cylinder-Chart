import { abbreviateNumber } from "../utils/abbreviate.number";
import { onTrunct } from "../utils/trunctString";

export const createAxis = (selection,graphData,xScale,containerHeight,color="steelblue") =>{
    const textElement =  selection.selectAll('g#axis-container')
                        .data([graphData])
                        .join('g')
                        .attr('id','axis-container')
                        .selectAll(`g.axis-legend`)
                        .data((d) => d)
                        .join('g')
                        .attr('class',`axis-legend`)
                        .attr('transform',(d) => `translate(${xScale(d.name)+xScale.bandwidth()/4},${containerHeight+15})`)
                        .selectAll('text.axis-text')
                        .data((d) => [d])
                        .join("text")
                        .attr('class','axis-text')
                        .attr("x",0)
                        .attr("y",0)
                        .attr("font-family", "Arial")
                        .attr("font-size",'12')
                        .attr("fill", color)
                        .attr('transform',`translate(${xScale.bandwidth()/4},0) rotate(70)`)
                 
                        textElement.selectAll('tspan.name')
                                    .data((d) =>[d])
                                    .join('tspan')
                                    .attr('class','name')
                                    .text((d) =>onTrunct(d.name.toUpperCase()))

                        textElement.selectAll('tspan.value')
                                    .data((d) =>[d])
                                    .join('tspan')
                                    .attr('class','value')
                                    .attr('font-weight','bold')
                                    .text((d) => ` :${abbreviateNumber(d.value)}`)
                        return textElement
                    }