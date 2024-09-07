import { convertToRGBA } from "../utils/color.converter";
export const createGround = (selector,path,color='#e0e0e0') => {
const DATA_TO_JOIN = [1];
selector.selectAll('path#ground')
                .data(DATA_TO_JOIN)
                .join('path')
                .attr('id','ground')
                .attr('d',path)
                .attr('fill',convertToRGBA(color))
                .attr("filter", "url(#shadow)")
}