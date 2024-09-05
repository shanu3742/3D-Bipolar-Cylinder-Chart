import { BipolarGraph } from "./src/data-visualization/graph/Bipolar.graph";


const main = () => {
  const data = [
    {
      name:'TCS',
      value:20,
      user:{
        female:25,
        male:75,
      }
    },
    {
      name:'WIPRO',
      value:20,
      user:{
        female:30,
        male:70,
       
      }
      
    },
    {
      name:'GOOGLE',
      value:40,
      user:{ 
        female:80,
        male:20,
      }
     
    },
    {
    name:'Facebook',
    value:30,
    user:{
     
      female:45,
      male:55,
    }
  
    },  
   
       
  ]

let graphContainer = document.getElementById('graph-container');
let bipolarGraph =  BipolarGraph.getInstance();
    bipolarGraph.select(graphContainer)
                .data(data)
                .width(450)
                .height(500)
                .indicatorKey('user')
                .draw();

    bipolarGraph.onResize()


    // setTimeout(() => {
    //   bipolarGraph.onRemove()
    // },1000*4)
}

main()
