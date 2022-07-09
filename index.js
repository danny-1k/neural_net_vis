import Net from './src/net.js';
import * as loss from './src/loss.js';
import * as activations from './src/activations.js';
import Optimizer from './src/optimizer.js';
import { delay } from './src/utils.js';
import { trainOneEpoch } from './src/trainutils.js';

const createAndRenderNet = ()=>{
    const div = document.createElement('div');
    document.body.appendChild(div);

    const net = new Net(div,1000,1000,[3,3,4,1]);
    net.addStyleProp('border','2px solid blue');
    net.render();

    return net;

};






async function Trainer (net, x,y,lossfn,optimizer, epochs){

    let loss_over_time = [];

    for(let epoch=0; epoch< epochs; epoch++){

        const loss_t = trainOneEpoch(net,x,y,optimizer,lossfn);

       await delay(100);
       loss_over_time.push(loss_t);
       console.log(loss_t);


    };

    console.log('done training ');

    console.log(net.forward([1,1,1]))


    return loss_over_time;

};




window.onload = ()=>{


    const net = createAndRenderNet();

    const optimizer = new Optimizer(net, 1e-2);

    const lossfn = new loss.MSE(net);

    const epochs = 1000;

    const x = [
        [1,0,0],
        [0,1,0],
        [0,0,0],
        [1,1,0],
        [0,1,1],
    ]
    const y = [
        [1],
        [0],
        [0],
        [1],
        [0],
    ];


    const losses = Trainer(net,x,y,lossfn,optimizer,epochs);
    // console.log(losses);
};


