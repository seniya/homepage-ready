import React from 'react';
import Item from './component/Item'

function BoardDetail() {

  return (
    <div>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Item />  
      </React.Suspense>
    </div>
  )  
}

export default BoardDetail