const apiDomain = process.env.NEXT_PUBLIC_DOMAIN || null;

async function fetchPosts() { 

    try {
        if (!apiDomain) {
             return [];
          }
        const response = await fetch(`${apiDomain}/posts`, {
            cache:'no-store'
        });
        if(!response.ok){
            throw new Error('failed to fetch data',response.statusText)
        }
        return response.json()
    } catch (error) {
        console.log(error)
        return []
    }
}

export {fetchPosts}