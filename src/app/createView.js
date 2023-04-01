import { removeNode } from "../helpers/removeNodes.js";
import { dragEvent } from "../helpers/dragEvent.js"

const AddButton = (text, classElem) => {
    const button = document.createElement('button')
    button.textContent = text;
    button.classList.add('button')
    button.classList.add(classElem)
    return button
}

export const createView = () => {
    const container = document.querySelector('.container');
    let availableContainer, selectedContainer, activeElement, buttonAddData, buttonReset;

    const onClick = (listener) => {
        const addDataListener = (e) => {
            e.preventDefault();
            listener();
        }
        buttonAddData.addEventListener('click', addDataListener)
        return () => buttonAddData.removeEventListener('click', addDataListener);
    }

    const onResetClick = (listener) => {
        const resetListener = (e) => {
            e.preventDefault();
            let data = listener()
            removeNode(selectedContainer);
            removeNode(availableContainer)

            data.forEach(temp => renderControl(temp))

        }
        buttonReset.addEventListener('click', resetListener)
        return () => buttonReset.removeEventListener('click', resetListener);
    }

    const onInputChange = (e, type) => {
        let str = e.target.value;
        let searchElememts = document.querySelector(`.${type}`).querySelectorAll('.control-item')
        searchElememts.forEach(elem => {
            let title = elem.querySelector('.control-item_title');
            if (!str) {
                elem.style.display = 'grid'
            }
            else if (!title.textContent.includes(str)) {
                elem.style.display = 'none'
            } else {
                elem.style.display = 'grid'
            }
        })
    }

    const renderInitApp = () => {
        container.innerHTML = `<div class='available'>Available
        <input type="text" placeholder = 'Input search value' class = 'input input-available'>
        </div>
        <div class='select'>Selected
        <input type="text" placeholder = 'Input search value' class = 'input input-selected'>
        </div>
        <div class='control_available'></div>
        <div class='control_selected'></div>`

        availableContainer = document.querySelector('.control_available');
        selectedContainer = document.querySelector('.control_selected');

        document.querySelector('.available').appendChild(AddButton('Add data', 'addBtn'))
        buttonAddData = document.querySelector('.addBtn')

        document.querySelector('.available').appendChild(AddButton('Reset', 'resetBtn'))
        buttonReset = document.querySelector('.resetBtn')

        availableContainer.addEventListener(`dragstart`, (e) => {
            e.target.classList.add(`selected`);
            activeElement = document.querySelector('.selected')
        })

        availableContainer.addEventListener(`dragend`, (e) => {
            e.target.classList.remove(`selected`);
        });
        selectedContainer.addEventListener(`dragstart`, (e) => {
            e.target.classList.add(`selected`);
            activeElement = document.querySelector('.selected')
        })

        selectedContainer.addEventListener(`dragend`, (e) => {
            e.target.classList.remove(`selected`);
        });

        document.querySelector('.input-available').addEventListener('input', e => onInputChange(e, 'control_available'))
        document.querySelector('.input-selected').addEventListener('input', e => onInputChange(e, 'control_selected'))

        availableContainer.addEventListener('dragover', e =>
            dragEvent(availableContainer, availableContainer, selectedContainer, activeElement, e))
        selectedContainer.addEventListener('dragover', e =>
            dragEvent(selectedContainer, availableContainer, selectedContainer, activeElement, e))
    }

    const renderControl = (temp) => {

        const item = document.createElement('div');
        item.classList.add('control-item');
        item.draggable = true;
        item.innerHTML = `
        <img src=${temp.photoURL} alt='exampleImg' class='control-item_img' draggable = 'false' width='150'>
        <div class='control-item_title'>${temp.title}</div>
        <div>$${temp.cost}</div>`;
        availableContainer.appendChild(item)
    }

    return {
        onClick,
        onResetClick,
        renderControl,
        renderInitApp
    }

}