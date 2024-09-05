import { BipolarGraph } from "./src/data-visualization/graph/Bipolar.graph";


const main = () => {
  const data = [
    {
      name:'TCS',
      value:200000,
      user:{
        male:75,
        female:25,
      }
    },
    {
      name:'WIPRO',
      value:45000,
      user:{
        male:70,
        female:30,
       
      }
      
    },
    {
      name:'GOOGLE',
      value:65000,
      user:{ 
        male:20,
        female:80,

      }
     
    },
    {
    name:'Facebook',
    value:130000,
    user:{
      male:55,
      female:45,
    }
  
    },  
   
       
  ]

let graphContainer = document.getElementById('graph-container');
let bipolarGraph = new  BipolarGraph();
    bipolarGraph.select(graphContainer)
                .data(data)
                .width(450)
                .height(500)
                .color(['#6B3D83','#f1addf'])
                .indicatorKey('user')
                .draw();

    bipolarGraph.onResize()


    // setTimeout(() => {
    //   bipolarGraph.remove()
    // },1000*10)



  //   const data1 = [
  //     {
  //       name:'TCS',
  //       value:200000,
  //       user:{
  //         male:30,
  //         female:70,
  //       }
  //     },
  //     {
  //       name:'WIPRO',
  //       value:45000,
  //       user:{
  //         male:70,
  //         female:30,
         
  //       }
        
  //     },
  //     {
  //       name:'GOOGLE',
  //       value:65000,
  //       user:{ 
  //         male:20,
  //         female:80,
  
  //       }
       
  //     },
  //     {
  //     name:'Facebook',
  //     value:130000,
  //     user:{
  //       male:55,
  //       female:45,
  //     }
    
  //     },  
     
         
  //   ]
  
  // let graphContainer1 = document.getElementById('graph-container-1');
  // let bipolarGraph1 = new BipolarGraph();
  //     bipolarGraph1.select(graphContainer1)
  //                 .data(data1)
  //                 .width(450)
  //                 .height(500)
  //                 .color(['#6B3D83','#f1addf'])
  //                 .indicatorKey('user')
  //                 .draw();
  
  //     bipolarGraph1.onResize()

}

main()
