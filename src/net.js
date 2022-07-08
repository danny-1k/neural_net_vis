import { createSVG } from "./utils.js";
import Layer from "./layer.js";
import * as activations from "./activations.js";

function Net(root,width,height,structure){

    this.root = root;
    this.width = width;
    this.height = height;
    this.structure = structure;
    this.node_radius = 30;
    this.layers = [];
    this.max_number_of_nodes = 0;
    // Max number of nodes calculation

    for (let i=0; i<structure.length+1;i++){

        const no_in = this.structure[i];
        const no_out = this.structure[i+1] || this.structure[i]; // num_out is irrelevant for output layer

        if(this.max_number_of_nodes < (i==0?no_in:no_out)){
            this.max_number_of_nodes = (i==0?no_in:no_out);
        }


    };

    this.max_nodes_space = this.node_radius*2.5*this.max_number_of_nodes; //Maximum vertical space taken by the layer with the largest number of nodes

    
    // 
    this.paddingw = Math.floor(.1*this.width);
    this.paddingh = Math.floor(.1*this.height);
    this.node_radius = 2.5*(this.width-(2*this.paddingw));
    this.node_radius += this.height - (2*this.paddingh);
    this.node_radius /= (12.5*this.max_number_of_nodes); // 12.5*this.max...
    // console.log(this.node_radius,'node radius')
    this.layer_spacing= this.node_radius*2*2;

    this.el = createSVG();
    this.el.setAttribute('width',width);
    this.el.setAttribute('height',height);

    
    this.createLayers();

};



Net.prototype = {

    render: function (){

        this.root.appendChild(this.el);

        this.layers.forEach(layer => {
            layer.render();
        });

    },

    createLayers: function(){


        if (this.layers.length == 0){
            for(let i=0; i< this.structure.length;i++){

                const no_in = this.structure[i];
                const no_out = this.structure[i+1] || this.structure[i]; // num_out is irrelevant for output layer

                const params = {
                    idx: i,
                    is_input_layer:i==0,
                    is_output_layer:i==this.structure.length-1,
                };

                let layer_activation;

                if (params.is_output_layer){
                    layer_activation = new activations.Linear();
                }else if (params.idx == 2){
                    layer_activation = new activations.Sigmoid();
                }else{
                    layer_activation = new activations.ReLU();
                };

                this.layers.push(new Layer(this,no_in, no_out,layer_activation, params));
        
            };

        }

    },


    addStyleProp: function(prop,value){
        while(prop.includes('-')){
            const hyphen_pos = prop.indexOf('-');
            prop[hyphen_pos+1] = prop[hyphen_pos+1].toLocaleUpperCase();
            prop = prop.replace('-','');
        };
        eval(`this.el.style.${prop} = "${value}"`); // this assumes `prop` is in camel casing
    },


    forward(x){

        if (x.length == this.structure[0]){ // check for right input dimensions

        }else{
            throw new Error(`array passed into forward call must have a length of ${this.structure[0]}`)
        }

        for(let i=0; i<this.layers.length; i++){
            // clear the values of the nodes in the layers
            // and set the  values in the input layer.

            this.layers[i].zero_values();

            if (i== 0){ // input layer

                // in the input layer, set the value of the nodes to
                // the integers passed in as x;

                const input_layer = this.layers[i];

                for(let j=0; j< input_layer.nodes.length;j++){

                    input_layer.nodes[j].setValue(x[j]); // set input value

                };

            };


        };


        // forward pass for reallie

        let layer;
        // let x;

        for(let i=0;i<this.layers.length; i++){

            layer = this.layers[i];
            x = layer.forward();


        };

        // in the output layer (the last layer),
        // the predictions are not stored in 'this.out' but
        // in the values of the nodes in the layer.

        return x;

    },
    
    backward: function(grad){


        for (let i = this.layers.length-1; i>=0; i--){

            const layer = this.layers[i];
            grad = layer.backward(grad);
        };

    },


};


export default Net;
