const createSVG = ()=>{
    const svg = document.createElementNS('http://www.w3.org/2000/svg','svg'); 
    return svg;
}


const createSVGEL = (type)=>{
    const el = document.createElementNS('http://www.w3.org/2000/svg',type); 
    return el;
};


const createCircle = (cx,cy,r,fill) =>{

    const circle = createSVGEL('circle');

    circle.setAttribute('cx', cx);
    circle.setAttribute('cy', cy);
    circle.setAttribute('r', r);
    circle.setAttribute('stroke-width', 1);
    circle.setAttribute('stroke', 'black');
    circle.setAttribute('fill', fill?'':'none');

    return circle;

};


export {createSVG, createSVGEL, createCircle};