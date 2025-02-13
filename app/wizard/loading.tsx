import React from 'react';

const Loading: React.FC = () => {
    const spinnerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    };

    const circleStyle = {
        border: '16px solid #f3f3f3',
        borderRadius: '50%',
        borderTop: '16px solid #3498db',
        width: '120px',
        height: '120px',
        animation: 'spin 2s linear infinite',
    };

    return (
        <div style={spinnerStyle}>
            <div style={circleStyle}></div>
        </div>
    );
};

export default Loading;