const  getPointAtLength = (path, length)  =>  {
    var totalLength = path.getTotalLength();
  
    if (length > totalLength) {
      throw new Error("Length exceeds path length");
    }
    return path.getPointAtLength(length);
  }

  
export {getPointAtLength}