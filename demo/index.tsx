import * as ReactDOM from "react-dom";
import * as React from "react";

import ReactSoundFontPlayer from "../src/";
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const App = () => {
  return (
    <div>
      Oh hai Instrument
      <ReactSoundFontPlayer name="harmonica">
        {({ instrument, audioContext: ac, playNoteFor }) => (
          <div>
            Instrument ready
            <button
              onClick={async () => {
                instrument.play("C4").stop(ac.currentTime + 500);
              }}
            >
              Play A4
            </button>
          </div>
        )}
      </ReactSoundFontPlayer>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
