import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { CountState } from "./atoms";

function Counter () {  

  const [count, setCount] = useRecoilState(CountState)
  // const count = useRecoilValue(CountState)
  // const setCount = useSetRecoilState(CountState)

  return (
    <div>
      <p>Counter Component State : {count}</p>
      <button
        type="button"
        onClick={() => setCount((prevState) => prevState + 1)}
      >
        +
      </button>
      <button
        type="button"
        onClick={() => setCount((prevState) => prevState - 1)}
      >
        -
      </button>
    </div>
  )
}

export default Counter