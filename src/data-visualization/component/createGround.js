export const createGround = (selector,path) => {
const DATA_TO_JOIN = [1]
selector.selectAll('path#ground')
                .data(DATA_TO_JOIN)
                .join('path')
                .attr('id','ground')
                .attr('d',path)
                .attr('fill','#e0e0e0')
                .attr("filter", "url(#shadow)")
}