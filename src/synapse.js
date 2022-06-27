import {createSVGEL} from './utils.js';


function Synapse(node1,node2,color='blue'){

    this.color = color;

    this.node1 = node1;
    this.node2 = node2;

    this.layer = node1.layer;

    this.weight; 


    this.initializeWeight();


};

Synapse.prototype = {

    initializeWeight: function (mu=0,sigma=1){

        this.weight = Math.random()/2;

    },

    render: function (){

        const [x1,y1] = [this.node1.x,this.node1.y]; 
        const [x2,y2] = [this.node2.x,this.node2.y]; 

        const line = createSVGEL('line');

        this.el = line;

        line.setAttribute('stroke', this.color);
        line.setAttribute('stroke-width', 2);

        line.setAttribute('x1', x1+this.layer.net.node_radius);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2-this.layer.net.node_radius);
        line.setAttribute('y2', y2);

        this.addStyleProp('opacity',this.weight);

        
        this.layer.net.el.appendChild(line);



    },

    addStyleProp: function(prop,value){
        while(prop.includes('-')){
            const hyphen_pos = prop.indexOf('-');
            prop[hyphen_pos+1] = prop[hyphen_pos+1].toLocaleUpperCase();
            prop = prop.replace('-','');
        };
        eval(`this.el.style.${prop} = "${value}"`); // this assumes `prop` is in camel casing
    },

    updataSynapseIntensity: function (){

    },

    forward(){

        const y = this.node1.value*this.weight;
        this.node2.value+=y;
    },



};

export default Synapse;