const generateGradient = (selection) => {
    const  dataToJoin =[1];                 
    const gradient = selection.selectAll("linearGradient#score-trajectory-gradient")
                                .data(dataToJoin)
                                .join('linearGradient')
                                .attr("id", "score-trajectory-gradient")
                                .attr("x1", "0%")
                                .attr("y1", "0%")
                                .attr("x2", "0%")
                                .attr("y2", "100%");

    // Add color stops to the gradient
    const gradientColorList = ['red','orange','green'];
    const gradientColorOpacity = [1,0.5,1];
    const stepPercentage = [0,33.33,67]
    gradient.selectAll("stop.stop-step")
        .data(gradientColorList)
        .join('stop')
        .attr('class','stop-step')
        .attr("offset",(_,i) =>  `${stepPercentage[i]}%`)
        .attr("stop-color",(d,i) => d)
        .attr("stop-opacity", (_,i) => gradientColorOpacity[i]);

    return selection
}

export {generateGradient}