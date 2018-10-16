import * as React from "react";
import { renderAndAddProps } from "render-and-add-props";
import SoundFontPlayer from "soundfont-player";

export const getAudioContext = () => {
  const AudioContext =
    // @ts-ignore
    window.AudioContext || // Default
    // @ts-ignore
    window.webkitAudioContext || // Safari and old versions of Chrome
    false;
  if (!AudioContext) {
    console.warn(
      "Sorry but the WebAudio API is not supported on this browser. Please consider using Chrome or Safari for the best experience "
    );
    return {};
    // throw new Error('PLATFORM_NOT_SUPPORTED');
  }
  return new AudioContext();
};

export type InstrumentState = {
  isLoading: boolean;
  instrument: SoundFontPlayer.Player | null;
  audioContext: ReturnType<typeof getAudioContext>;
  playNoteFor: null | ((noteName: string, duration: number) => Promise<void>);
  playNoteIn:
    | null
    | ((noteName: string, when: number, duration: number) => Promise<void>);
};
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export type InstrumentProps = {
  name: SoundFontPlayer.InstrumentName;
  renderLoading: () => any;
  children: ({ instrument, audioContext }: InstrumentState) => any;
};

export class ReactSoundFontPlayer extends React.Component<
  InstrumentProps,
  InstrumentState
> {
  static defaultProps = {
    name: "acoustic_grand_piano",
    renderLoading: () => "Loading..."
  };
  state = {
    instrument: null,
    audioContext: getAudioContext(),
    isLoading: true,
    playNoteIn: null,
    playNoteFor: null
  };
  shouldComponentUpdate(nextProps: InstrumentProps) {
    return this.props.name !== nextProps.name;
  }
  async componentDidMount() {
    const ac = getAudioContext();
    const instrument = await SoundFontPlayer.instrument(ac, this.props.name);
    const playNoteFor = async (noteName: string, duration: number) => {
      instrument.play(noteName).stop(ac.currentTime + duration / 1000);
      await delay(duration);
    };
    const playNoteIn = async (
      noteName: string,
      when: number,
      duration = 1000
    ) => {
      instrument
        .play(noteName, ac.currentTime + when / 1000)
        .stop(ac.currentTime + duration / 1000);
      await delay(duration);
      await delay(when);
    };
    this.setState(s => ({
      ...s,
      instrument,
      isLoading: false,
      playNoteFor,
      playNoteIn
    }));
  }

  render() {
    const { isLoading } = this.state;
    return isLoading
      ? this.props.renderLoading()
      : renderAndAddProps(this.props.children, this.state);
  }
}

export default ReactSoundFontPlayer;
