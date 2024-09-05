import { createGround } from "../component/createGround";
import { createLegend } from "../component/createLegend";
import { createPloatingArea } from "../component/createPloatingArea";
import { CylinderProgressBar } from "../component/CylinderProgressBar";
import { generateGroundShadow } from "../component/generateGroundShadow";
import { indicatorLine } from "../component/indicatorLine";
import { indicatorText } from "../component/indicatorText";
import { onTrunct } from "../utils/trunctString";
import { onScreenResize } from "../system/resize";
const DEFAULT_MARGIN ={
    left:10,
    right:10,
    top:100,
    bottom:100
  }
const LEGEND_CONFIG=[0,0]
const DATA_TO_JOIN = [1];
const DEFAULT_WIDTH=300;
const DEFAULT_HEIGHT=500;
const DEFAULT_COLOR= ['#f1addf','#6B3D83'];
const INDICATOR_GAP=2;

class BipolarGraph {
    #svg
    #fixedWidth=DEFAULT_WIDTH;
    #selection=null;
    #data=[];
    #margin={...DEFAULT_MARGIN};
    #width=DEFAULT_WIDTH;
    #height=DEFAULT_HEIGHT;
    #color=[...DEFAULT_COLOR];
    #BIPOLAR_KEY;
    #indicatorgap=INDICATOR_GAP;
    #legend_config= LEGEND_CONFIG;
    #sizeListner

    static #instance = null;


    constructor(){
        if(BipolarGraph.#instance){
            throw new Error("Use MyClass.getInstance() to create an instance.");
        }
        BipolarGraph.#instance = this; // Set the instance to prevent further instantiation
        console.log("Instance created.");
    }

    // Public static method to get the instance
    static getInstance() {
                if (BipolarGraph.#instance === null) {
                    BipolarGraph.#instance = new BipolarGraph();
                }
                return BipolarGraph.#instance;
    }

    #errorMessage(methodName,errorMessage){
            let message = `${methodName}: `+ errorMessage ?? 'Invalid Value Only Number or String Allow'
            throw new Error(message)
    }

    select(selection){
        this.#selection = selection;
        return this
    }

    data(graphData){
    this.#data= JSON.parse(JSON.stringify(graphData));
    return this;
    }

    margin(graphBoundries){
        this.#margin= graphBoundries;
        return this
    }

    height(graphHeight=DEFAULT_HEIGHT){
        if(typeof graphHeight  === 'number' || typeof graphHeight === 'string'){
            this.#height= +graphHeight;
            return this
        }else{
            this.#errorMessage(this.height.name)
        }

    }

    width(graphWidth=DEFAULT_WIDTH){
        if(typeof graphWidth  === 'number' || typeof graphWidth === 'string'){
            this.#width= +graphWidth;
            this.#fixedWidth=+graphWidth
            return this
        }else{
            this.#errorMessage(this.width.name)
        }
    
    }

    color(indicatorColor){
        if(indicatorColor?.length===2){
        this.#color= [...indicatorColor]
        }
    return this
    }

    indicatorKey(key){
        if(typeof key === 'string'){
            this.#BIPOLAR_KEY=key;
             return this
        }else{
            this.#errorMessage(this.width.name,'indicator key must be string')
        }
     
    }

    indicatorLinegap(gap){
        if(typeof gap  === 'number' || typeof gap === 'string'){
            this.#indicatorgap= +gap;
            return this
        }else{
            this.#errorMessage(this.height.name)
        }
    }

    legend(legendCordinate){
        if(legendCordinate.length===2){
            this.#legend_config= [...legendCordinate]
        }
        return this

    }
    #setWidth = (width) => {
        this.#width = width
        this.draw()
    }


  draw(){
    //cretae ground 
    const groundHeight = 40;
    const startingPointAlongX=20
    const legendAlongX=this.#legend_config[0];
    const legendAlongY=this.#legend_config[1];
    const containerWidth = this.#width-this.#margin.left-this.#margin.right;
    const containerHeight = this.#height-this.#margin.top-this.#margin.bottom;

    const groundPath= `M${startingPointAlongX} ${containerHeight-groundHeight} L${containerWidth} ${containerHeight-groundHeight} L${containerWidth-startingPointAlongX} ${containerHeight} L${0} ${containerHeight} z`
    let {svg,graphContainer} = createPloatingArea(this.#selection,this.#width,this.#height,this.#margin);
    this.#svg= svg;
    //create ground shadow
    graphContainer.call(generateGroundShadow);
    graphContainer.call(createGround,groundPath);
  
  
  const axisWidth= containerWidth;
  const xRange= [startingPointAlongX,axisWidth-startingPointAlongX];
  const xDomain = this.#data.map((el) => el.name)
  const xScale = d3.scaleBand().domain([...xDomain]).range(xRange).paddingInner(0.5).paddingOuter(1).align(0.5)
  const barGap = xScale.bandwidth()*xScale.paddingInner()
  const yDomain = [0,d3.max(this.#data,(d) => d.value )]
  const yRange = [containerHeight-20,0];
  const yscale = d3.scaleLinear().domain(yDomain).range(yRange);
  const bipolar_Indicator_list = Object.keys(this.#data[0][this.#BIPOLAR_KEY]);
 
  const progressBar = CylinderProgressBar.getInstance();
  
  this.#data.forEach((el,i) => {
          const indicatorContainer = graphContainer.selectAll(`g#indicator-${i}`)
                                      .data(DATA_TO_JOIN)
                                      .join('g')
                                      .attr('id',`indicator-${i}`)
  
          progressBar.key(`cylinder-${el.name}-i`)
                    .select(indicatorContainer)
                    .x(xScale(el.name))
                    .y(yscale(el.value))
                    .negativeColor(this.#color[0])
                    .positiveColor(this.#color[1])
                    .height(containerHeight-20-yscale(el.value))
                    .width(xScale.bandwidth())
                    .positive(el[this.#BIPOLAR_KEY][bipolar_Indicator_list[1]])
                    .on('click',() => console.log(`click-${i} `))
                    .draw()
            
  
          if(el.value>5 && xScale.bandwidth()>25){
           indicatorContainer.call(indicatorLine,
                                    'positive-indicator-line',
                                    xScale(el.name)-barGap/2,
                                    yscale(el.value),
                                    (((containerHeight-20-yscale(el.value))*el[this.#BIPOLAR_KEY][bipolar_Indicator_list[1]])/100)-this.#indicatorgap,
                                    this.#color[0]
                                )
        
            indicatorContainer.call(indicatorLine,
                                    'negative-indicator-line',
                                    xScale(el.name)-barGap/2,
                                    (yscale(el.value)+(((containerHeight-20-yscale(el.value))*el[this.#BIPOLAR_KEY][bipolar_Indicator_list[1]])/100))+this.#indicatorgap,
                                    (((containerHeight-20-yscale(el.value))*el[this.#BIPOLAR_KEY][bipolar_Indicator_list[0]])/100)-this.#indicatorgap,
                                    this.#color[1]
                                )
  
      
          }else{
            //remove line
            
                svg.selectAll('rect.positive-indicator-line').remove();
                svg.selectAll('rect.negative-indicator-line').remove();
            
          }
   
  
          if(xScale.bandwidth()>18){
            // xScale(el.name)-xScale.bandwidth()/4
            indicatorContainer.call(indicatorText,'positive-indicator-text',
                                    xScale.bandwidth()>25?xScale(el.name)-barGap/2 : xScale(el.name),
                                    yscale(el.value)+((((containerHeight-20-yscale(el.value))*el[this.#BIPOLAR_KEY][bipolar_Indicator_list[1]])/100)-this.#indicatorgap)/2,
                                    el[this.#BIPOLAR_KEY][bipolar_Indicator_list[1]],
                                    this.#color,
                                    0
                                )

            indicatorContainer.call(indicatorText,'negative-indicator-text',
                                    xScale.bandwidth()>25?xScale(el.name)-barGap/2: xScale(el.name),
                                    ((yscale(el.value)+(((containerHeight-20-yscale(el.value))*el[this.#BIPOLAR_KEY][bipolar_Indicator_list[1]])/100))+this.#indicatorgap)+((((containerHeight-20-yscale(el.value))*el[this.#BIPOLAR_KEY][bipolar_Indicator_list[0]])/100)-this.#indicatorgap)/2,
                                    el[this.#BIPOLAR_KEY][bipolar_Indicator_list[0]],
                                    this.#color,
                                    1
                                )
                          
          }else{
            //remove text
            svg.selectAll('text.positive-indicator-text').remove();
            svg.selectAll('text.negative-indicator-text').remove();
          }

        //axis legend
        graphContainer.selectAll(`g.axis-legend-${i}`)
        .data(DATA_TO_JOIN)
        .join('g')
        .attr('class',`axis-legend-${i}`)
        .attr('transform',`translate(${xScale(el.name)+xScale.bandwidth()/4},${containerHeight+15})`)
        .selectAll('text.axis-text')
        .data(DATA_TO_JOIN)
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

  svg.call(createLegend,legendAlongX,legendAlongY,progressBar,bipolar_Indicator_list,this.#BIPOLAR_KEY,this.#color)
   

  }

  onResize=() => {
   this.#sizeListner = onScreenResize(this.#setWidth, this.#fixedWidth)   
}
onRemove(){
    if(this.#svg){
        this.#svg.remove()
    }
    if(this.#sizeListner){
        window.removeEventListener(this.#sizeListner)
    }
}

}

export {BipolarGraph}