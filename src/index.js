import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// class Square extends React.Component {
//
//    constructor(props) {
//      super(props);
//      this.state = {
//        value: null
//      };
//    }
//
//   render() {
//     return (<button className="square" onClick={() => this.props.onClick()}>
//       {this.props.value}
//     </button>);
//   }
// }

function Square(props) {
  return (<button className="square" onClick={props.onClick}>
    {props.value}
  </button>);
}

class Board extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      winner: null
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();

    if (!(this.state.winner || squares[i])) {
      // no winner and square empty
      squares[i] = this.state.xIsNext
        ? 'X'
        : 'O';

      //check for winnner
      const winner = calculateWinner(squares);

      this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext,
        //if no winner, this property does not change
        winner: winner
      });
    }
  }

  renderSquare(i) {
    return (<Square value={this.state.squares[i]} onClick={() => this.handleClick(i)}/>);
  }

  render() {
    let status;
    if (this.state.winner) {

      status = 'Winner: ' + this.state.winner;
    } else {
      status = 'Next player: ' + (
        this.state.xIsNext
        ? 'X'
        : 'O')
    }

    // const status = 'Next player: ' + (
    //   this.state.xIsNext
    //   ? 'X'
    //   : 'O');

    return (<div>
      <div className="status">{status}</div>
      <div className="board-row">
        {this.renderSquare(0)}
        {this.renderSquare(1)}
        {this.renderSquare(2)}
      </div>
      <div className="board-row">
        {this.renderSquare(3)}
        {this.renderSquare(4)}
        {this.renderSquare(5)}
      </div>
      <div className="board-row">
        {this.renderSquare(6)}
        {this.renderSquare(7)}
        {this.renderSquare(8)}
      </div>
    </div>);
  }
}

class Game extends React.Component {
  render() {
    return (<div className="game">
      <div className="game-board">
        <Board/>
      </div>
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>);
  }
}

function calculateWinner(squares) {
  const lines = [
    [
      0, 1, 2
    ],
    [
      3, 4, 5
    ],
    [
      6, 7, 8
    ],
    [
      0, 3, 6
    ],
    [
      1, 4, 7
    ],
    [
      2, 5, 8
    ],
    [
      0, 4, 8
    ],
    [
      2, 4, 6
    ]
  ];
  let i = 0;
  let winner = null;

  while (i < lines.length && !winner) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      winner = squares[a];
    }
    i++;
  }
  return winner;

}

// ========================================

ReactDOM.render(<Game/>, document.getElementById('root'));