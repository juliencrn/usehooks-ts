
import { EffectCallback, useLayoutEffect } from 'react'

function useLayoutEffectOnce(effect: EffectCallback) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(effect, []);
}

export default useLayoutEffectOnce;
