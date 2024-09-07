import { createGround } from "../component/createGround";
import { createLegend } from "../component/createLegend";
import { createPloatingArea } from "../component/createPloatingArea";
import { CylinderProgressBar } from "../component/CylinderProgressBar";
import { generateGroundShadow } from "../component/generateGroundShadow";
import { indicatorLine } from "../component/indicatorLine";
import { indicatorText } from "../component/indicatorText";
import { onScreenResize } from "../system/resize";
import { createAxis } from "../component/createAxis";
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
const GROUND_HEIGHT=40;
const GROUND_COLOR='#e0e0e0';
const AXIS_COLOR="steelblue"

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
    #groundHeight=GROUND_HEIGHT;
    #groundColor=GROUND_COLOR;
    #axisColor=AXIS_COLOR;
    #sizeListner
    #progressBar




    constructor(){
        console.log("Instance created.");
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
            this.#errorMessage(this.indicatorKey.name,'indicator key must be string')
        }
     
    }

    indicatorLinegap(gap){
        if(typeof gap  === 'number' || typeof gap === 'string'){
            this.#indicatorgap= +gap;
            return this
        }else{
            this.#errorMessage(this.indicatorLinegap.name)
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

    groundHeight(groundHeight=GROUND_HEIGHT){
        if(typeof groundHeight  === 'number' || typeof groundHeight === 'string'){
            this.#groundHeight= +groundHeight;
            return this
        }else{
            this.#errorMessage(this.groundHeight.name)
        }
    
    }

    groundColor(color=GROUND_COLOR){
        if(typeof color === 'string'){
            this.#groundColor= color;
             return this
        }else{
            this.#errorMessage(this.groundColor.name,'groundColor must be string')
        }
   
    }


    axisColor(color=AXIS_COLOR){
        if(typeof color === 'string'){
            this.#axisColor= color;
             return this
        }else{
            this.#errorMessage(this.axisColor.name,'axis color must be string')
        }
     
    }


  draw(){
    //cretae ground 
    const startingPointAlongX=this.#groundHeight/2;
    const legendAlongX=this.#legend_config[0];
    const legendAlongY=this.#legend_config[1];
    const containerWidth = this.#width-this.#margin.left-this.#margin.right;
    const containerHeight = this.#height-this.#margin.top-this.#margin.bottom;

    const groundPath= `M${startingPointAlongX} ${containerHeight-this.#groundHeight} L${containerWidth} ${containerHeight-this.#groundHeight} L${containerWidth-startingPointAlongX} ${containerHeight} L${0} ${containerHeight} z`
    let {svg,graphContainer} = createPloatingArea(this.#selection,this.#width,this.#height,this.#margin);
    this.#svg= svg;
    //create ground shadow
    graphContainer.call(generateGroundShadow);
    graphContainer.call(createGround,groundPath,this.#groundColor);
  
  
  const axisWidth= containerWidth;
  const xRange= [startingPointAlongX,axisWidth-startingPointAlongX];
  const xDomain = this.#data.map((el) => el.name)
  const xScale = d3.scaleBand().domain([...xDomain]).range(xRange).paddingInner(0.5).paddingOuter(1).align(0.5)
  const barGap = xScale.bandwidth()*xScale.paddingInner();
  const max=d3.max(this.#data,(d) => d.value )
  const yDomain = [0,max]
  const yRange = [containerHeight-startingPointAlongX,0];
  const yscale = d3.scaleLinear().domain(yDomain).range(yRange);
  const bipolar_Indicator_list = Object.keys(this.#data[0][this.#BIPOLAR_KEY]);
 
  this.#progressBar = new CylinderProgressBar();
  
  this.#data.forEach((el,i) => {
          const indicatorContainer = graphContainer.selectAll(`g#indicator-${i}`)
                                      .data(DATA_TO_JOIN)
                                      .join('g')
                                      .attr('id',`indicator-${i}`)
  
   this.#progressBar.key(`cylinder-${el.name}-${i}`)
                    .select(indicatorContainer)
                    .x(xScale(el.name))
                    .y(yscale(el.value))
                    .negativeColor(this.#color[1])
                    .positiveColor(this.#color[0])
                    .height(containerHeight-startingPointAlongX-yscale(el.value))
                    .width(xScale.bandwidth())
                    .positive(el[this.#BIPOLAR_KEY][bipolar_Indicator_list[1]])
                    .on('click',() => console.log(`click-${i} `))
                    .draw()
            

          if(el.value>max*0.05 && xScale.bandwidth()>25){
           indicatorContainer.call(indicatorLine,
                                    `positive-indicator-line-${i}`,
                                    xScale(el.name)-barGap/2,
                                    yscale(el.value),
                                    (((containerHeight-startingPointAlongX-yscale(el.value))*el[this.#BIPOLAR_KEY][bipolar_Indicator_list[1]])/100)-this.#indicatorgap,
                                    this.#color[1]
                                )
        
            indicatorContainer.call(indicatorLine,
                                    `negative-indicator-line-${i}`,
                                    xScale(el.name)-barGap/2,
                                    (yscale(el.value)+(((containerHeight-startingPointAlongX-yscale(el.value))*el[this.#BIPOLAR_KEY][bipolar_Indicator_list[1]])/100))+this.#indicatorgap,
                                    (((containerHeight-startingPointAlongX-yscale(el.value))*el[this.#BIPOLAR_KEY][bipolar_Indicator_list[0]])/100)-this.#indicatorgap,
                                    this.#color[0]
                                )
  
      
          }else{
            //remove line
            
            indicatorContainer.selectAll(`rect.positive-indicator-line-${i}`).remove();
            indicatorContainer.selectAll(`rect.negative-indicator-line-${i}`).remove();
            
          }
   
  
          if(el.value>max*0.05 && xScale.bandwidth()>18){
            // xScale(el.name)-xScale.bandwidth()/4
            indicatorContainer.call(indicatorText,`positive-indicator-text-${i}`,
                                    xScale.bandwidth()>25?xScale(el.name)-barGap/2 : xScale(el.name),
                                    yscale(el.value)+((((containerHeight-startingPointAlongX-yscale(el.value))*el[this.#BIPOLAR_KEY][bipolar_Indicator_list[1]])/100)-this.#indicatorgap)/2,
                                    el[this.#BIPOLAR_KEY][bipolar_Indicator_list[1]],
                                    this.#color,
                                    1
                                )

            indicatorContainer.call(indicatorText,`negative-indicator-text-${i}`,
                                    xScale.bandwidth()>25?xScale(el.name)-barGap/2: xScale(el.name),
                                    ((yscale(el.value)+(((containerHeight-startingPointAlongX-yscale(el.value))*el[this.#BIPOLAR_KEY][bipolar_Indicator_list[1]])/100))+this.#indicatorgap)+((((containerHeight-startingPointAlongX-yscale(el.value))*el[this.#BIPOLAR_KEY][bipolar_Indicator_list[0]])/100)-this.#indicatorgap)/2,
                                    el[this.#BIPOLAR_KEY][bipolar_Indicator_list[0]],
                                    this.#color,
                                    0
                                )
                          
          }else{
            //remove text
            indicatorContainer.selectAll(`text.positive-indicator-text-${i}`).remove();
            indicatorContainer.selectAll(`text.negative-indicator-text-${i}`).remove();
          }

       
  
  })

  //axis legend
  graphContainer.call(createAxis,this.#data,xScale,containerHeight,this.#axisColor)
  svg.call(createLegend,legendAlongX,legendAlongY,this.#progressBar,bipolar_Indicator_list,this.#BIPOLAR_KEY,this.#color)
   

  }

  onResize=() => {
   this.#sizeListner = onScreenResize(this.#setWidth, this.#fixedWidth)   
}
remove(){
    if (this.#svg) {
        this.#svg.remove();
        this.#svg = null;
    }
    if (this.#sizeListner) {
        window.removeEventListener('resize', this.#sizeListner);
        this.#sizeListner = null;
    }
    this.#fixedWidth=null;
    this.#margin=null;
    this.#width=null;
    this.#height=null;
    this.#color=null;
    this.#BIPOLAR_KEY=null;
    this.#indicatorgap=null;
    this.#legend_config=null;
    this.#progressBar.remove();
    this.#progressBar=null;
}

}

export {BipolarGraph}