import { data } from "./Assets/SampleData";
import { BipolarGraph } from "./src/data-visualization/graph/Bipolar.graph";


const main = () => {
let graphContainer = document.getElementById('graph-container');
let bipolarGraph = new  BipolarGraph();
    bipolarGraph.select(graphContainer)
                .data(data)
                .width(450)
                .height(500)
                .color(['#6B3D83','#f1addf'])
                .groundHeight(40)
                .groundColor('#f1addf')
                .indicatorKey('employee')
                // .axisColor('red')
                .draw();

    bipolarGraph.onResize()


    // setTimeout(() => {
    //   bipolarGraph.remove()
    // },1000*10)

}

main()
