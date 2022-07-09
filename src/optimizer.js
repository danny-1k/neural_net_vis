function Optimizer(net,lr){

    this.net = net;
    this.lr = lr;
    


};


Optimizer.prototype = {

    step: function(){

        this.net.layers.forEach(layer=>layer.step(this.lr));

    },

    

}




export default Optimizer;