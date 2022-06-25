import { createSVGEL } from "./utils.js";

function Node(layer,x,y,radius){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.layer = layer;

    this.el = createSVGEL('circle');
    this.el.setAttribute('cx', this.x);
    this.el.setAttribute('cy', this.y);
    this.el.setAttribute('r', this.radius);
    this.el.setAttribute('stroke-width', 1);
    this.el.setAttribute('stroke', 'black');
    this.el.setAttribute('fill', 'none');

    this.value = 0;
    this.grad = 0;


};




export default Node;