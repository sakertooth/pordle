export function refreshToast(message: string) {
    let toastContainerHtml = document.getElementById('toast-container');
    if (toastContainerHtml == null) {
        return;
    }

    let toastHtml = toastContainerHtml.children[0] as HTMLElement;
    toastHtml.textContent = message;

    toastHtml.style.animation = 'none';
    toastHtml.offsetHeight; //DOM Reflow
    toastHtml.style.animation = '';
    toastHtml.setAttribute('animation-state', 'fade');
}