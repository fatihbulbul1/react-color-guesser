const GameOver = ({score,setGOver,handleRestart,highest}) =>{
    return(
        <div className='game-over'>
            <div className="box">
                <h1>Game Over</h1>
                <div className="score">
                    <p>Score: {score}</p>
                    <p>Highest score: {highest}</p>
                </div>
                <input onClick={() => {
                setGOver(false)
                handleRestart()}
                } className="re-btn" type="button" value="Restart" />
            </div>
        </div>
    )
}
export default GameOver