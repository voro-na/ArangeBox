export const createViewModel = (store) => {
    let controlListener;
    let initAppListener;
    const update = () => {
        controlListener(store.lastFetch);
    }
    return {
        bindRenderControl: func => controlListener = func,
        bindRenderInitApp: func => initAppListener = func,
        bindOnClick: async () => {
            await store.fetchData();
            update()
        },
        bindOnResetClick: () => store.controlItems,
        init: async () => {

            await store.fetchData();
            update()
        }

    }
}