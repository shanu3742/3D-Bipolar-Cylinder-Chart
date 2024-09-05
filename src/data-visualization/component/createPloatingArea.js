
const createPloatingArea = (selector,containerWidth,containerHeight,margin) => {
const dataToJoin=[1]
    // append the svg object to the div called 'my_dataviz'
const svg = d3.select(selector).selectAll('svg#svg-container')
    .data(dataToJoin)
    .join('svg')
    .attr('id','svg-container')
    .attr('width',containerWidth)
    .attr('height',containerHeight)
    .attr('style','background:white')

const graphContainer = svg.selectAll('g#graph')
                 .data(dataToJoin)
                 .join('g')
                 .attr('id','graph')
                 .attr('transform',`translate(${margin.left},${margin.top})`)
return {svg,graphContainer}
}

export {createPloatingArea}