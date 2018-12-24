
import React, {Component} from 'react';
import _ from 'lodash';
import classNames from 'classnames';

import './css/App.css';
import './css/conponents.css';
import './css/tooltip.css';
import './css/footer.css';

import {game_name, social_links, support} from './game/core/app_config';
import {getDefaultState} from './game/core/default_state';
import {rules} from './game/core/rules';
import { Gin } from "./bdcgin/Gin";
import GinGameMenu from './bdcgin/GinGameMenu';
import GinFooter from './bdcgin/GinFooter';
import Helpers from "./game/Helpers";

import {constructions} from './gamedata/constructions';


class App extends Component {
    constructor(props) {
        super(props);

        this.gin = new Gin(game_name, getDefaultState);
        this.helpers = new Helpers(this.gin);

        this.gin.init();
        this.gin.registerRules(rules);

        this.state = this.gin.store;

        /*
        this.gin.addViewHandler(state => {
            console.log("set state " + state.tick);
            this.setState(state);
        });
        */
        this.gin.connectReact(this);

        this.state.initDone = false;

        this.gin.params["helpers"] = this.helpers;
    }

    componentDidMount() {
        this.gin.loadGame('FirstSave');
        this.gin.playGame();
    }

    render() {
        const state = this.state;

        let constructionBox = (item, key) =>
            <div key={item.key} className={item.key + " box smallBorders"}>
                <div>
                    <div className="box stretch">
                        <div> { item.name } :
                            <button className="btn btn-info fat">$ { item.price }</button>
                        </div>
                        <div className="flex-container-column">{ item.bandwidth } X 4 = 80</div>
                        <div className="flex-container-column">Load: 40/80</div>
                    </div>
                </div>
            </div>;

        return (
            <div className="App">
                <div id="container">
                    <div className="flex-container-column boldBorders">
                        <div className="box"></div>

                        {constructionBox(constructions.innerLuggageCart)}
                        {constructionBox(constructions.dutyFree)}
                        {constructionBox(constructions.innerEscalator)}
                        {constructionBox(constructions.innerFastRoad)}
                        {constructionBox(constructions.checkIn)}

                        <div className="box"></div>
                    </div>

                    <div className="wide boldBorders">
                        <div className="box">
                            {constructionBox(constructions.runway)}
                        </div>
                        <div className="splitOnTwoSides">
                            {constructionBox(constructions.innerBus)}
                            {constructionBox(constructions.outBus)}
                        </div>
                        <div className="splitOnTwoSides">
                            {constructionBox(constructions.innerPassport)}
                            {constructionBox(constructions.outPassport)}
                        </div>
                        <div className="splitOnTwoSides">
                            {constructionBox(constructions.innerSecurity)}
                            {constructionBox(constructions.outSecurity)}
                        </div>
                        <div className="box">
                            {constructionBox(constructions.hall)}
                        </div>
                        <div className="splitOnTwoSides">
                            {constructionBox(constructions.rail)}
                            {constructionBox(constructions.parking)}
                        </div>
                    </div>

                    <div className="flex-container-column boldBorders">
                        <div className="box"></div>

                        {constructionBox(constructions.outLuggageCart)}
                        {constructionBox(constructions.dutyFree)}
                        {constructionBox(constructions.outEscalator)}
                        {constructionBox(constructions.outFastRoad)}
                        {constructionBox(constructions.hotel)}

                        <div className="box"></div>
                    </div>
                </div>
                <GinFooter state={state} gin={this.gin} social_links={social_links} support={support}/>
            </div>
        );
    }
}

export default App;
