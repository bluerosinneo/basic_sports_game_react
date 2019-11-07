

function Team(props){

    let statClass = (props.shots === 0 ? "noShow" : "yesShow");

    return(
        <div className="teamSquare" style={{backgroundImage: `url(${props.logo})`}}  >
                <div className="innerTeamSquare">
                    <span className="itIsAThing">shots: {props.shots}</span>
                    <span className="itIsAThing">score: {props.score}</span>
                </div>


                <div className="innerTeamSquare">
                    <button className="aButton" onClick={(event) => props.shotHandler(event, props.teamNumber)}>shoot</button>
                    <span className={statClass}>acc: {props.shotPercentage}%</span>
                </div>
            </div>
    )
}

class Game extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            shots: [0,0],
            score: [0,0],
            shotPercentage: [0,0],
            resets: 0,
            noScoreSound: new Audio('airplane+cessna.wav'),
            yesScoreSound: new Audio('claps3.wav'),
            
        }
    }

    shotHandler = (event, teamNumber) => {
        let theScore = this.state.score.slice();
        let theShots = this.state.shots.slice();
        let theShotPercentage = this.state.shotPercentage.slice();

        theScore[teamNumber] = this.scoreUp(theScore[teamNumber]);
        theShots[teamNumber] = this.shotUp(theShots[teamNumber]);

        if(theScore[teamNumber] > this.state.score[teamNumber]){
            this.state.yesScoreSound.play();
        }
        else{
            this.state.noScoreSound.play();
        }

        theShotPercentage[teamNumber] = ((theScore[teamNumber]/theShots[teamNumber])*100).toFixed(0)

        this.setState({
            shots: theShots,
            score: theScore,
            shotPercentage: theShotPercentage
        })
    }

    resetGame = (event) => {
        this.setState({
            shots: [0,0],
            score: [0,0],
            shotPercentage: [0,0],
            resets: this.state.resets + 1,
        })
    }

    shotUp(curScore) {
        return (curScore + 1);
    }

    scoreUp(curShot) {
        if((Math.random() > 0.2)){
            return (curShot + 1);
        }
        else{
            return (curShot);
        }
    }

    render(){

        let statClass = (
            this.state.resets === 0 && this.state.shots[0] === 0 && this.state.shots[1] === 0 ? "noShow" : "yesShow"
            );

        return(
            <div className="gameSpace">
                <div className="infoBar">Welcome to the {this.props.venue}</div>
                <div className="infoBar">
                    <span className="itIsAThing">Home: {this.state.score[0]}</span>
                    <span className="itIsAThing">Visiting: {this.state.score[1]}</span>
                </div>
                <div className="break"></div>
                <div className="gameSpace">
                    <Team
                        teamNumber={0}
                        name="Wales"
                        logo="whales.jpg"
                        shots={this.state.shots[0]}
                        score={this.state.score[0]}
                        shotPercentage={this.state.shotPercentage[0]}
                        shotHandler={this.shotHandler}
                    />
                    <Team
                        teamNumber={1}
                        name="Sailor"
                        logo="sailors.jpg"
                        shots={this.state.shots[1]}
                        score={this.state.score[1]}
                        shotPercentage={this.state.shotPercentage[1]}
                        shotHandler={this.shotHandler}
                    />
                                   <div className="break"></div>
                    <div className="infoBar">
                        <button className={"aButton "+ statClass} onClick={this.resetGame}>Reset</button>
                        <span className={statClass}>Resets: {this.state.resets}</span>
                    </div>
                </div>
 
            </div>
        )
    }
}


function App(props) {
    return (

            <Game venue="Water Way" />

    )
}


ReactDOM.render(
    <App />,
    document.getElementById("root")
)