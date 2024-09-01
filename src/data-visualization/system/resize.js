const onScreenResize = (setProperties,width) => {
    window.addEventListener('resize',() => {
        const innerWidth= window.innerWidth<width? window.innerWidth-100:width;
        setProperties({width:innerWidth})
      })
}

export {onScreenResize}