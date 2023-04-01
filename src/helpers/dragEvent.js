import { getNextElement } from "./getNextElement.js";

export const dragEvent = (curContainer, availableContainer, selectedContainer, activeElement, e) => {
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