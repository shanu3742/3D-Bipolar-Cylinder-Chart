
const createPloatingArea = (selector,containerWidth,containerHeight,margin) => {
const dataToJoin=[1]
    // append the svg object to the div called 'my_dataviz'
const svg =  d3.select(selector).selectAll("svg#score-trajectory")
.data(dataToJoin)
.join('svg')
.attr("width",containerWidth)
.attr("height",containerHeight)
.attr('id','score-trajectory')


const graphPloatingArea =    svg.selectAll('g#ploating-area')
                .data(dataToJoin)
                .join('g')
                .attr('id','ploating-area')
                .attr('transform',`translate(${margin.left},${margin.top})`)
return {svg,graphPloatingArea}
}

export {createPloatingArea}