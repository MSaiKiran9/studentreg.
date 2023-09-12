// Navigation.js
import React, { useState } from 'react';
import File1 from './Gist';
import File2 from './File2.jsx';
import File3 from './File3';
import File4 from './File4';
import './navstyle.css';

const Navigation = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleClick = (fileNumber) => {
        setSelectedFile(fileNumber);
    };

    return (
        <div id='main-div'>
            <nav>
                <ul>
                    <li>
                        <button
                            onClick={() => handleClick(1)}
                            className={selectedFile === 1 ? 'blueborder' : 'normal'}
                        >
                            2-1
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => handleClick(2)}
                            className={selectedFile === 2 ? 'blueborder' : 'normal'}
                        >
                            2-2
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => handleClick(3)}
                            className={selectedFile === 3 ? 'blueborder' : 'normal'}
                        >
                            3-1
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => handleClick(4)}
                            className={selectedFile === 4 ? 'blueborder' : 'normal'}
                        >
                            3-2
                        </button>
                    </li>
                </ul>
            </nav>
            <div>
                {selectedFile === 1 && <File1 sem="2-1" />}
                {selectedFile === 2 && <File2 sem="2-2" />}
                {selectedFile === 3 && <File3 sem="3-1" />}
                {selectedFile === 4 && <File4 sem="3-2" />}
            </div>
        </div>
    );
};

export default Navigation;
