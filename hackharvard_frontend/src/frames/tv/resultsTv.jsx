import { useState } from "react"
import "./resultsTv.css"
import {backend_url} from "../../backendUrl";

function TvResultsOneImage(props) {
  let card_image_class = "card_image";
  if(props.active){
    card_image_class += " card_image_active"
  }
  let votes = []
  for(let vote_index in props.votes){
    let v = props.votes[vote_index];
    votes.push(<li className={"voter"} key={v}>{v}</li>)
  }

  return (
      <div className="card_results">
        <div className={card_image_class}>
          <img src={backend_url + props.image} alt={"Card Image"} />
        </div>
        <div className={"card_info"}>
          <div className={"author"}>
            {props.author + (props.active ? " (Active)" : "")}, {props.score} (+{props.round_score})
          </div>
          <div className={"prompt"}>
            {props.prompt}
          </div>
          <ul className={"voters"}>
            {
              votes
            }
          </ul>
        </div>
      </div>
  )
}

function TvLeaderboard(props) {
  return (
      <div id="results_leaderboard">
        {props.players.map((p)=> {
          <div key={p.name} className={"player_result"}>
            {p.name}: {p.total_score}({p.round_score})
          </div>
            })}
      </div>);
}

function TvResults(props) {

    let items = []
    for (let card in props.images) {
      let c = props.images[card];
      items.push(<TvResultsOneImage key={c.image} score={c.score} round_score={c.round_score} active={c.is_active_player} author={c.author} prompt={c.prompt} image={c.image} votes={c.votes}></TvResultsOneImage>)
    }

    return (
        <div id="container">
            <div id="tv_results">
              <div id="results_cards">
                {items}
              </div>
              <TvLeaderboard players={props.players}>
              </TvLeaderboard>
            </div>
        </div>
    )
}

export default TvResults

