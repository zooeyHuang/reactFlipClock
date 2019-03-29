import React, {Component} from 'react';
import {observer} from 'mobx-react';
import '../styles/FlipClock.less'

/**
 * 获取倒计时 时分秒
 * @param remainTime
 * @param type
 */
function getTimeCountDown(remainTime) {
    if (remainTime) {
        let h = Math.floor(remainTime / 3600);
        let m = Math.floor((remainTime - (h * 3600) ) / 60);
        let s = Math.floor(remainTime % 60);
        return {
            h: h < 10 ? '0' + h : '' + h,
            m: m < 10 ? '0' + m : '' + m,
            s: s < 10 ? '0' + s : '' + s,
        }
    } else {
        return null
    }
}

/**
 * 获取当前数字的前一个数字
 * @param activeNum  当前数字
 * @param type  个位还是十位  1 个位，0 十位
 */
function getBeforeNum(activeNum, type) {
    if (activeNum === 5 && type === 0) {
        return 0;
    } else if (activeNum === 9 && type === 1) {
        return 0;
    } else {
        return parseInt(activeNum) + 1;
    }
}

const timeNum1 = [0, 1, 2, 3, 4, 5];
const timeNum2 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

@observer
class FlipClockItem extends Component {
    render() {
        let {item} = this.props;
        return (
            <div className="flip-clock-item">
                <div className="up">
                    <div className="shadow"></div>
                    <div className="inn">{item}</div>
                </div>
                <div className="down">
                    <div className="shadow"></div>
                    <div className="inn">{item}</div>
                </div>
            </div>
        )
    }
}

// 倒计时插件
@observer
class FlipClock extends Component {
    render() {
        let {remainTime} = this.props;
        if (remainTime) {
            let openDistance = getTimeCountDown(remainTime);
            //计算时 分 秒
            let timeArr = [openDistance.h[0], openDistance.h[1], openDistance.m[0], openDistance.m[1], openDistance.s[0], openDistance.s[1]];
            return (
                <div className="flip-clock-wrapper">
                    {
                        timeArr.map((item, index)=> {
                            let ii = index % 2; //ii=0 十位；ii=1 个位
                            let numArr = ii === 0 ? timeNum1 : timeNum2;
                            return (
                                <div>
                                    <ul key={index} class="flip play">
                                        {
                                            numArr.map((item0)=> {
                                                let _class = '';
                                                if (parseInt(item0) === parseInt(item)) {
                                                    _class = 'flip-clock-active';
                                                }
                                                if (parseInt(item0) === getBeforeNum(item, ii)) {
                                                    _class = 'flip-clock-before';
                                                }
                                                return (
                                                    <li key={item0} className={_class}>
                                                        <FlipClockItem item={item0}/>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                    {
                                        (index===1||index===3)?
                                            <div class="flip-clock-divider">
                                                <span class="flip-clock-dot top"></span>
                                                <span class="flip-clock-dot bottom"></span>
                                            </div>:null
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            )
        } else {
            return null
        }
    }
}

export default FlipClock
