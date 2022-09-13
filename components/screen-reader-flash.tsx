import { useAtom } from "jotai";
import { screenReaderFlashAtom } from "../store";

export default function ScreenReaderFlash() {
  const [flash, _setFlash] = useAtom(screenReaderFlashAtom);
  return (
    <section
      aria-live="polite"
      role="log"
      aria-atomic="true"
      className="visually_hidden"
    >
      {flash}
    </section>
  );
}
