import React, { useState } from 'react';
import CCImage from './CCimage';
import TempImage from './TempImage';

const Board = ({ order, size, turn, boardState, handleBoardUpdate }) => {
    const width = size / order;
    const [hoveredIndex, setHoveredIndex] = useState(null);

    // Create an array of cell indices (0, 1, 2, ..., order^2 - 1)
    const cellIndices = Array.from({ length: order * order }, (_, index) => index);

    return (
        <div style={{ display: 'inline-grid', gridTemplateColumns: `repeat(${order}, ${width}px)`, gap: '0' }}>
            {cellIndices.map((index) => (
                <div
                    id={index}
                    key={index}
                    style={{
                        height: `${width}px`,
                        backgroundColor: boardState[index] === 0 && hoveredIndex === index ? 'rgba(123, 144, 196, 0.9)' : '#7B90C4',
                        boxSizing: 'border-box',
                        border: '1px solid white',
                        transition: 'background-color 0.3s ease', // Add border to visualize the edges of each div
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => handleBoardUpdate(index)}
                >
                    {boardState[index] === 1 && <CCImage imagename="cross" width={width} />}
                    {boardState[index] === -1 && <CCImage imagename="circle" width={width} />}
                    {hoveredIndex === index && boardState[index] === 0 && (
                        <TempImage imagename={turn === 1 ? "cross" : "circle"} width={width} />
                    )}
                </div>
            ))}
        </div>
    );
};

export default Board;
