import { removeNode } from "../helpers/removeNodes.js";
import { getNextElement } from "../helpers/getNextElement.js";


const AddButton = (text, classElem) => {
    const button = document.createElement('button')
    button.textContent = text;
    button.classList.add('button')
    button.classList.add(classElem)
    return button
}


export const createView = () => {
    const container = document.querySelector('.container');
    let availableContainer, selectedContainer, controlItems, activeElement, buttonAddData, buttonReset;

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

    const RenderInitApp = () => {
        container.innerHTML = `<div class='control_available'>Available
        <form>
        <input type="text" placeholder = 'Input search value' class = 'input'>
        </form>
        </div>
        <div class='control_selected'>Selected
        <form>
        <input type="text" placeholder = 'Input search value' class = 'input'>
        </form></div>`
        availableContainer = document.querySelector('.control_available');
        selectedContainer = document.querySelector('.control_selected');

        availableContainer.appendChild(AddButton('Add data', 'addBtn'))
        buttonAddData = document.querySelector('.addBtn')

        availableContainer.appendChild(AddButton('Reset', 'resetBtn'))
        buttonReset = document.querySelector('.resetBtn')

    }

    const renderControl = (temp) => {

        const item = document.createElement('div');
        item.classList.add('control-item');
        item.draggable = true;
        item.innerHTML = `
        <img src=${temp.photoURL} alt='exampleImg' class='control-item_img' draggable = 'false' width='150'>
        <div class='control-item_title'>${temp.title}</div>
        <div>$${temp.cost}</div>
        `;
        availableContainer.appendChild(item)


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

        availableContainer.addEventListener('dragover', e => renderDrag(availableContainer, activeElement, e))
        selectedContainer.addEventListener('dragover', e => renderDrag(selectedContainer, activeElement, e))
    }

    const renderDrag = (curContainer, activeElement, e) => {
        e.preventDefault();

        const currentElement = e.target;
        const isMoveable = activeElement !== currentElement &&
            (currentElement.classList.contains(`control-item`) || currentElement.classList.contains(`control_selected`)
                || currentElement.classList.contains(`control_available`));

        if (!isMoveable) { return; }
        const nextElement = getNextElement(e.clientY, currentElement);
        if (
            nextElement &&
            activeElement === nextElement.previousElementSibling ||
            activeElement === nextElement
        ) { return; }

        if (!nextElement || nextElement === availableContainer || nextElement === selectedContainer) {
            curContainer.appendChild(activeElement)
        } else {
            curContainer.insertBefore(activeElement, nextElement);
        }

    }
    return {
        onClick,
        onResetClick,
        renderControl,
        RenderInitApp
    }

}