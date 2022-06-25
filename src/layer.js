import Node from "./node.js"; // lmaoooooo


function Layer(net ,no_in,no_out,activation,params){
    this.root = net.el;
    this.net = net;
    this.no_in = no_in;
    this.no_out = no_out;
    this.activation = activation;
    this.params = params;

    this.num_nodes = this.params.is_input_layer ? this.no_in: this.no_out;

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

        for (let i=0; i< this.net.layers[this.params.idx-1].no_in; i++){

            for (let j=0; j< this.no_out; j++){


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

        let out_nodes = [];

        for (let i=0; i<this.nodes.length;i++){
            const node = this.nodes[i];

            if(i == 0){
                for(let j=0; j<this.synapses.length; j++){

                    const synapse = this.synapses.length;

                    if(synapse.node1.equals(node)){
                        out_nodes.push(synapse.node2);  
                        this.out[out_nodes.length-1] = this.activation.forward(node.value * synapse.weight);

                    };

                };
            };

        }


    },

    backward: function(){

    },

    zero_values: function(){

    },

};

export default Layer;
