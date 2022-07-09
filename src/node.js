import { createSVGEL } from "./utils.js";
import Synapse from "./synapse.js";

function Node(layer,x,y,radius){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.layer = layer;

    this.el = createSVGEL('circle');
    this.text = createSVGEL('text');
    
    this.el.setAttribute('cx', this.x);
    this.el.setAttribute('cy', this.y);
    this.el.setAttribute('r', this.radius);
    this.el.setAttribute('stroke-width', 1);
    this.el.setAttribute('stroke', 'black');
    this.el.setAttribute('fill', 'none');

    this.value = 0;
    this.grad = 0;

    this.text.setAttribute('x', this.x-(8*5*.5)); // horizontally center text
    this.text.setAttribute('y', this.y+4); // vertically center text
    this.text.innerHTML = this.value;



};


Node.prototype = {

    // setValue:function (value){

    //     this.value = value;

    // },

    

    render: function(){

        this.layer.root.appendChild(this.el);
        this.layer.root.appendChild(this.text);




    },

    connect: function(node,color='blue'){

        this.layer.synapses.push(new Synapse(this,node,color));


    },

    changeColor(color){
        this.el.setAttribute('fill',color);

    },

    changeOutlineColor(color){
        this.el.setAttribute('stroke',color);

    },

    addStyleProp: function(prop,value){
        while(prop.includes('-')){
            const hyphen_pos = prop.indexOf('-');
            prop[hyphen_pos+1] = prop[hyphen_pos+1].toLocaleUpperCase();
            prop = prop.replace('-','');
        };
        eval(`this.el.style.${prop} = "${value}"`); // this assumes `prop` is in camel casing
    },

    zeroValue: function(){
        this.setValue(0);
    },

    zeroGrad: function(){
        this.grad = 0;
    },

    setValue: function(value){
        this.value = value;
        this.text.innerHTML = value.toFixed(5);
    },


    equals: function(node){
        return (this.x == node.x) && (this.y == node.y) ;

    }

}




export default Node;