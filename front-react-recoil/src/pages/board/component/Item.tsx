import { useRecoilValue } from 'recoil'
import { boardQuery } from '../../../atoms/atomsBoard'

export default function RenderItem () {
  const responseData = useRecoilValue(boardQuery('5f8efb31069dac179467dca5'))
  const { data } = responseData

  return (
    <>
      <div>
        <p>{`Id: ${data._id}`} / {`Title: ${data.title}`}</p>
      </div>
    </>
    )
}