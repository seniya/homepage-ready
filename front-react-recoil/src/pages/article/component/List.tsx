import { useRecoilValue } from 'recoil'
import { articlesQuery } from '../../../atoms/atomsArticle'

export default function RenderList () {
  const responseData = useRecoilValue(articlesQuery)
  const { data } = responseData

  return (
    <>
      {data.map(item => (
        <div key={item._id}>
          <p>{`Title: ${item.title} `}.</p>
        </div>
        ))}
    </>
    )
}