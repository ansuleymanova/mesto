export const openModalWindow = (modalWindow) => {
    modalWindow.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
    modalWindow.addEventListener('mouseup', closePopupMouse);
}

export const closeModalWindow = (modalWindow) => {
    document.removeEventListener('keydown', closePopupEsc)
    modalWindow.removeEventListener('mouseup', closePopupMouse)
    modalWindow.classList.remove('popup_opened')
}

const closePopupEsc = (evt) => {
    if (evt.key === 'Escape') {
        const modalWindow = document.querySelector('.popup_opened');
        closeModalWindow(modalWindow);
    }
}

const closePopupMouse = (evt) => {
    const popupContainer = evt.target.closest('.popup__container');
    const imageContainer = evt.target.closest('.popup__image');
    if ((!popupContainer) && (!imageContainer)) {
        const modalWindow = document.querySelector('.popup_opened');
        closeModalWindow(modalWindow);
    }
}
