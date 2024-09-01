//to get the length of current cordinate WRT   starting cordinate  
const getLength = (index,value,xScale,yScale,data) => {
    //to get length we used d =  ✓(x1-x2)*(x1-x2) + (y1-y2)* (y1-y2)
      return  Math.sqrt(Math.pow((xScale(0)- xScale(index)),2)+ Math.pow((yScale(data[0].value) - yScale(value) ),2))
    }
export {getLength}