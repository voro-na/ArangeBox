export const removeNode =(container)=> {
    const elements = container.querySelectorAll('.control-item')
    elements.forEach( elem => elem.remove())
}