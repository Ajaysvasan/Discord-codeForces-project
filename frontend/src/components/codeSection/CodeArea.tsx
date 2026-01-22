import { useState, useRef } from "react";
import CodeSpace from "./CodeSpace";
import TestCase from "./TestCase";
// import handleNextAndPrev from "../../services/handleNextAndPrev";
import { sendCode } from "../../services/sendCode";
const CodeArea = () => {
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [isCodeSubmitted, setIsCodeSubmitted] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [output, setOutput] = useState("");
  const [codeError, setCodeError] = useState("");

  const codeRef = useRef<string>("");
  const handleCodeChange = (newCode: string) => {
    codeRef.current = newCode;
  };

  const handleCodeSubmit = async (pid: number, mode: string) => {
    console.log(isCodeSubmitted);
    const access_token = localStorage.getItem("access_token");
    console.log(access_token);
    const payload = {
      access_token: access_token,
      code: codeRef.current,
      pid: pid,
      selectedLanguage: selectedLanguage,
      mode: mode,
    };

    const response = await sendCode(payload);
    if (response.success) {
      setIsCodeSubmitted(true);
      if (mode === "run") {
        setOutput(response.output || "");
        setCodeError(response.error || "");
      } else if (mode === "submit") {
        setOutput(
          `Code submitted successfully. Hidden Test Cases Passed: ${response.hiddenTestsPassed}`
        );
        setCodeError("");
      }
    }
  };

  const problemStatements = [
    {
      pid: 1,
      problemTitle: "Find the array that has maximum sum",
      question: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,

      examples: `
Example 1:

Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
Example 2:

Input: nums = [3,2,4], target = 6
Output: [1,2]
Example 3:

Input: nums = [3,3], target = 6
Output: [0,1]`,

      Constraints: `2 <= nums.length <= 104
-109 <= nums[i] <= 109
-109 <= target <= 109
Only one valid answer exists.
 

Follow-up: Can you come up with an algorithm that is less than O(n3) time complexity?`,
    },
  ];
  return (
    <div className="code-area">
      <div className="problem-statement-container">
        {problemStatements.map((problemStatement) => (
          <div
            className="Problem title"
            key={problemStatement.pid}
            onClick={() => setCurrentProblemIndex(problemStatement.pid)}
          >
            <h3> {problemStatement.problemTitle}</h3>
            <div className="question">
              <h4> {problemStatement.question} </h4>
            </div>
            <div className="examples">
              <h4> Examples: {problemStatement.examples} </h4>
            </div>
            <div className="constraints">
              <h4> Constraints: {problemStatement.Constraints} </h4>
            </div>
          </div>
        ))}
      </div>
      <div className="editor-container">
        <button className="prev" onClick={() => setOutput("")}>
          Previous
        </button>
        <button className="next" onClick={() => setOutput("")}>
          Next
        </button>
        <button
          className="run-test"
          onClick={() => handleCodeSubmit(currentProblemIndex, "run")}
        >
          Run
        </button>
        <button
          className="submit"
          onClick={() => handleCodeSubmit(currentProblemIndex, "submit")}
        >
          Submit
        </button>
        <CodeSpace
          getCode={handleCodeChange}
          setLanguageSelected={setSelectedLanguage}
          selectedLanguage={selectedLanguage}
        />
        <div className="output-section">
          <div className="test-cases">
            <TestCase output={output} error={codeError} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CodeArea;
