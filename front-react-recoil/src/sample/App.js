import React from 'react';
import { selector, useRecoilValue, useRecoilValueLoadable, RecoilRoot } from 'recoil';


const url = `https://reqres.in/api/users?page=1`;

const fetchUserDetails = selector({
    key: 'userDetailsSelector',
    get: async ({ get }) => {
        try{
            const response = await fetch(url);
            const data = await response.json();
            return data;
        }catch(error){
            throw error;
        }
    }
});

const DetailsWithoutSuspense = () => {

    const userDetails = useRecoilValueLoadable(fetchUserDetails);
    const { state } = userDetails;

    if (userDetails.state === 'hasError') {
        return <div> There is some problem! </div>
    }

    if(state === 'loading'){
        return <div>Its loading</div>
    }

    if(state === 'hasValue'){
        const { contents: { data }} = userDetails;
        return (
            data.map(item => (
                <div key={item.id}>
                    <p>
     {`Email: ${item.email} Name: ${item.first_name} ${item.last_name}`}.   
                   </p>
                </div>
            ))
        );

    }
}

const DetailsWithSuspense = () => {
    const userDetails = useRecoilValue(fetchUserDetails);
    const { data } = userDetails;

    return (
        data.map(item => (
            <div key={item.id}>
                <p>
     {`Email: ${item.email} Name: ${item.first_name} ${item.last_name}`}. 
                </p>
            </div>
        ))
    );
}


function App() {
  return (
    <RecoilRoot>
        <div> 
            <DetailsWithoutSuspense />
            <React.Suspense fallback={<div>Loading...</div>}>
            {/* <DetailsWithSuspense /> */}
            </React.Suspense>
        </div>
    </RecoilRoot>
  );
}

export default App;