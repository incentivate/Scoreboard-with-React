// Componente de React
// Las etiquetas HTML dentro del js se llaman JSX, que es una extensión del lenguaje JS.
// Para que el navegador reconozca esto es necesario incluir babel en el HTML, babel lo que hace
// es transpirar el código babel a lenguaje JS.
const Header = (props) => {
    return (
        <header>
            <h1> { props.title } </h1>
            <span className="stats">Players: { props.totalPlayers }</span>
        </header>
    );
}

const Player = (props) => {
    return(
        <div className="player">
            <span className="player-name">
            <button className="remove-player" onClick={ () => props.removePlayer(props.id)}>X</button>
                {props.name}
            </span>
            {/* El componente Counter se renderiza dentro del comp Player y por ende las 
            props del padre (Player) se le pasan por defecto también al hijo (Counter)*/}
            <Counter />
        </div>
    );
}

// Los class components son los únicos que pueden manejar state
// El único método que es obligatorio sobreescribir cuando se extiende un componente es render()
class Counter extends React.Component {

    // El nombre state es ininmutable por convención
    state = {
        score: 0
    }
    
    incrementScore = () => {
        this.setState(prevState => {
            return {
            score: this.state.score += 1
            }
        });
    }

    decrementScore = () => {
        this.setState(prevState => {
            return {
            score: this.state.score -= 1
            }
        });
    }
    
    render() {
        return(
            <div className="counter">
                <button className="counter-action decrement"
                 onClick={this.decrementScore}> - </button>
                {/* Se usa el this.props cuando se está adentro de una clase para referirse
                a la instancia de esa clase */}
                <span className="counter-score">{ this.state.score }</span>
                <button className="counter-action increment"
                // Hay que binder el método incrementScore() (y todos los otros que no sean render)
                // al componente ya que al extender
                // éste de otra clase, el this pierde su bindeo original al componente
                onClick={this.incrementScore.bind(this)}> + </button>
            </div>
        );
    }
}

    class  App extends React.Component {

        state = {
            players: [
                {
                    name: "Nacho",
                    score: 50,
                    id: 1
                  },
                  {
                    name: "Roy",
                    score: 85,
                    id: 2
                  },
                  {
                    name: "Sebas",
                    score: 95,
                    id: 3
                  },
                  {
                    name: "Rodri",
                    score: 80,
                    id: 4
                  }
            ]
        }

        handleRemovePlayer = (id) => {
            this.setState( prevState => {
                return {
                    players: prevState.players.filter( player =>
                        player.id !== id )
                };
            });
        }

        render() {
            return(
                <div className="scorebord">
                {/* Las props se le pasan al componente en el lugar donde el mismo es llamado
                Si la prop no es un String entonces tiene que ir dentro de {} asi JSX la puede reconocer */}
                    <Header 
                            title="Scoreboard" 
                            totalPlayers={this.state.players.length}
                    />

                {/* Players List */}

                {this.state.players.map(player => 
                    <Player
                        id={player.id}
                        name={player.name} 
                        key={player.id.toString()}
                        removePlayer={this.handleRemovePlayer}
                    />
                )}
                </div>
            );
        }
    }

// Acepta dos argumentos
// 1) El componente a renderizar
// 2) A donde se quiere renderizar
ReactDOM.render(
    // JSX tag
    <App />,
    document.getElementById('root')
);