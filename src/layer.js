import Node from "./node.js"; // lmaoooooo


function Layer(net ,no_in,no_out,activation,params){
    this.root = net.el;
    this.net = net;
    this.no_in = no_in;
    this.no_out = no_out;
    this.activation = activation;
    this.params = params;

    this.num_nodes = this.no_in;

    this.nodes = [];

    this.synapses = [];

    this.out = Array(this.no_out).fill(0); // output of the layer


    for (let i=0; i< this.num_nodes; i++){
        let nodex = this.net.paddingw + this.net.node_radius+(this.net.layer_spacing)*this.params.idx;
        let nodey = this.net.height-this.net.node_radius-(this.net.paddingh + (this.net.node_radius*2.5)*i);

        let space_occupied_by_layer = this.net.node_radius*2.5*this.num_nodes;
        const space_offset = (this.net.height - this.net.paddingh- (this.net.node_radius*2.5*this.net.max_number_of_nodes))/4;
        
        if (this.num_nodes < this.net.max_number_of_nodes){


            nodey -= (this.net.max_nodes_space-space_occupied_by_layer)/2;

        };

        nodey -= space_offset;

        const node = new Node(this,nodex,nodey,this.net.node_radius);

        this.nodes.push(node);

    };


    if (this.params.idx != this.net.layers.length-1 && this.params.idx>=1){

        for (let i=0; i< this.net.layers[this.params.idx-1].num_nodes; i++){

            for (let j=0; j< this.num_nodes; j++){

                this.net.layers[this.params.idx-1].nodes[i].connect(this.nodes[j]);
    
            };
        };

    };


};

Layer.prototype = {

    render: function(){

        for(let i=0; i< this.nodes.length; i++){
            this.nodes[i].render();
        };

        for(let i=0; i< this.synapses.length; i++){
            this.synapses[i].render();
        };

    },

    forward: function(){

        if (this.params.is_output_layer){

            // output layer is special 
            // since it doesn't have synapses(connecting to the next layer)
            // it can't really have a  `this.out` without manually assigning that.
            // the output layer in this case is just for the sake of visualization.

            this.out = this.activation.forward(this.nodes.map(node=>{return node.value}));

        }else{

            for(let i=0; i<this.nodes.length;i++){

                const node = this.nodes[i];
    
                for (let j=0; j< this.synapses.length; j++){
    
                    const synapse = this.synapses[j];
    
                    if(synapse.node1 == node){
                        synapse.node2.setValue(synapse.node2.value+(node.value * synapse.weight));
    
                    };
    
                };
    
            };


            this.out = this.net.layers[this.params.idx+1].nodes.map(node => {
                return node.value;
            });

            // pass output through activation function
            this.out = this.activation.forward(this.out);


            // replace the values of the nodes in the next layer with the 'activated' output

            for (let i=0; i< this.out.length; i++){

                this.net.layers[this.params.idx+1].nodes[i].setValue(this.out[i]);


            };


        };

        return this.out;



    },

    backward: function(grad){

        let grad_x = [];
        let grad_w = [];
        let grad_out_w = [];

        if (this.params.idx != 0){

            const layer = this.net.layers[this.params.idx-1];

            layer.synapses.forEach(synapse=>{

                for (let j=0; j< grad.length; j++){

                    if (synapse.node2 == this.nodes[j]){

                        grad_out_w.push(grad[j]);

                    };

                };

            });


            layer.nodes.forEach(node=>{

                let sum = 0;

                let node_weights=[];

                for (let i=0; i<layer.synapses.length;i++){
                    
                    if (layer.synapses[i].node1 == node){
                            node_weights.push(layer.synapses[i].weight);
                    };

                };

                for (let i=0; i< grad.length;i++){

                    sum += grad[i]*node_weights[i];

                };

                grad_x.push(sum);
            });


            grad_w =  layer.activation.backward(grad_out_w);

            layer.grad = grad_w;
            
            return grad_x;


        }


    },

    zero_values: function(){

        for (let i =0; i< this.nodes.length; i++){

            this.nodes[i].zeroValue();
        };

    },


    step: function(lr){

        if (this.params.idx != 0){

            const layer = this.net.layers[this.params.idx-1];


            for (let i=0; i< layer.synapses.length; i++){

                const synapse = layer.synapses[i];

                synapse.weight-= lr*layer.grad[i];

                synapse.updateSynapse();

            };


        };

    },
        


};

export default Layer;
