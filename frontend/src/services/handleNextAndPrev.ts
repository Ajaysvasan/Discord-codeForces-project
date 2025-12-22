interface HandleNextAndPrevArgs {
  currentIndex: number;
  totalItems: number;
  direction: "next" | "prev";
  setOutput: (output: string) => void;
  setCodeError: (error: string) => void;
}
const handleNextAndPrev = ({
  currentIndex,
  totalItems,
  direction,
  setOutput,
  setCodeError,
}: HandleNextAndPrevArgs): number => {
  setOutput("");
  setCodeError("");
  if (direction === "next") {
    return currentIndex < totalItems - 1 ? currentIndex + 1 : currentIndex;
  } else if (direction === "prev") {
    return currentIndex > 0 ? currentIndex - 1 : currentIndex;
  }
  return currentIndex;
};
export default handleNextAndPrev;
