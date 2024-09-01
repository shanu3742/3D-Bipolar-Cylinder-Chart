class ProgressBar {

    constructor(){}

    

draw(svg){
    const startingPoint = 10;
    const diameter = 20;
    // svg.append('circle').attr('r',diameter/2).attr('cx',startingPoint+diameter/2).attr('cy',5)
    // .attr('style','transform: rotateY(0deg) rotateX(180deg)')
    // svg.append('line').attr('x1',startingPoint).attr('x2',startingPoint).attr('y1',5).attr('y2',100).attr('stroke','grey')
    const bottomStartingPoint = 50
    
    svg.append('rect').attr('x',0).attr('y',bottomStartingPoint).attr('width',40).attr('height',100).attr('style',"fill:#6B3D83;" )
    svg.append('rect').attr('x',0).attr('y',bottomStartingPoint+10).attr('width',40).attr('height',110).attr('style',"fill:#6B3D83;" ).attr('rx',13).attr('ry',13)
    // #955283
    svg.append('ellipse').attr('rx',20).attr('ry',10).attr('cx',20).attr('cy',bottomStartingPoint).attr('style',"fill:#f1addf;" )
    {/* <rect x="20" y="50" width="160" height="30" fill="blue" rx="20" ry="20" /> */}
    
    svg.append('rect').attr('x',0).attr('y',0).attr('width',40).attr('height',bottomStartingPoint+10).attr('style',"fill:rgba(149, 82, 131, 0.5);" ).attr('rx',12).attr('ry',12)
    // svg.append('rect').attr('x',0).attr('y',0).attr('width',40).attr('height',bottomStartingPoint-20).attr('style',"fill:rgba(0, 0, 255, 0.5);" )
    
    
    svg.append('ellipse').attr('rx',20).attr('ry',10).attr('cx',20).attr('cy',8).attr('style',"fill:#f1addf;" )
    {/* <ellipse rx="20" ry="15" cx="60" cy="80"
    style="fill:yellow;stroke:green;stroke-width:3" /> */}
}


}


export {ProgressBar}



