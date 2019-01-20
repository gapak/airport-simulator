
import React, {Component} from 'react';
import _ from 'lodash';
import classNames from 'classnames';

import './css/App.css';
import './css/conponents.css';
import './css/tooltip.css';
import './bdcgin/css/footer.css';

import {game_name, socialLinks, support} from './game/core/appConfig';
import {getDefaultState} from './game/core/defaultState';
import {rules} from './game/core/rules';
import { Gin } from "./bdcgin/Gin";
import GinGameMenu from './bdcgin/GinGameMenu';
import GinFooter from './bdcgin/GinFooter';
import Helpers from "./game/Helpers";

import {isEnough, chargeCost} from './bdcgin/Gin';
import {constructions} from './gamedata/constructions';
import {constructionBandwidthWithWorkers} from './gamedata/constructions';
import {workersActions} from './gamedata/workers';

class App extends Component {
    constructor(props) {
        super(props);

        this.gin = new Gin(game_name, getDefaultState);
        //this.gin.addViewHandler(state => { console.log(state, this, this.setState); this.setState(state); });
        this.gin.connectReact(this);
        this.gin.registerRules(rules);
        this.state = getDefaultState();
    }

    componentDidMount() {
        this.gin.loadGame('FirstSave');
        this.gin.playGame();
    }


    render() {
        const state = this.state;

        const GinButton = (props) => {
            let item = props.item;
            return (item.isLocked && item.isLocked(this.state))
                ? ''
                :
                <button
                    className={
                        classNames(props.className ? props.className : '',
                            (item.isDisabled && item.isDisabled(this.state)) ? 'disabled' :
                                (item.cost ? isEnough(this.state, item.cost) ? '' : 'disabled' : ''))
                    }
                    onClick={() => { this.gin.onClick(item); }}>
                    {item.name}
                </button>
        };

        const BuyGinButton = (props) => <GinButton item={{
            name: "$ " + props.item.cost.money,
            cost: props.item.cost,
            isDisabled: (state) => props.item.isDisabled(state),
            onClick: (state) => props.item.onClick(state)
        }} />;

        const HireGinButton = (props) => <GinButton item={props.item} />;

        const constructionBox = (item, key) =>
            <div key={item.key} className={"smallBorders background"}>
                <div className="box">
                    <div className="flex-container-row">
                        <div className="stretch air">
                            { item.name }:
                            <BuyGinButton item={item}/>
                        </div>
                    </div>

                    <div className="flex-container-row">
                        <div className="center">
                            <span className="air">
                                Queue:
                                {state.queue[item.key].length}
                            </span>
                        </div>

                        <div style={{fontSize: '18px'}} className="center">
                            Workers:
                            <GinButton className="btn arrow-button" item={{
                                name: '<',
                                isDisabled: state => state.workersInConstruction[item.key] < 1,
                                onClick: () => {
                                    state.workersInConstruction[item.key] -= 1;
                                    state.workers += 1;
                                    return state;
                                }
                            }} />

                            <div className="arrow-button">{state.workersInConstruction[item.key]}</div>
                            <GinButton className="btn arrow-button" item={{
                                name: '>',
                                isDisabled: state => state.workers < 1,
                                onClick: state => {
                                    state.workersInConstruction[item.key] += 1;
                                    state.workers -= 1;
                                    return state;
                                }
                            }} />
                        </div>
                    </div>

                    <div className="flex-container-column">
                        <div className="flex-element">
                            Load:
                            {state.processing[item.key].length}/
                            { constructionBandwidthWithWorkers(state, item.key) } (
                            Level: { state.constructions[item.key] })
                        </div>
                    </div>
                </div>
            </div>;


        return (
            <div className="App">
                <div id="container">
                    <div className="leftColumn">
                        <div className="">Money: ${state.money}</div>
                        <div className="box smallBorders background">
                            <span>
                                Day {Math.floor(state.tick / (60*24))},
                                {String("0" + (Math.floor(state.tick / 60)) % 24).slice(-2)}:
                                {String("0" + state.tick % 60).slice(-2)}
                            </span>

                            <div>
                                Game speed:
                                <GinGameMenu state={state} gin={this.gin} speeds={[1, 3, 24]} />
                            </div>
                        </div>
                        <div className="center smallBorders background">Workers: {state.workers}
                            <div className="center">
                                <div className="fat"><HireGinButton item={workersActions.hire}/></div>
                                <div className="fat"><HireGinButton item={workersActions.fire}/></div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-container-column">
                        <div className="wideBox">
                            {constructionBox(constructions.runway)}
                        </div>

                        <div className="constructionsRow">
                            {constructionBox(constructions.bus)}
                            {constructionBox(constructions.escalator)}
                            {constructionBox(constructions.fastRoad)}
                        </div>

                        <div className="constructionsRow">
                            {constructionBox(constructions.dutyFree)}
                            {constructionBox(constructions.passport)}
                            {constructionBox(constructions.security)}
                            {constructionBox(constructions.checkIn)}
                        </div>

                        <div className="wideBox">
                            {constructionBox(constructions.hall)}
                        </div>

                        <div className="constructionsRow">
                            {constructionBox(constructions.rail)}
                            {constructionBox(constructions.parking)}
                            {constructionBox(constructions.hotel)}
                        </div>
                    </div>
                </div>

                <GinFooter state={state} gin={this.gin} socialLinks={socialLinks} support={support}/>

            </div>
        );
    }
}

export default App;
