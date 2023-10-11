import "zone.js";
import { Detector } from './change-detector';

export const NgZone = Zone.current.fork({
    onInvokeTask(parent, current, target, task, applyThis, applyArgs) {
        // console.log("le navigateur essaye d'appeler une fonction");
        parent.invokeTask(target, task, applyThis, applyArgs);

        Detector.digest();
    },
    name: "NgZone"
});