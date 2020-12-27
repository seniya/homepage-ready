import React from 'react';
import List from './component/List'

function BoardList() {

  return (
    <div>
      <React.Suspense fallback={<div>Loading...</div>}>
        <List />  
      </React.Suspense>
    </div>
  )  
}

export default BoardList