export const createLegend = (selector,legendAlongX,legendAlongY,cylinderInstence,bipolar_Indicator_list,BIPOLAR_KEY,color) => {
    const DATA_TO_JOIN = [1];
    const legendConatiner = selector.selectAll('g#legend-conatiner')
                                    .data(DATA_TO_JOIN)
                                    .join('g')
                                    .attr('id','legend-conatiner')
                                    .attr('transform',`translate(${legendAlongX},${legendAlongY})`)

cylinderInstence.key(`cylinder-label`)
                .select(legendConatiner)
                .x(10)
                .y(10)
                .height(30)
                .width(15)
                .positive(50)
                .on('click',() => console.log('second  click '))
                .draw()

const labelAlongY =25

legendConatiner.selectAll('text.cylinder-label-text')
.data([1])
.join('text')
.attr('class','cylinder-label-text')
.attr('x',28)
.attr('y',labelAlongY)
.attr('fill','black')
.attr("font-family", "Arial")
.attr("font-size",'12')
.attr('alignment-baseline','middle')
.text(`Total ${BIPOLAR_KEY}`)



legendConatiner.selectAll('rect.indicator-label')
.data(bipolar_Indicator_list)
.join('rect')
.attr('class','indicator-label')
.attr('x',10)
.attr('y',(d,i) => labelAlongY+(i+1)*20)
.attr('height',15)
.attr('width',15)
.attr('fill',(d,i) => {
    return color[i]
})

legendConatiner.selectAll('text.indicator-label-text')
.data(bipolar_Indicator_list)
.join('text')
.attr('class','indicator-label-text')
.attr('x',28)
.attr('y',(d,i) => labelAlongY+(i+1)*20)
.attr('fill','black')
.attr("font-family", "Arial")
.attr("font-size",'12')
.attr('alignment-baseline','middle')
.attr('dy',8)
.text((d) => d)

}