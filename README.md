## react-soundfont-player

Render & Interact with Musical Instruments & Notes.

A React wrapper over [soundfont-player](https://github.com/danigb/soundfont-player)

[![CircleCI][circleci-badge]][circleci-href]
[![NPM][npm-version-badge]][npm-href]
[![BundlePhobia][bundlephobia-badge]][bundlephobia-href]

### Install

```sh
yarn add react-soundfont-player
# Or
npm i react-soundfont-player
```

### Usage

```jsx
import * as React from "react";
import { render } from "react-dom";
import ReactSoundFontPlayer from "react-soundfont-player";
const App = () => {
  return (
    <Instrument>
      {({ instrument, isLoading, audioContext: ac }) => {
        return (
          <button
            onClick={() => {
              // Play A4 for 500 ms
              instrument.play("A4").stop(ac.currentTime + 0.5);
            }}
          >
            Play A4
          </button>
        );
      }}
    </Instrument>
  );
};

render(<App />, document.getElementById("#app"));
```

[circleci-href]: https://circleci.com/gh/rakannimer/react-soundfont-player
[circleci-badge]: https://img.shields.io/circleci/project/github/rakannimer/react-soundfont-player.svg
[npm-href]: https://www.npmjs.com/package/react-soundfont-player
[npm-version-badge]: https://img.shields.io/npm/v/react-soundfont-player.svg
[npm-license-badge]: https://img.shields.io/github/license/rakannimer/react-soundfont-player.svg
[bundlephobia-badge]: https://img.shields.io/bundlephobia/minzip/react-soundfont-player.svg
[bundlephobia-href]: https://bundlephobia.com/result?p=react-soundfont-player
