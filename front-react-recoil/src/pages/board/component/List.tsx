import { useRecoilValue } from 'recoil'
import { boardsQuery } from '../../../atoms/atomsBoard'

export default function RenderList () {
  const responseData = useRecoilValue(boardsQuery)
  const { data } = responseData

  return (
    <>
      {data.map(item => (
        <div key={item._id}>
          <p>{`Id: ${item._id} `} / {`Title: ${item.title} `}</p>
        </div>
        ))}
    </>
    )
}