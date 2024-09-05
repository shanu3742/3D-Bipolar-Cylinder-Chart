export const indicatorLine = (selector,className,xCord,yCord,height,color) => {
const DATA_TO_JOIN = [1]
return selector.selectAll(`rect.${className}`)
                .data(DATA_TO_JOIN)
                .join('rect')
                .attr('class',className)
                .attr('x',xCord)
                .attr('y',yCord)
                .attr('height',height)
                .attr('width','1')
                .attr('fill',color)
}
//y
// x-xScale(el.name)-barGap/2
//h -  (((containerHeight-20-yscale(el.value))*el[this.#BIPOLAR_KEY][bipolar_Indicator_list[1]])/100)-this.#indicatorgap
// positive-indicator-line