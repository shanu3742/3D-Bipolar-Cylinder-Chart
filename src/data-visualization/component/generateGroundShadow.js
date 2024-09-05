
export const generateGroundShadow = (selector)=>{
  const DATA_TO_JOIN = [1]
  // Define the filter
  const defs = selector.selectAll("defs#ground-shadow")
  .data(DATA_TO_JOIN)
  .join('defs')
  .attr('id','ground-shadow')
  
  const filter = defs.selectAll("filter#ground-shadow__filter")
  .data(DATA_TO_JOIN)
  .join('filter')
  .attr('id','ground-shadow__filter')
  .attr("id", "shadow")
  .attr("x", "-20%")
  .attr("y", "-20%")
  .attr("width", "140%")
  .attr("height", "140%");
  
  filter.selectAll("feDropShadow#ground-shadow__drop")
  .data(DATA_TO_JOIN)
  .join('feDropShadow')
  .attr('id','ground-shadow__drop')
  .attr("dx", 5)
  .attr("dy", 5)
  .attr("stdDeviation", 4)
  .attr("flood-color", "rgba(0, 0, 0, 0.5)");
}