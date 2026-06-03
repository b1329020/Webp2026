import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

function Square(props) {
  return (
    <button className={props.isWinningSquare ? 'square winning' : 'square'} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    const isWinningSquare = this.props.winningLine && this.props.winningLine.includes(i);

    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        isWinningSquare={isWinningSquare}
      />
    );
  }

  render() {
    return (
      <div>
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
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState(false);
  }

  getInitialState(gameStarted) {
    return {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
      gameStarted: gameStarted,
    };
  }

  startGame() {
    this.setState(this.getInitialState(true));
  }

  handleClick(i) {
    if (!this.state.gameStarted) {
      return;
    }

    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares).winner || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    if (!this.state.gameStarted) {
      return;
    }

    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winnerInfo = calculateWinner(current.squares);
    const winner = winnerInfo.winner;

    const moves = history.map((step, move) => {
      const desc = move ? '回到 #' + move + ' 步' : '回到遊戲開始';
      return (
        <li key={move}>
          <button
            className={move === this.state.stepNumber ? 'move-button active' : 'move-button'}
            onClick={() => this.jumpTo(move)}
          >
            {desc}
          </button>
        </li>
      );
    });

    let status;
    const boardIsFull = current.squares.every(Boolean);

    if (!this.state.gameStarted) {
      status = '請按「遊戲開始」';
    } else if (winner) {
      status = '贏家是：' + winner;
    } else if (boardIsFull) {
      status = '平手';
    } else {
      status = '下一位玩家：' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="page">
        <h1>React OX 遊戲</h1>
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              winningLine={winnerInfo.line}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div className="status">{status}</div>
            <button className="start-button" onClick={() => this.startGame()}>
              遊戲開始
            </button>
            <ol>{moves}</ol>
          </div>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        line: lines[i],
      };
    }
  }

  return {
    winner: null,
    line: null,
  };
}

const root = createRoot(document.getElementById('root'));
root.render(<Game />);
