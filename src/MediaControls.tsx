import React, { useState, useEffect } from "react";
import { View, Animated, GestureResponderEvent } from "react-native";
import styles from "./MediaControls.style";
import { PLAYER_STATES } from "./constants/playerStates";
import { Controls } from "./Controls";
import { Slider } from "./Slider";
import { Toolbar } from "./Toolbar";

interface MediaControlsComposition {
  Toolbar: React.FC;
}

interface Track {
  title: string;
  artist: string;
  id?: number;
}

export type Props = {
  style?: object;
  duration: number;
  fadeOutDelay?: number;
  isFullScreen: boolean;
  isLoading: boolean;
  mainColor: string;
  onFullScreen?: (event: GestureResponderEvent) => void;
  onPaused: (playerState: PLAYER_STATES) => void;
  onReplay: () => void;
  onSeek: (value: number) => void;
  onSeeking: (value: number) => void;
  playerState: PLAYER_STATES;
  progress: number;
  showOnStart?: boolean;
  track?: Track;
  controlsStyle?: object;
  buttonsComponent?: object;
  isLoadingComponent?: object;
};

const MediaControls: React.FC<Props> & MediaControlsComposition = props => {
  const {
    children,
    duration,
    isLoading = false,
    mainColor = "rgba(12, 83, 175, 0.9)",
    onFullScreen,
    onReplay: onReplayCallback,
    onSeek,
    onSeeking,
    playerState,
    progress,
    style = {},
    controlsStyle = {},
    buttonsComponent,
    isLoadingComponent,
  } = props;
  const { initialIsVisible } = (() => {
    return {
      initialOpacity: 1,
      initialIsVisible: true,
    };
  })();

  const [, setIsVisible] = useState(initialIsVisible);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const onReplay = onReplayCallback || (() => {});

  const onPause = () => {
    const { playerState, onPaused } = props;
    const { PLAYING, PAUSED } = PLAYER_STATES;
    switch (playerState) {
      case PLAYING: {
        //cancelAnimation();
        break;
      }
      case PAUSED: {
        //fadeOutControls(fadeOutDelay);
        break;
      }
      default:
        break;
    }

    const newPlayerState = playerState === PLAYING ? PAUSED : PLAYING;
    return onPaused(newPlayerState);
  };

  // const toggleControls = () => {
  //   // value is the last value of the animation when stop animation was called.
  //   // As this is an opacity effect, I (Charlie) used the value (0 or 1) as a boolean
  //   opacity.stopAnimation((value: number) => {
  //     setIsVisible(!!value);
  //     return value ? fadeOutControls() : fadeInControls();
  //   });
  // };

  return (
    <Animated.View style={[styles.container, style]}>
        <View style={[styles.controlsRow, styles.toolbarRow]}>{children}</View>
        <Controls
          onPause={onPause}
          onReplay={onReplay}
          isLoading={isLoading}
          mainColor={mainColor}
          playerState={playerState}
          controlsStyle={controlsStyle}
          buttonsComponent={buttonsComponent}
          isLoadingComponent={isLoadingComponent}
        />
        <Slider
          progress={progress}
          duration={duration}
          mainColor={mainColor}
          onFullScreen={onFullScreen}
          playerState={playerState}
          onSeek={onSeek}
          onSeeking={onSeeking}
          onPause={onPause}
        />
    </Animated.View>
  );
};

MediaControls.Toolbar = Toolbar;

export default MediaControls;
