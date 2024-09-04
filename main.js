import { CylinderProgressBar } from "./src/data-visualization/component/CylinderProgressBar";




const main = () => {

  const graphArea = document.getElementById('graph-container');
  const width=  500;
  const height = 500;
  const dataToJoin = [1];


  const margin = {
    left:10,
    right:10,
    top:20,
    bottom:100
  }

  const containerWidth = width-margin.left-margin.right;
  const containerHeight = height-margin.top-margin.bottom;

  



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


//cretae ground 
const groundHeight = 40;
const startingPointAlongX=20


const path= `M${startingPointAlongX} ${containerHeight-groundHeight} L${containerWidth} ${containerHeight-groundHeight} L${containerWidth-startingPointAlongX} ${containerHeight} L${0} ${containerHeight} z`


const axisWidth= containerWidth-startingPointAlongX*2;
const xRange= [0+20,axisWidth-20];
const axisStartingPoint = containerHeight-groundHeight/2;



// Define the filter
const defs = graphContainer.append("defs");

const filter = defs.append("filter")
    .attr("id", "shadow")
    .attr("x", "-20%")
    .attr("y", "-20%")
    .attr("width", "140%")
    .attr("height", "140%");

filter.append("feDropShadow")
    .attr("dx", 5)
    .attr("dy", 5)
    .attr("stdDeviation", 4)
    .attr("flood-color", "rgba(0, 0, 0, 0.5)");





graphContainer.selectAll('path#ground')
              .data(dataToJoin)
              .join('path')
              .attr('id','ground')
              .attr('d',path)
              .attr('fill','#e0e0e0')
              .attr("filter", "url(#shadow)")










const data = [
  {
    name:'TCS',
    value:20,
    positive:25,
    negative:75
  },
  {
    name:'WIPRO',
    value:20,
    positive:70,
    negative:30
  },
  {
    name:'GOOGLE',
    value:40,
    positive:20,
    negative:80
  },
  {
  name:'Facebook',
  value:30,
  positive:55,
  negative:45
  },  
  {
    name:'Facebook1',
    value:30,
    positive:55,
    negative:45
    }, 
    {
      name:'Facebook2',
      value:30,
      positive:55,
      negative:45
      },  
      {
        name:'Facebook3',
        value:30,
        positive:55,
        negative:45
        },  
        {
          name:'Facebook4',
          value:30,
          positive:55,
          negative:45
          },   
    
           
               
]
const xDomain = data.map((el) => el.name)
const xScale = d3.scaleBand().domain([...xDomain]).range(xRange).padding(0.5)
// graphContainer.append("g")
//               .attr("transform", `translate(${startingPointAlongX},${axisStartingPoint})`)
//               .call(d3.axisBottom(xScale))

const yDomain = [0,d3.max(data,(d) => d.value )]
const yRange = [containerHeight-20,0];
const yscale = d3.scaleLinear().domain(yDomain).range(yRange)


// graphContainer.append("g")
//               .attr("transform", `translate(${startingPointAlongX+20},${0})`)
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
  .x(xScale(el.name)+20)
  .y(yscale(el.value))
  .height(containerHeight-20-yscale(el.value))
  .width(xScale.bandwidth())
  .positive(el.positive)
  .on('click',() => console.log('second  click '))
  .draw()

console.log(xScale.bandwidth())
  if(el.value>5 && xScale.bandwidth()>25){
    indicatorContainer.append('rect')
    .attr('x',xScale(el.name)+20-(xScale.bandwidth()*0.5*0.2))
    .attr('y',yscale(el.value))
    .attr('height',(((containerHeight-20-yscale(el.value))*el.positive)/100)-2)
    .attr('width','1')
    .attr('fill','#f1addf')
    .attr('class','line')
    // #f1addf

    indicatorContainer.append('rect')
    .attr('x',xScale(el.name)+20-(xScale.bandwidth()*0.5*0.2))
    .attr('y',(yscale(el.value)+(((containerHeight-20-yscale(el.value))*el.positive)/100))+2)
    .attr('height',(((containerHeight-20-yscale(el.value))*el.negative)/100)-2)
    .attr('width','1')
    .attr('fill','#6B3D83')
    // #6B3D83
  }else{
    //remove line
  }
 

if(xScale.bandwidth()>10){
  // xScale(el.name)-xScale.bandwidth()/4
  indicatorContainer.append("text")
                .attr("x",xScale.bandwidth()>25?xScale(el.name)+20 : xScale(el.name)+xScale.bandwidth())
                .attr("y",yscale(el.value)+((((containerHeight-20-yscale(el.value))*el.positive)/100)-2)/2)
                .attr("font-family", "Arial")
                .attr("font-size",'9')
                .attr("fill", "#f1addf")
                .attr('text-anchor',xScale.bandwidth()>25?'end':'end')
                .text(`${el.positive}%`)
                
                
  indicatorContainer.append("text")
                .attr("x",xScale.bandwidth()>25?xScale(el.name)+20 : xScale(el.name)+xScale.bandwidth())
                .attr("y",((yscale(el.value)+(((containerHeight-20-yscale(el.value))*el.positive)/100))+2)+((((containerHeight-20-yscale(el.value))*el.negative)/100)-2)/2)
                .attr("font-family", "Arial")
                .attr("font-size",'9')
                .attr("fill", "#6B3D83")
                .attr('text-anchor',xScale.bandwidth()>25?'end':'end')
                .text(`${el.negative}%`)
                
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
graphContainer.append('g')
.attr('transform',`translate(${xScale(el.name)+20+xScale.bandwidth()/4},${height-margin.bottom})`)
.append("text")
.attr("x",0)
.attr("y",0)
.attr("font-family", "Arial")
.attr("font-size",'12')
.attr("fill", "steelblue")
.attr('transform',`translate(${xScale.bandwidth()/4},0) rotate(70)`)
.text(`${onTrunct(el.name.toUpperCase())}:${el.value}`);
})


}

main()
