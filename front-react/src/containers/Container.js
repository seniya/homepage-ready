import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BoardList from '../components/BoardList';
import BoardNew from '../components/BoardNew';
import { saveDataAsync, searchDataAsync, removeDataAsync } from '../module/boardReducer';

function Container() {

    let [inputData, setInputData] = useState({
        id: '',
        boardId: '',
        boardTitle: '',
        boardContent: ''
    });

    const dispatch = useDispatch();

    const {boards, lastId} = useSelector(state => state.boardReducer);

    const onSearchButtonClick = () => {
        resetForm();
        dispatch(searchDataAsync());
    }

    const onSaveButtonClick = (data) => {
        dispatch(saveDataAsync(data, lastId));
    }

    const onRemoveButtonClick = (id) => {
        dispatch(removeDataAsync(id));
    }

    const onRowClick = (id, boardId, boardTitle, boardContent) => {
        setInputData({
            id: id,
            boardId: boardId,
            boardTitle: boardTitle,
            boardContent: boardContent
        })
    }

    const changeInput = (e) => {
        setInputData({
            ...inputData,
            [e.target.name]: e.target.value
        })
    }

    const resetForm = () => {
        setInputData({
            boardId: '',
            boardTitle: '',
            boardContent: ''
        })
    }

    return (
        <div>
            <button onClick={onSearchButtonClick}>조회</button>
            <div>
                <table border="1">
                    <tbody>
                        <tr align="center">
                            <td width="50">번호</td>
                            <td width="100">제목</td>
                            <td width="200">내용</td>
                        </tr>
                        {boards.length > 0 && boards.map(row =>
                            <BoardList
                                key={row.boardId}
                                id={row.id}
                                boardId={row.boardId}
                                boardTitle={row.boardTitle}
                                boardContent={row.boardContent}
                                onRowClick={onRowClick}
                                onRemoveButtonClick={onRemoveButtonClick}
                            />
                        )}
                    </tbody>
                </table>
            </div>
            <div>
                <BoardNew 
                    changeInput={changeInput}
                    inputData={inputData}
                    onSaveButtonClick={onSaveButtonClick}
                    resetForm={resetForm}
                />
            </div>
        </div>
    );
}

export default Container;