


class Team extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            shots: 0,
            score: 0,
            imageStyle: {
                backgroundImage: `url(${this.props.logo})`
            },
            noScoreSound: new Audio('airplane+cessna.wav'),
            yesScoreSound: new Audio('claps3.wav'),
            shotPercentage: 0
        }
    }

    shotHandler = (event) => {
        let theScore = this.scoreUp(this.state.score);
        let theShots = this.shotUp(this.state.shots);

        if(theScore > this.state.score){
            this.state.yesScoreSound.play();
        }
        else{
            this.state.noScoreSound.play();
        }

        this.setState({
            shots: theShots,
            score: theScore,
            shotPercentage: ((theScore/theShots)*100).toFixed(0)
        })
    }

    shotUp(curScore) {
        return (curScore + 1);
    }

    scoreUp(curShot) {
        if((Math.random() > 0.2)){
            // console.log(this.state.yesScoreSound)
            // this.state.yesScoreSound.play();
            return (curShot + 1);
        }
        else{
            // console.log(this.state.noScoreSound)
            // this.state.noScoreSound.play();
            return (curShot);
        }
        // return ( ? (curShot + 1) : curShot);
    }

    render() {
        let statClass = (this.state.shots === 0 ? "noShotsYet" : "yesShotsYet");

        return (
            <div className="teamSquare" style={this.state.imageStyle}  >
                <div className="innerTeamSquare">
                    <span className="shots">shots: {this.state.shots}</span>
                    <span className="score">score: {this.state.score}</span>
                </div>


                <div className="innerTeamSquare">
                    <button className="shootButton" onClick={this.shotHandler}>shoot</button>
                    <span className={statClass}>acc: {this.state.shotPercentage}%</span>
                </div>
            </div>
        )
    }
}

class Game extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="gameSpace">
                <div className="gameHeading">Welcome to the {this.props.venue}</div>
                <div classname="break"></div>
                <div className="gameSpace">
                    <Team name="Wales" logo="whales.jpg" />
                    <Team name="Sailor" logo="sailors.jpg" />
                </div>
            </div>
        )
    }
}
function App(props) {
    return (

            <Game venue="Water Way"/>

    )
}


ReactDOM.render(
    <App />,
    document.getElementById("root")
)