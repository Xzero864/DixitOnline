import './App.css'
import socket from './socketConfig'

import ActivePlayerClue from 'src/frames/active/clue'
import ActivePlayerPrompt from 'src/frames/active/prompt'
import RoleSelect from 'src/frames/roleSelect.jsx'
import WaitingScreen from 'src/frames/wait.jsx'
import BotPlayerPrompt from './frames/bot/prompt'


import { useEffect, useState } from 'react'
import BotVote from './frames/bot/vote'

function App() {
  const [gameState, setGameState] = useState("roleSelect");
  const [frameInfo, setFrameInfo] = useState({});

  useEffect(() => {
    socket.io.on("display_waiting_screen", (msg) => {
      setGameState("wait");
      setFrameInfo(msg);
    });

    socket.io.on("display_active_player_ok", (msg) => {
      setGameState("active_player_clue");
      setFrameInfo(msg);
    });

    socket.io.on("display_vote", (msg) => {
      setGameState("bot_vote");
      setFrameInfo(msg);
    })

    socket.io.on("display_prompt", (msg) => {
      setGameState("prompt");
      setFrameInfo(msg);
    })

    socket.io.on("display_results", (msg) => {
      setGameState("player_results");
      setFrameInfo(msg);
    })

    socket.io.on("tv_show_player_list", (msg) => {
      setGameState("lobby");
      setFrameInfo(msg);
    })

    socket.io.on("tv_show_cards_vote", (msg) => {
      setGameState("tv_vote");
      setFrameInfo(msg);
    });

    socket.io.on("tv_show_results", (msg) => {
      setGameState("tv_results");
      setFrameInfo(msg);
    })
  }, []);

  if (gameState == "wait") {
    return (
      <div id="app_frame">
        <WaitingScreen />
      </div>
    )
  }

  if (gameState == "active_player_clue") {
    return (
      <div id="app_frame">
        <ActivePlayerClue />
      </div>
    )
  }

  if (gameState == "bot_vote") {
    return (
      <div id="app_frame">
        <BotVote />
      </div>
    )
  }

  if (gameState == "prompt") {
    return (
      <div id="app_frame">
        <Prompt info={frameInfo} />
      </div>
    )
  }

  if (gameState == "player_results") {
    return (
      <div id="app_frame">
        <PlayerResults info={frameInfo} />
      </div>
    )
  }


  return (
    <div id="app_frame">

      <RoleSelect />
      <WaitingScreen />
      <ActivePlayerPrompt />
      <ActivePlayerClue />
      <BotPlayerPrompt />

    </div>
  )

}

export default App