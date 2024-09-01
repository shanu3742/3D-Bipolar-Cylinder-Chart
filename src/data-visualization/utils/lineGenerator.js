
const createLinePath = (xScale,yScale) => {
    const lineGenerator = d3.line()
                        .x((_,i) => xScale(i) )
                        .y((d) => yScale(d.value) )
                        .curve(d3.curveBasis)
    return lineGenerator
}

export {createLinePath}