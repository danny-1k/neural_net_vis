function MSE(net){
    this.net = net;
    this.loss = null;

};

MSE.prototype = {

    forward: function(x,y){
        this.x = x;
        this.y = y;

        if (typeof x=="number"){

            this.loss = (x-y)**2;

        }else if(typeof x == "object"){

            this.loss = 0;

            for(let i=0; i< x.length; i++){

                this.loss += (x[i]-y[i])**2;

            }

            this.loss /= x.length;

        };

        return this.loss;

    },

    backward: function(){

        if (typeof this.loss == "number"){

            const grad = 2*(this.x-this.y);
            this.net.backward(grad);

        }else if(typeof this.x == "object"){

            const grad = [];

            for (let i=0; i<this.x.length; i++){

                grad[i] = 2*(this.x[i]-this.y[i]);

            };

            for (let i=0; i< grad.length; i++){
                grad[i] *= .5; // divifing by 1/2
            };



        };

    },
};


export {MSE};