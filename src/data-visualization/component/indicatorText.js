export const indicatorText = (selector,className,xCord,yCord,text,color,colorIndex) => {
const DATA_TO_JOIN = [1]
return  selector.selectAll(`text.${className}`)
                  .data(DATA_TO_JOIN)
                  .join('text')
                  .attr("x",xCord)
                  .attr("y",yCord)
                  .attr("font-family", "Arial")
                  .attr("font-size",'9')
                  .attr("fill", color[colorIndex])
                  .attr('text-anchor','end')
                  .text(`${text}%`)
                  .attr('class',`${className}`)            
}