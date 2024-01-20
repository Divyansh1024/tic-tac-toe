// const fs = require('fs');

const cross = 1; // cross win
const circle = -1; // circle win
const empty = 0; // draw

// var trans_count = 0, nega_count = 0;

// const transposition_table = new Map();

function positionToKey(board) {
    let count = 0;
    let key = 0;
    board.forEach((element) => {
        element.forEach((value) => {
            key += 3 ** count * (value + 1); // 0:circle ; 1 : empty; 2 : cross
            count++;
        })
    })
    return key;
}

function saveMap(myMap, file_name) {
    const mapArray = Array.from(myMap);
    const jsonString = JSON.stringify(mapArray);
    fs.writeFileSync(file_name, jsonString);
}

export function convertToMatrix(order, boardState) {
    if (order * order !== boardState.length) {
        console.error("Invalid boardState length for the given order.");
        return null;
    }

    const matrix = [];
    for (let i = 0; i < order; i++) {
        const row = boardState.slice(i * order, (i + 1) * order);
        matrix.push(row);
    }

    return matrix;
}

export function evaluate(order, boardState) {
    var cross_score = 0;
    var circle_score = 0;
    var stillGoing = false;

    for (let i = 0; i < order; i++) {
        for (let j = 0; j < order; j++) {
            const toFind = boardState[i][j];
            if (toFind === empty) {
                stillGoing = true;

                continue;
            }

            // top left to bottom right diagonal
            if (i < order - 2 && j < order - 2 && boardState[i + 1][j + 1] === toFind && boardState[i + 2][j + 2] === toFind)
                toFind === cross ? cross_score++ : circle_score++;

            // top right to bottom left diagonal
            if (i < order - 2 && j > 1 && boardState[i + 1][j - 1] === toFind && boardState[i + 2][j - 2] === toFind)
                toFind === cross ? cross_score++ : circle_score++;

            // row
            if (j < order - 2 && boardState[i][j + 1] === toFind && boardState[i][j + 2] === toFind)
                toFind === cross ? cross_score++ : circle_score++;

            // column
            if (i < order - 2 && boardState[i + 1][j] === toFind && boardState[i + 2][j] === toFind)
                toFind === cross ? cross_score++ : circle_score++;
        }
    }

    return { "cross_score": cross_score, "circle_score": circle_score, "stillGoing": stillGoing }
}

export function negamax(board, order, alpha, beta, turn) {
    // nega_count++;
    // const key = positionToKey(board);
    // const value = transposition_table.get(key);
    // if (value !== undefined) {
    //     trans_count++;
    //     return value;
    // }

    let gamestate = evaluate(order, board);
    if (!gamestate.stillGoing) {
        if (gamestate.cross_score > gamestate.circle_score)
            return cross;
        else if (gamestate.cross_score < gamestate.circle_score)
            return circle;
        else
            return empty;
    }

    let best_score = -Infinity; // Use -Infinity as the initial value

    for (let i = 0; i < order; i++) {
        for (let j = 0; j < order; j++) {
            if (board[i][j] === empty) {
                const new_board = board.map(row => [...row]);
                new_board[i][j] = turn;
                const score = -negamax(new_board, order, -beta, -alpha, -turn);
                best_score = Math.max(best_score, score);
                alpha = Math.max(alpha, score);
                // Logging for debugging
                // console.log(`[${i}, ${j}] Score: ${score} | Best Score: ${best_score} | Alpha: ${alpha} | Beta: ${beta}`);
                if (alpha >= beta)
                    break;
            }
        }
    }

    // transposition_table.set(key, best_score);

    return best_score;
}

export function bestMove(board, order, turn) {
    let hashMap = new Map();

    for (let i = 0; i < order; i++) {
        for (let j = 0; j < order; j++) {
            if (board[i][j] === empty) {
                const new_board = board.map(row => [...row]);
                new_board[i][j] = turn
                const score = -negamax(new_board, order, -1, 1, -turn)

                hashMap.set([i * order + j], score);
            }
        }
    }
    let maxKey = null;
    let maxValue = -1;

    // Iterate through the key-value pairs in the map
    hashMap.forEach((value, key) => {
        // Check if the current value is greater than the current maxValue
        if (value > maxValue) {
            maxValue = value;
            maxKey = key;
        }
    });
    console.log(hashMap)

    return maxKey;
}

// const position = [[0, 0, 0],
// [0, 0, 0],
// [0, 0, 0]];
// // const position = [[ 0, 0, 0],
// //                   [ 0, 0, 0],
// //                   [ 0, 0, 0]];

// const order = 3;
// const turn = cross;

// const move = bestMove(position, order, turn);
// console.log("move : ", move);

// console.log("negamax used : ", nega_count);
// console.log("transposition used : ", trans_count);
// // saveMap(transposition_table, "transposition_table.json");

// // const key = positionToKey(position);
// // console.log("key : ", key);

