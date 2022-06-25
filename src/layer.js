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

}
