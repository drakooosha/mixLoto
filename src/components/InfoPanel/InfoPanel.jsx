import "./InfoPanel.scss";

const InfoPanel = ({playedTiles}) => {
    const playedNumbers = [...playedTiles].sort((a, b) => a - b);

    return (
        <div className="panel">
            {playedNumbers.length > 0 ? (
                <>
                    <h2 className="panel__title">
                        Сыгранные номера
                    </h2>
                    <ul className="panel__items">
                        {playedNumbers.map((id) => (
                            <li
                                key={id}
                                className="panel__item"
                            >
                                {id}
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <div className="panel__empty">
                    Пока нет сыгранных номеров
                </div>
            )}
        </div>
    );
};

export default InfoPanel;