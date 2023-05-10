//run Schedulerdb.ts everyday at 23.59

import { inputDboardTop, inputPieChartDboard, InputLchartDept, inputLChartDboard, inputPieChartDept} from './controllers/VisualizationController';

export const schedulerd = () =>{
    inputDboardTop();
    inputLChartDboard();
    inputPieChartDboard();
    inputPieChartDept();
    InputLchartDept();
}

       