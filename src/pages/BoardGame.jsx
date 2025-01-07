import { useEffect, useState } from 'react'
import { utilService } from '../services/utils';
import { useRef } from 'react';
import {Animated } from 'react-animated-css'


export function BoardGame() {
    const boardSize = 8;
    var selectedElCell = null
    const cellRef = useRef(null);
    const blackPlayer = '⚫️';
    const whitePlayer = '⚪️';
    const [moves,setMoves]=useState([]);
    const [board, setBoard] = useState([]);
    const [buttonText, setButtomText] = useState('Start Game')
    const [msg, setMsg] = useState('')
    const [player, setCurrPlayer] = useState(blackPlayer)
    const buildBoard = () => {

        let board = [];
        for (let i = 0; i < boardSize; i++) {
            board[i] = [];
            for (let j = 0; j < boardSize; j++) {
                if (i < 3 && ((i + j) % 2 == 1)) {
                    board[i][j] = whitePlayer
                }
                else if (i > 4 && ((i + j) % 2 == 1)) {

                    board[i][j] = blackPlayer
                }
                else board[i][j] = '';
            }
        }
        setBoard(board)

    }
    const onClickCell = (i, j) => {
        console.log('ij',i,j);
        console.log(board[i][j]);
        console.log('player',player);
        if (board[i][j] !== player && board[i][j]!='') {
            setMsg(`Its Not  ${board[i][j]} turn !`)
            setTimeout(() => {
                setMsg('')
            }, 2000)
            return;
        }
        var elCell = document.querySelector(`#cell-${i}-${j}`);
        if (elCell.classList.contains('mark')) {
            movePiece(selectedElCell, { i, j });
            clearMarkCell();
            return;
        }
        clearMarkCell();
        if (board[i][j] !== '') {
            var elCell = document.querySelector(`#cell-${i}-${j}`);
            elCell.classList.add('selected')
            selectedElCell = { i, j }
            var possibleCells = getPossibleCells(i, j);
            markCells(possibleCells)
        }
    }
  const undoMove=(from, to)=>{
    const copyMoves=[...moves];
    setMoves(copyMoves)
    const copyBoard = [...board]
    var piece = copyBoard[from.i][from.j];
    if(piece=='🏴')piece=blackPlayer;
    else if(piece=='🏳️')piece=whitePlayer;
    copyBoard[from.i][from.j] = '';
    copyBoard[to.i][to.j] = piece;
  }


    const movePiece = (from, to) => {
        const copyMoves=[...moves];
        copyMoves.push({from:{i:from.i,j:from.j,player:player},to:{i:to.i,j:to.j}});
        setMoves(copyMoves)
        const copyBoard = [...board]
        var piece = copyBoard[from.i][from.j];
        copyBoard[from.i][from.j] = '';
        copyBoard[to.i][to.j] = piece;

        if (player == blackPlayer) {
            if (to.i === 0 && to.j % 2 === 1) copyBoard[to.i][to.j] = ' 🏴'
            if (copyBoard[from.i - 1][from.j + 1] == whitePlayer && to.j == from.j + 1 || to.j == from.j + 2) copyBoard[from.i - 1][from.j + 1] = ''
            else if (copyBoard[from.i - 1][from.j - 1] == whitePlayer && to.j == from.j - 1 || to.j == from.j - 2) copyBoard[from.i - 1][from.j - 1] = ''
        }
        else if (player == whitePlayer) {
            if (to.i === boardSize - 1 && to.j % 2 === 0) copyBoard[to.i][to.j] = '🏳️'
            if (copyBoard[from.i + 1][from.j - 1] == blackPlayer && to.j == from.j - 1 || to.j == from.j - 2) copyBoard[from.i + 1][from.j - 1] = ''
            else if (copyBoard[from.i + 1][from.j + 1] == blackPlayer && to.j == from.j + 1 || to.j == from.j + 2) copyBoard[from.i + 1][from.j + 1] = ''
        }
        setBoard(copyBoard)
        if (player == blackPlayer) setCurrPlayer(whitePlayer)
        else setCurrPlayer(blackPlayer)

    }
    const undo=()=>{
        const copyMoves=[...moves]
        if(copyMoves.length===0){
            setMsg('There were no movements yet')
            setTimeout(()=>{
                setMsg('')
            },2500)
            return;
        }
        let lastMove=copyMoves[copyMoves.length-1];
        if(board[lastMove.from.i][lastMove.from.j]=='')undoMove(lastMove.to,lastMove.from)
        copyMoves.pop()
        setMoves(copyMoves)
        
        
    }
    const redo=()=>{
        var res=[];
        var diff = (player == blackPlayer) ? -1 : 1;
        for(let i=0;i<board.length;i++){
            for(let j=0;j<board[0].length;j++){
                if(board[i][j]===player){
                    if ((i + diff < 0 || i + diff > boardSize) || (j + 1 < 0 || j + 1 > boardSize)) continue;
                    if((board[i + diff][j + 1] === '') || board[i + diff][j - 1] === '') {
                        var from={i,j}
                        res=getPossibleCells(i,j)
                    } 

                }
            }
        }
        movePiece(from,res[utilService.getRandomInt(0,res.length)])
    }
    const clearMarkCell = () => {
        //change to useRef
        var elTds = document.querySelectorAll('.mark, .selected');
        elTds.forEach((elTd) => {
            elTd.classList.remove('mark', 'selected');

        })
    }
    const getPossibleCells = (cellI, cellJ) => {
        const copyBoard = [...board];
        var diff = (copyBoard[cellI][cellJ] == blackPlayer) ? -1 : 1;
        var res = [];
        if ((cellI + diff < 0 || cellI + diff > boardSize) || (cellJ + 1 < 0 || cellJ + 1 > boardSize)) return;
        if (copyBoard[cellI + diff][cellJ + 1] === '') {
            res.push({ i: cellI + diff, j: cellJ + 1 })
        }
        if (copyBoard[cellI + diff][cellJ - 1] === '') res.push({ i: cellI + diff, j: cellJ - 1 })
        if (player == blackPlayer) {
            if (copyBoard[cellI + diff][cellJ + 1] == whitePlayer) {
                if ((!(cellI - 2 < 0)) && (!(cellJ + 2 < 0 || cellJ + 2 >= boardSize))) {
                    if (copyBoard[cellI - 2][cellJ + 2] == '') res.push({ i: cellI - 2, j: cellJ + 2 })
                }
            }
            else if (copyBoard[cellI + diff][cellJ - 1] == whitePlayer) {
                if ((!(cellI - 2 < 0)) && (!(cellJ - 2 < 0))) {
                    if (copyBoard[cellI - 2][cellJ - 2] == '') res.push({ i: cellI - 2, j: cellJ - 2 })
                }
            }
        }
        else if (player == whitePlayer) {
            if (copyBoard[cellI + diff][cellJ + 1] == blackPlayer) {
                if ((!(cellI + 2 >= boardSize)) && (!(cellJ + 2 > BoardGame))) {
                    if (copyBoard[cellI + 2][cellJ + 2] == '') res.push({ i: cellI + 2, j: cellJ + 2 })
                }

            } else if (copyBoard[cellI + diff][cellJ - 1] == blackPlayer) {
                if ((!(cellI + 2 >= boardSize)) && (!(cellJ - 2 < 0))) {
                    if (copyBoard[cellI + 2][cellJ - 2] == '') res.push({ i: cellI + 2, j: cellJ - 2 })
                }
            }
        }
    return res
}
const markCells = (coords) => {
    console.log(coords);
    if (coords?.length > 0) {
        coords.forEach(cell => {
            var elCell = document.querySelector(`#cell-${cell.i}-${cell.j}`);
            elCell.classList.add('mark')

        })
    }

}
const restartGame = () => {
    setMsg('');
    selectedElCell = null
    setCurrPlayer(blackPlayer);
    setBoard([]);
    setMoves([]);
    buildBoard();
}

useEffect(() => {
    buildBoard()
}, [])

if (!board) return <h1>Loading board...</h1>
return (
    <div className="board flex column">
        <div className="flex align-center space-around">
        <h2>player Turn : {player}</h2>
        <button className="simple-btn" onClick={restartGame}>restart Game</button>
        <button className="undo-btn" onClick={undo}>Undo</button>
        <button className="undo-btn" onClick={redo}>Redo</button>
        </div>
        <span style={{ color: 'red' }}>{msg}</span>
   
        <table>
            <tbody>
                {board.map((cellI, i) => {
                    return <tr key={i}>
                        {board[0].map((cellJ, j) => {
                            var tdId = `cell-${i}-${j}`;
                            return <td onClick={(ev) => onClickCell(i, j)} id={tdId} className={((i + j) % 2 === 0) ? 'blue' : 'white'} key={utilService.makeId()}>{board[i][j]}</td>
                        })}
                    </tr>
                })}

            </tbody>
        </table>
    </div>
)
}