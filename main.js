import { CylinderProgressBar } from "./src/data-visualization/component/CylinderProgressBar";




const main = () => {
  

const data = [
  {
    name:'TCS',
    value:20,
    user:{
      female:25,
      male:75,
    }
  },
  {
    name:'WIPRO',
    value:20,
    user:{
      female:30,
      male:70,
     
    }
    
  },
  {
    name:'GOOGLE',
    value:40,
    user:{
     
      female:80,
      male:20,
    }
   
  },
  {
  name:'Facebook',
  value:30,
  user:{
   
    female:45,
    male:55,
  }

  },  
 
     
]

  const graphArea = document.getElementById('graph-container');
  const width=  500;
  const height = 500;
  const dataToJoin = [1];
  const BIPOLAR_KEY='user'
  const INDICATOR_GAP=2;
  let color=['#f1addf','#6B3D83'];
  const DEFAULT_COLOR= ['#f1addf','#6B3D83']
  //cretae ground 
const groundHeight = 40;
const startingPointAlongX=20
  const margin = {
    left:10,
    right:10,
    top:100,
    bottom:100
  }
  const legendAlongX=0;
  const legendAlongY=0

  const containerWidth = width-margin.left-margin.right;
  const containerHeight = height-margin.top-margin.bottom;

  

const groundPath= `M${startingPointAlongX} ${containerHeight-groundHeight} L${containerWidth} ${containerHeight-groundHeight} L${containerWidth-startingPointAlongX} ${containerHeight} L${0} ${containerHeight} z`

  const svg = d3.select(graphArea).selectAll('svg#svg-container')
                .data(dataToJoin)
                .join('svg')
                .attr('id','svg-container')
                .attr('width',width)
                .attr('height',height)
                .attr('style','background:white')
 
  const graphContainer = svg.selectAll('g#graph')
                             .data(dataToJoin)
                             .join('g')
                             .attr('id','graph')
                             .attr('transform',`translate(${margin.left},${margin.top})`)

  // Define the filter
const defs = graphContainer.selectAll("defs#ground-shadow")
.data(dataToJoin)
.join('defs')
.attr('id','ground-shadow')

const filter = defs.selectAll("filter#ground-shadow__filter")
.data(dataToJoin)
.join('filter')
.attr('id','ground-shadow__filter')
.attr("id", "shadow")
.attr("x", "-20%")
.attr("y", "-20%")
.attr("width", "140%")
.attr("height", "140%");

filter.selectAll("feDropShadow#ground-shadow__drop")
.data(dataToJoin)
.join('feDropShadow')
.attr('id','ground-shadow__drop')
.attr("dx", 5)
.attr("dy", 5)
.attr("stdDeviation", 4)
.attr("flood-color", "rgba(0, 0, 0, 0.5)");

graphContainer.selectAll('path#ground')
              .data(dataToJoin)
              .join('path')
              .attr('id','ground')
              .attr('d',groundPath)
              .attr('fill','#e0e0e0')
              .attr("filter", "url(#shadow)")




const axisWidth= containerWidth;
const xRange= [startingPointAlongX,axisWidth-startingPointAlongX];
const xDomain = data.map((el) => el.name)
const xScale = d3.scaleBand().domain([...xDomain]).range(xRange).paddingInner(0.5).paddingOuter(1).align(0.5)



const barGap = xScale.bandwidth()*xScale.paddingInner()
const yDomain = [0,d3.max(data,(d) => d.value )]
const yRange = [containerHeight-20,0];
const yscale = d3.scaleLinear().domain(yDomain).range(yRange);
const bipolar_Indicator_list = Object.keys(data[0][BIPOLAR_KEY]);
if(!color && color?.length !==2){
  color=[...DEFAULT_COLOR]
}

// graphContainer.append("g")
//               .attr("transform", `translate(${startingPointAlongX},${0})`)
//               .call(d3.axisLeft(yscale))


console.log(xScale.bandwidth())
const progressBar = CylinderProgressBar.getInstance();

data.forEach((el,i) => {
        const indicatorContainer = graphContainer.selectAll(`g#indicator-${i}`)
                                    .data(dataToJoin)
                                    .join('g')
                                    .attr('id',`indicator-${i}`)

        progressBar.key(`cylinder-${el.name}-i`)
        .select(indicatorContainer)
        .x(xScale(el.name))
        .y(yscale(el.value))
        .negativeColor(color[0])
        .positiveColor(color[1])
        .height(containerHeight-20-yscale(el.value))
        .width(xScale.bandwidth())
        .positive(el[BIPOLAR_KEY][bipolar_Indicator_list[1]])
        .on('click',() => console.log('second  click '))
        .draw()


        if(el.value>5 && xScale.bandwidth()>25){
          indicatorContainer.selectAll('rect.positive-indicator-line')
          .data([1])
          .join('rect')
          .attr('class','positive-indicator-line')
          .attr('x',xScale(el.name)-barGap/2)
          .attr('y',yscale(el.value))
          .attr('class','positive-indicator-line')
          .attr('height',(((containerHeight-20-yscale(el.value))*el[BIPOLAR_KEY][bipolar_Indicator_list[1]])/100)-INDICATOR_GAP)
          .attr('width','1')
          .attr('fill',color[0])
          
          // #f1addf

          indicatorContainer.selectAll('rect.negative-indicator-line')
          .data([1])
          .join('rect')
          .attr('class','negative-indicator-line')
          .attr('x',xScale(el.name)-barGap/2)
          .attr('y',(yscale(el.value)+(((containerHeight-20-yscale(el.value))*el[BIPOLAR_KEY][bipolar_Indicator_list[1]])/100))+INDICATOR_GAP)
          .attr('height',(((containerHeight-20-yscale(el.value))*el[BIPOLAR_KEY][bipolar_Indicator_list[0]])/100)-INDICATOR_GAP)
          .attr('width','1')
          .attr('fill',color[1])
          // #6B3D83
        }else{
          //remove line
        }
 

        if(xScale.bandwidth()>18){
          // xScale(el.name)-xScale.bandwidth()/4
          indicatorContainer.selectAll('text.positive-indicator-text')
                            .data([1])
                            .join('text')
                            .attr("x",xScale.bandwidth()>25?xScale(el.name)-barGap/2 : xScale(el.name))
                            .attr("y",yscale(el.value)+((((containerHeight-20-yscale(el.value))*el[BIPOLAR_KEY][bipolar_Indicator_list[1]])/100)-INDICATOR_GAP)/2)
                            .attr("font-family", "Arial")
                            .attr("font-size",'9')
                            .attr("fill", color[0])
                            .attr('text-anchor',xScale.bandwidth()>25?'end':'end')
                            .text(`${el[BIPOLAR_KEY][bipolar_Indicator_list[1]]}%`)
                            .attr('class','positive-indicator-text')
                        
                        
          indicatorContainer.selectAll('text.negative-indicator-text')
                            .data([1])
                            .join('text')
                            .attr("x",xScale.bandwidth()>25?xScale(el.name)-barGap/2: xScale(el.name))
                            .attr("y",((yscale(el.value)+(((containerHeight-20-yscale(el.value))*el[BIPOLAR_KEY][bipolar_Indicator_list[1]])/100))+INDICATOR_GAP)+((((containerHeight-20-yscale(el.value))*el[BIPOLAR_KEY][bipolar_Indicator_list[0]])/100)-INDICATOR_GAP)/2)
                            .attr("font-family", "Arial")
                            .attr("font-size",'9')
                            .attr("fill", color[1])
                            .attr('text-anchor',xScale.bandwidth()>25?'end':'end')
                            .text(`${el[BIPOLAR_KEY][bipolar_Indicator_list[0]]}%`)
                            .attr('class','negative-indicator-text')
                        
        }else{
          //remove text
        }

        const onTrunct  = (string) => {
            if(string.length<=6){
                return string
              }else{
                return string.substring(0,6)+'...'
              }
        }
        // Create text and apply the shadow filter
      graphContainer.selectAll(`g.axis-legend-${i}`)
      .data(dataToJoin)
      .join('g')
      .attr('class',`axis-legend-${i}`)
      .attr('transform',`translate(${xScale(el.name)+xScale.bandwidth()/4},${containerHeight+15})`)
      .selectAll('text.axis-text')
      .data(dataToJoin)
      .join("text")
      .attr('class','axis-text')
      .attr("x",0)
      .attr("y",0)
      .attr("font-family", "Arial")
      .attr("font-size",'12')
      .attr("fill", "steelblue")
      .attr('transform',`translate(${xScale.bandwidth()/4},0) rotate(70)`)
      .text(`${onTrunct(el.name.toUpperCase())}:${el.value}`);

})


const legendConatiner = svg.selectAll('g#legend-conatiner')
                            .data(dataToJoin)
                            .join('g')
                            .attr('id','legend-conatiner')
                            .attr('transform',`translate(${legendAlongX},${legendAlongY})`)


progressBar.key(`cylinder-label`)
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

main()
