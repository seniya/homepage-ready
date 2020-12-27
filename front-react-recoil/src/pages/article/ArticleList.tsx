import React from 'react';
import List from './component/List'

function ArticleList() {

  return (
    <div>
      <React.Suspense fallback={<div>Loading...</div>}>
        <List />  
      </React.Suspense>
    </div>
  )  
}

export default ArticleList