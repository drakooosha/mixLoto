import { useState } from "react";
import "./styles/global.scss";
import Board from "./components/Board/Board";
import "./App.scss";

function App() {
    const [activeVideo, setActiveVideo] = useState(null);

    return (
        <div className="container">
            <div className="header">
                <h1 className="header__title">
                    Mix <span>Loto</span>
                </h1>
            </div>

            <Board
                activeVideo={activeVideo}
                setActiveVideo={setActiveVideo}
            />
        </div>
    );
}

export default App;