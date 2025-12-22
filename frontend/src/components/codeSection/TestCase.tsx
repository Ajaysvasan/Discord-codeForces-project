interface TestCase {
  input: string;
  expectedOutput: string;
  status?: boolean;
}
interface TestCaseProps {
  testCases?: TestCase[];
  error?: string;
  output?: string;
}
const TestCase = ({ testCases, error, output }: TestCaseProps) => {
  return (
    <div>
      <h3>Test cases</h3>
      <div className="test-case">
        {error && <div className="error">Error: {error}</div>}
        {testCases &&
          testCases.map((testCase, index) => (
            <div key={index} className="individual-test-case">
              <div>Input: {testCase.input}</div>
              <div>Expected Output: {testCase.expectedOutput}</div>
              <div>
                Status:{" "}
                {testCase.status !== undefined
                  ? testCase.status
                    ? "Passed"
                    : "Failed"
                  : "Not evaluated"}
              </div>
            </div>
          ))}
        {output && <div className="output">Output: {output}</div>}
      </div>
    </div>
  );
};
export default TestCase;
