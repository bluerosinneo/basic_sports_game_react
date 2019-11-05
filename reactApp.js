


class Team extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            shots: 0,
            score: 0,
            imageStyle: {
                backgroundImage: `url(${this.props.logo})`
            } 
        }
    }

    shotHandler = (event) => {
        let theScore = this.scoreUp(this.state.score);
        let theShots = this.shotUp(this.state.shots);

        this.setState({
            shots: theShots,
            score: theScore
        })
    }

    shotUp(curScore) {
        return (curScore + 1);
    }

    scoreUp(curShot) {
        return ((Math.random() > 0.2) ? (curShot + 1) : curShot);
    }

    render() {
        return (<div>

            <div className="teamSquare" style={this.state.imageStyle}  >
                <div className="innerTeamSquare">
                    <span className="shots">shots: {this.state.shots}</span>
                    <span className="score">score: {this.state.score}</span>
                </div>


                <div className="innerTeamSquare">
                    <button className="shootButton" onClick={this.shotHandler}>shoot</button>
                </div>
            </div>

        </div>)
    }
}

function App(props) {
    return (
        <div>
            <Team name="Wales" logo="whales.jpg" />
            <Team name="Sailor" logo="sailors.jpg" />
        </div>
    )
}


ReactDOM.render(
    <App />,
    document.getElementById("root")
)