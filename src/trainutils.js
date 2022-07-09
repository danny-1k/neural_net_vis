const trainOneEpoch = (net,x,y,optimizer,lossfn)=>{

    let avg_loss = 0;

    for (let i=0; i< x.length; i++){ // x must be a 2dim array of shape (num_samples, num_inputs)
        const pred = net.forward(x[i]);
        const loss = lossfn.forward(pred,y[i]);

        lossfn.backward();
        optimizer.step();

        avg_loss += loss;

    };

    avg_loss /= x.length;

    return avg_loss;
};


function Trainer(net, lossfn, optimizer, no_epochs, loss_graph){

    this.net = net;
    this.lossfn = lossfn;
    this.optimizer = optimizer;
    this.no_epochs = no_epochs;
    this.loss_graph = loss_graph;

    this.loss_over_time = [];

}

Trainer.prototype = {
    fit: async function(x,y,print_loss=false){

        for (let epoch=0; epochs< this.no_epochs; epoch++){
            const loss_t = trainOneEpoch(net,x,y,optimizer,lossfn);
            await delay(100); // sleep for 100 ms
            
            if (print_loss){
               console.log(loss_t);
            };

            this.loss_over_time.push(loss_t);

        };

    },

    plot_loss: function(){

        this.loss_graph.plot(this.loss_over_time);

    },


};


export {trainOneEpoch};