import { Dispatch, SetStateAction } from "react";

const pointerIsInside = (target : HTMLElement, clientX : number, clientY : number) => {
  const rect = target.getBoundingClientRect();
  return clientX > rect.left && clientX < rect.right && clientY > rect.top && clientY < rect.bottom;
}

export const mouseInOut = (e : MouseEvent, elements : any[], setInsideEle : Dispatch<SetStateAction<number>>) => {
  let gotInside = -1;
  elements.forEach(({ref}, ind) => {
    if (ref.current) {
      let isInside = pointerIsInside(ref.current, e.clientX, e.clientY);
      if (isInside) gotInside = ind;
    }
  })
  setInsideEle(gotInside);
}