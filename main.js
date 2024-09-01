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
    bottom:20
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

console.log(path)

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
    value:10,
    positive:40,
    negative:60
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
  }
]
const xDomain = data.map((el) => el.name)
const xScale = d3.scaleBand().domain([...xDomain]).range(xRange)
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
  progressBar.key(`bar-${el.name}-i`)
  .select(graphContainer)
  .x(xScale(el.name)+20+xScale.bandwidth()/4)
  .y(yscale(el.value))
  .height(containerHeight-20-yscale(el.value))
  .width(xScale.bandwidth()/2)
  .positive(el.positive)
  .on('click',() => console.log('second  click '))
  .draw()


  graphContainer.append('rect')
                .attr('x',xScale(el.name)+10+xScale.bandwidth()/4)
                .attr('y',yscale(el.value))
                .attr('height',(((containerHeight-20-yscale(el.value))*el.positive)/100)-2)
                .attr('width','1')
                .attr('fill','#f1addf')

  
  graphContainer.append('rect')
                .attr('x',xScale(el.name)+10+xScale.bandwidth()/4)
                .attr('y',(yscale(el.value)+(((containerHeight-20-yscale(el.value))*el.positive)/100))+2)
                .attr('height',(((containerHeight-20-yscale(el.value))*el.negative)/100)-2)
                .attr('width','1')
                .attr('fill','#6B3D83')



                graphContainer.append("text")
                .attr("x",(xScale(el.name)+0+xScale.bandwidth()/4)-30)
                .attr("y",yscale(el.value)+((((containerHeight-20-yscale(el.value))*el.positive)/100)-2)/2)
                .attr("font-family", "Arial")
                .attr("font-size",'16')
                .attr("fill", "#f1addf")
                .text(`${el.positive}%`);
                


                graphContainer.append("text")
                .attr("x",(xScale(el.name)+0+xScale.bandwidth()/4)-30)
                .attr("y",((yscale(el.value)+(((containerHeight-20-yscale(el.value))*el.positive)/100))+2)+((((containerHeight-20-yscale(el.value))*el.negative)/100)-2)/2)
                .attr("font-family", "Arial")
                .attr("font-size",'16')
                .attr("fill", "#f1addf")
                .text(`${el.negative}%`);

  // Create text and apply the shadow filter
graphContainer.append("text")
.attr("x",xScale(el.name)+20+xScale.bandwidth()/4)
.attr("y",height-margin.bottom)
.attr("font-family", "Arial")
.attr("font-size",'16')
.attr("fill", "steelblue")
.text(`${el.name}:${el.value}`);
})


}

main()
