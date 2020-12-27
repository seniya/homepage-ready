import { RecoilRoot } from 'recoil'
import { Route, Link  } from 'react-router-dom'

import Home from './pages/Home'
import About from './pages/About'
import BoardList from './pages/board/BoardList'
import BoardDetail from './pages/board/BoardDetail'

import ArticleList from './pages/article/ArticleList'
import SignUp from './pages/sign/SignUp'
import SignIn from './pages/sign/SignIn'

const App: React.FC = () => {
  return (
    <>
      <div>
        <ul>
          <li>
            <Link to="/">홈</Link>
          </li>
          <li>
            <Link to="/about">소개</Link>
          </li>
          <li>
            <Link to="/sign-up">가입</Link>
          </li>
          <li>
            <Link to="/sign-in">로그인</Link>
          </li>
          <li>
            <Link to="/boards">보드 리스트</Link>
          </li>
          <li>
            <Link to="/board/5f8efb31069dac179467dca5">보드 상세</Link>
          </li>
          <li>
            <Link to="/articles">아티클 리스트</Link>
          </li>
        </ul>
      </div>
      <RecoilRoot>
        <Route path="/" exact={true} component={Home} />
        <Route path="/about" component={About} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/boards" component={BoardList} />
        <Route path="/board/5f8efb31069dac179467dca5" component={BoardDetail} />
        <Route path="/articles" component={ArticleList} />
      </RecoilRoot>
    </>
  )
}

export default App