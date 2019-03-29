import React, {Component} from 'react';
import {observer} from 'mobx-react';
import '../styles/FlipClock1.less'

/**
 * 获取倒计时 时分秒
 * @param remainTime
 * @param type
 */
function getTimeCountDown(remainTime){
    if(remainTime){
        let h = Math.floor(remainTime / 3600);
        let m = Math.floor((remainTime - (h * 3600) ) / 60);
        let s = Math.floor(remainTime % 60);
        return {
            h,
            m,
            s,
        }
    }else{
        return null
    }
}

// function component
const AnimatedCard = ({ animation, digit }) => {
    return(
        <div className={`flipCard ${animation}`}>
            <span>{digit}</span>
        </div>
    );
};

// function component
const StaticCard = ({ position, digit }) => {
    return(
        <div className={position}>
            <span>{digit}</span>
        </div>
    );
};

// function component
const FlipUnitContainer1 = ({ digit, shuffle, unit }) => {

    // assign digit values
    let currentDigit = digit;
    let previousDigit = digit - 1;

    // to prevent a negative value
    if ( unit !== 'hours') {
        previousDigit = previousDigit === -1
            ? 59
            : previousDigit;
    } else {
        previousDigit = previousDigit === -1
            ? 23
            : previousDigit;
    }

    // add zero
    if ( currentDigit < 10 ) {
        currentDigit = `0${currentDigit}`;
    }
    if ( previousDigit < 10 ) {
        previousDigit = `0${previousDigit}`;
    }

    // shuffle digits
    const digit1 = shuffle
        ? previousDigit
        : currentDigit;
    const digit2 = !shuffle
        ? previousDigit
        : currentDigit;

    // shuffle animations
    const animation1 = shuffle
        ? 'fold'
        : 'unfold';
    const animation2 = !shuffle
        ? 'fold'
        : 'unfold';

    return(
        <div className={'flipUnitContainer'}>
            <StaticCard
                position={'upperCard'}
                digit={currentDigit}
            />
            <StaticCard
                position={'lowerCard'}
                digit={previousDigit}
            />
            <AnimatedCard
                digit={digit1}
                animation={animation1}
            />
            <AnimatedCard
                digit={digit2}
                animation={animation2}
            />
        </div>
    );
};

@observer
class FlipUnitContainer extends Component{
    constructor(props) {
        super(props);
        this.state = {
            shuffle: false,
            digit:this.props.digit,
        };
    }

    //监听路由变化
    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.digit!==prevState.digit){
            return{
                shuffle: !prevState.shuffle,
                digit:nextProps.digit,
            }
        }
        return null
    }

    render(){
        let { unit } = this.props;
        let { shuffle ,digit} = this.state;
        // assign digit values
        let currentDigit = digit;
        let previousDigit = digit+1;

        // to prevent a negative value
        if ( unit !== 'hours') {
            previousDigit = previousDigit === -1
                ? 59
                : previousDigit;
        } else {
            previousDigit = previousDigit === -1
                ? 23
                : previousDigit;
        }

        // add zero
        if ( currentDigit < 10 ) {
            currentDigit = `0${currentDigit}`;
        }
        if ( previousDigit < 10 ) {
            previousDigit = `0${previousDigit}`;
        }

        // shuffle digits
        const digit1 = shuffle
            ? previousDigit
            : currentDigit;
        const digit2 = !shuffle
            ? previousDigit
            : currentDigit;

        // shuffle animations
        const animation1 = shuffle
            ? 'fold'
            : 'unfold';
        const animation2 = !shuffle
            ? 'fold'
            : 'unfold';

        return(
            <div className={'flipUnitContainer'}>
                <StaticCard
                    position={'upperCard'}
                    digit={currentDigit}
                />
                <StaticCard
                    position={'lowerCard'}
                    digit={previousDigit}
                />
                <AnimatedCard
                    digit={digit1}
                    animation={animation1}
                />
                <AnimatedCard
                    digit={digit2}
                    animation={animation2}
                />
            </div>
        );
    }
}


// 倒计时插件
@observer
class FlipClock extends Component {
    render() {
        let {remainTime} = this.props;
        let openDistance = getTimeCountDown(remainTime);

        if(remainTime){
            return(
                <div className={'flipClock'}>
                    <FlipUnitContainer
                        unit={'hours'}
                        digit={openDistance.h}
                    />
                    <FlipUnitContainer
                        unit={'minutes'}
                        digit={openDistance.m}
                    />
                    <FlipUnitContainer
                        unit={'seconds'}
                        digit={openDistance.s}
                    />
                </div>
            );
        }else{
            return null
        }
    }
}

export default FlipClock