export const createModel = () =>{
    class store {
        controlItems = [];
        lastFetch;
        count = 0;
        
        fetchData = async () =>{
            try{
                const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${++this.count}`)
                const data = await response.json();
                
                const item = {
                    id : data.id,
                    title: data.title,
                    photoURL: data.url,
                    cost: Math.floor(Math.random() * 100)
                }
                this.controlItems.push(item);
                this.lastFetch = item
                                
            }catch{err => err}
        }
    }
    return new store()
}