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

                const layer_activation = !params.is_output_layer?
                new activations.ReLU() :
                 new activations.Sigmoid();

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


};


export default Net;
