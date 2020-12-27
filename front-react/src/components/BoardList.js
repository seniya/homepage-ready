function BoardList({ id, boardId, boardTitle, boardContent, onRowClick, onRemoveButtonClick }) {

    return (
        <tr>
            <td onClick={() => onRowClick(id, boardId, boardTitle, boardContent)}>{boardId}</td>
            <td onClick={() => onRowClick(id, boardId, boardTitle, boardContent)}>{boardTitle}</td>
            <td onClick={() => onRowClick(id, boardId, boardTitle, boardContent)}>{boardContent}</td>
            <td><button onClick={() => onRemoveButtonClick(id)}>삭제</button></td>
        </tr>
    )
}

export default BoardList;