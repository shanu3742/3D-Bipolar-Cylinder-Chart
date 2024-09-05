class CylinderProgressBar {
    #dataToJoin =[1]
    #uniqueKey=Date.now();
    #selection=null;
    #xCordinate=null;
    #yCordinate=null;
    #cylinderHeight=null;
    #cylinderWidth=null;
    #posBarCylinder=50;
    #negBarCylinder=50;
    #positiveColor='#6B3D83';
    #negativeColor='#f1addf';
    static #instance = null;
    
    
    constructor(){
        if(CylinderProgressBar.#instance){
            throw new Error("Use MyClass.getInstance() to create an instance.");
        }
        CylinderProgressBar.#instance = this; // Set the instance to prevent further instantiation
        console.log("Instance created.");
    }
    // Public static method to get the instance
    static getInstance() {
        if (CylinderProgressBar.#instance === null) {
            CylinderProgressBar.#instance = new CylinderProgressBar();
        }
        return CylinderProgressBar.#instance;
      }
    
    #errorMessage(methodName,errorMessage){
        let message = `${methodName}: `+ errorMessage ?? 'Invalid Value Only Number or String Allow'
        throw new Error(message)
    }
    
    key(key){
       if(typeof key  === 'number' || typeof key === 'string'){
        this.#uniqueKey= `${key}`;
        return this
       }else{
        this.#errorMessage(this.key.name)
       }
    }
    
    
    
    select(parentSvgNode){
        this.#selection = parentSvgNode.selectAll(`g#${this.#uniqueKey}`)
                                      .data(this.#dataToJoin)
                                      .join('g')
                                      .attr('id',this.#uniqueKey);
        
     
        return this;
     }
    
     x(xCordinate=0){
        if(typeof xCordinate  === 'number' || typeof xCordinate === 'string'){
            this.#xCordinate= +xCordinate;
            return this
        }else{
            this.#errorMessage(this.x.name)
        }
     }
     y(yCordinate=0){
        if(typeof yCordinate  === 'number' || typeof yCordinate === 'string'){
            this.#yCordinate= +yCordinate;
            return this
        }else{
            this.#errorMessage(this.y.name)
        }
     
     }
    
     height(cylinderHeight=0){
        if(typeof cylinderHeight  === 'number' || typeof cylinderHeight === 'string'){
            this.#cylinderHeight= +cylinderHeight;
            return this
        }else{
            this.#errorMessage(this.height.name)
        }
    
     }
    
     positive(barPercentage=50){
        if(typeof barPercentage  === 'number' || typeof barPercentage === 'string'){
            this.#posBarCylinder= +barPercentage;
            this.#negBarCylinder=100-this.#posBarCylinder
            return this
        }else{
            this.#errorMessage(this.positive.name)
        }
     }
     width(cylinderWidth=0){
        if(typeof cylinderWidth  === 'number' || typeof cylinderWidth === 'string'){
            this.#cylinderWidth= +cylinderWidth;
            return this
        }else{
            this.#errorMessage(this.width.name)
        }
       
    }
    
    positiveColor(positiveColor='#6B3D83'){
        if(typeof positiveColor === 'string'){
            this.#positiveColor=positiveColor;
            return this
        }else{
            this.#errorMessage(this.positiveColor.name,'Invalid Value Only String Allow')
        }
        
    }
    
    negativeColor(negativeColor='#f1addf'){
        if(typeof negativeColor === 'string'){
            this.#negativeColor=negativeColor;
            return this
        }else{
            this.#errorMessage(this.negativeColor.name,'Invalid Value Only String Allow')
        }
        
    }
    
    draw(){
        // const y=10;
        // const x= 10;
        // const cylinderHeight= 90;
        // const posBar = 50;
        const negativeLength = (this.#cylinderHeight*this.#negBarCylinder)/100;
        const positiveLength= this.#cylinderHeight-negativeLength;
        const barRadius = (this.#cylinderWidth*50)/100;
        const positiveColor=this.#positiveColor;
        const negativeColor = this.#negativeColor
    
    
        // svg.append('circle').attr('r',diameter/2).attr('cx',startingPoint+diameter/2).attr('cy',5)
        // .attr('style','transform: rotateY(0deg) rotateX(180deg)')
        // svg.append('line').attr('x1',startingPoint).attr('x2',startingPoint).attr('y1',5).attr('y2',100).attr('stroke','grey')
        
        //this.selection.append('rect').attr('x',this.xCordinate).attr('y',this.yCordinate+positiveLength).attr('width',this.cylinderWidth).attr('height',negativeLength-negativeLength*0.10).attr('style',"fill:#6B3D83;" )
       
        this.#selection.selectAll('rect#positive-cylinder')
                      .data(this.#dataToJoin)
                      .join('rect')
                      .attr('id','positive-cylinder')
                      .attr('x',this.#xCordinate)
                      .attr('y',this.#yCordinate+positiveLength)
                      .attr('width',this.#cylinderWidth)
                      .attr('height',negativeLength-negativeLength*0.10)
                      .attr('style',`fill:${positiveColor};`)
    
    
        this.#selection.selectAll('rect#positive-cylinder-border')
                        .data(this.#dataToJoin)
                        .join('rect')
                        .attr('id','positive-cylinder-border')
                        .attr('x',this.#xCordinate)
                        .attr('y',this.#yCordinate+positiveLength)
                        .attr('width',this.#cylinderWidth)
                        .attr('height',negativeLength)
                        .attr('style',`fill:${positiveColor};`)
                        .attr('rx',this.#cylinderWidth*0.1)
                        .attr('ry',this.#cylinderWidth*0.1)
        // #955283
        this.#selection.selectAll('ellipse#positive-cylinder-plate')
                        .data(this.#dataToJoin)
                        .join('ellipse')
                        .attr('id','positive-cylinder-plate')
                        .attr('rx',barRadius)
                        .attr('ry',barRadius/2)
                        .attr('cx',this.#xCordinate+this.#cylinderWidth/2)
                        .attr('cy',this.#yCordinate+positiveLength)
                        .attr('style',`fill:${negativeColor};`)
    
        this.#selection.selectAll('rect#negative-cylinder')
                       .data(this.#dataToJoin)
                       .join('rect')
                       .attr('id','negative-cylinder')
                       .attr('x',this.#xCordinate)
                       .attr('y',this.#yCordinate-barRadius/2)
                       .attr('width',this.#cylinderWidth)
                       .attr('height',positiveLength+barRadius)
                       .attr('style', `fill:${this.#convertToRGBA(negativeColor)}`)
                       .attr('rx',this.#cylinderWidth*0.25+barRadius*0.5)
                       .attr('ry',this.#cylinderWidth*0.25)
        
        
                 
        // svg.append('rect').attr('x',0).attr('y',0).attr('width',40).attr('height',bottomStartingPoint-20).attr('style',"fill:rgba(0, 0, 255, 0.5);" )
        this.#selection.selectAll('ellipse#negative-cylinder-plate')
                        .data(this.#dataToJoin)
                        .join('ellipse')
                        .attr('id','negative-cylinder-plate')
                        .attr('rx',barRadius)
                        .attr('ry',barRadius/2)
                        .attr('cx',this.#xCordinate+this.#cylinderWidth/2)
                        .attr('cy',this.#yCordinate)
                        .attr('style',`fill:${negativeColor};` )
        {/* <ellipse rx="20" ry="15" cx="60" cy="80"
        style="fill:yellow;stroke:green;stroke-width:3" /> */}
    
    
        // svg.append('rect').attr('x',x+40).attr('y',y+8).attr('width',40).attr('height',cylinderHeight).attr('style',"fill:#6B3D83;" )
    }
    
    
    
    #hexToRgb(hex) {
        // Convert 3-digit hex to 6-digit
        if (hex.length === 4) {
            hex = hex.replace(/(.)/g, '$1$1');
        }
        const bigint = parseInt(hex.slice(1), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return [r, g, b];
    }
    
    #namedColorToRgb(color) {
        const ctx = document.createElement('canvas').getContext('2d');
        ctx.fillStyle = color;
        return ctx.fillStyle;
    }
    
    #parseColor(color) {
        if (color.startsWith('#')) {
            return this.#hexToRgb(color);
        } else if (color.startsWith('rgb')) {
            return color.match(/\d+/g).map(Number);
        } else {
            return this.#hexToRgb(this.#namedColorToRgb(color));
        }
    }
    
    #convertToRGBA(color) {
        const [r, g, b] = this.#parseColor(color);
        return `rgba(${r}, ${g}, ${b}, 0.5)`;
    }
    
    
    on(type,callback){
        this.#selection.on(type,callback);
        return this;
    }
    
    getColor(){
        return [this.#positiveColor,this.#negativeColor]
    }
    
    }
    
    export {CylinderProgressBar}
    
    
    