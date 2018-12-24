
import _ from 'lodash';


export default class Helpers {
    constructor(gin) {
        this.gin = gin;
    }

    brutalGet = () => {
        return this.gin.store;
    };

    setState = state => {
        this.gin.setState(state, 0);
    };

    drawCost = (cost) => {
        let text = '';
        _.each(cost, (value, resource) => {
            if (value > 0) {
                text += resource + ': ' + value + ' ';
            }
        });
        return text;
    };

}