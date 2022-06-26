function ReLU(){
    this.x = null;
    this.out = null;
    this.grad = null;

};

ReLU.prototype = {
    forward: function(x){
        this.out = typeof x == "number"? 0: [];

        if(this.out == 0){

            this.out = this.forward_func(x);
        
        }else{
            for(let i=0; i<x.length;i++){

                this.out.push(this.forward_func(x[i]));

            };
        };

        return this.out;

    },

    backward: function(grad){

        // incoming grad is the same shape as the activation output

        if (typeof grad == "number"){

            this.grad = grad*this.backward_func(this.x);
            return this.grad;

        }else{

            this.grad = [];

            for (let i=0; i<grad.length; i++){

                this.grad[i] = grad[i]*this.backward_func(this.x[i]);
            
            };
        };

    },


    forward_func: function(x){
        return x*(x>0);

    },

    backward_func: function (x){

        return x>0;


    },

    zero_grad: function(){
        if (typeof this.grad == "number"){

            this.number = 0; 
        }else{
            this.grad.fill(0);
        };
    },
};

function Sigmoid(){

};

Sigmoid.prototype = {
    forward: function(x){
        this.out = typeof x == "number"? 0: [];

        if(this.out == 0){

            this.out = this.forward_func(x);
        
        }else{
            for(let i=0; i<x.length;i++){

                this.out.push(this.forward_func(x[i]));

            };
        };

        return this.out;

    },

    backward: function(grad){

        // incoming grad is the same shape as the activation output

        if (typeof grad == "number"){

            this.grad = grad*this.backward_func(this.x);
            return this.grad;

        }else{

            this.grad = [];

            for (let i=0; i<grad.length; i++){

                this.grad[i] = grad[i]*this.backward_func(this.x[i]);
            
            };
        };

    },


    forward_func: function(x){
        return 1/(1+Math.exp(-x));

    },

    backward_func: function (x){

        return x*(1-x);

    },

    zero_grad: function(){
        if (typeof this.grad == "number"){

            this.number = 0; 
        }else{
            this.grad.fill(0);
        };
    },
};


export {ReLU, Sigmoid};