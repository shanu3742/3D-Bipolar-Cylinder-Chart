export const onTrunct  = (string) => {
    if(string.length<=6){
        return string
      }else{
        return string.substring(0,6)+'...'
      }
}