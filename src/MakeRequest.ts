
const makeRequest = async <ResponseType>(url: string): Promise<ResponseType> => {
    const response = await fetch(url);
    if(response.ok) {
       return await response.json();
    }

    throw new Error(response.statusText);
};

export default makeRequest;