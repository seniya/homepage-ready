import axios from 'axios';

// Search Api
export const getData = async () => {
    const selectUrl = 'http://localhost:4000/data';
    const response = await axios.get(selectUrl);
    return response.data;
}

// Save Api
export async function saveData(saveData) {

    // Update Api
    if(saveData.data.boardId !== '' && saveData.data.boardId != null) {
        const updateUrl = 'http://localhost:4000/data/' + saveData.data.id; //data.json 의 id
        const response = await axios.put(updateUrl, {
            boardId: saveData.data.boardId,
            boardTitle: saveData.data.boardTitle,
            boardContent: saveData.data.boardContent
        });    
        return response;
    } 
    
    // Insert Api
    else {
        const insertUrl = 'http://localhost:4000/data';
        const response = await axios.post(insertUrl, {
            id: saveData.lastId+1,    
            boardId: saveData.lastId+1,
            boardTitle: saveData.data.boardTitle,
            boardContent: saveData.data.boardContent
        })
        return response;
    }
}

// Remove Api
export async function removeData(id) {
    const removeUrl = 'http://localhost:4000/data/' + id;
    const response = await axios.delete(removeUrl);
    return response;
}