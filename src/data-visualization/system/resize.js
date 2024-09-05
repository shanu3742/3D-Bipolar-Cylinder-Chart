const onScreenResize = (setProperties,width) => {
   let sizelistner =  window.addEventListener('resize',() => {
        const innerWidth= window.innerWidth<width? window.innerWidth-100:width;
        setProperties(innerWidth)
      })
  return  sizelistner
}

export {onScreenResize}