/** Native source focus cycle, excluding disabled/hidden elements at the port boundary. */
export function dialogFocusable(panel: HTMLElement): HTMLElement[] {
  return [...panel.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])')]
    .filter(el=>!el.hasAttribute('disabled') && el.getAttribute('aria-disabled')!=='true' && el.tabIndex>=0
      && !el.closest('[hidden],[inert]') && el.getClientRects().length>0
      && panel.ownerDocument.defaultView?.getComputedStyle(el).visibility!=='hidden');
}

export function focusDialog(panel: HTMLElement) {
  const elements=dialogFocusable(panel);
  (elements.find(el=>!el.classList.contains('mj-dialog-close')) ?? elements[0] ?? panel).focus();
}

export function handleDialogKeydown(event: KeyboardEvent, panel: HTMLElement, close:()=>void) {
  if(event.key==='Escape'){event.preventDefault();close();return;}
  if(event.key!=='Tab')return;
  const elements=dialogFocusable(panel);
  if(!elements.length){event.preventDefault();panel.focus();return;}
  const first=elements[0]!,last=elements[elements.length-1]!;
  const active=panel.ownerDocument.activeElement;
  if(event.shiftKey && (active===first || active===panel || !panel.contains(active))){
    event.preventDefault();last.focus();
  }else if(!event.shiftKey && (active===last || active===panel || !panel.contains(active))){
    event.preventDefault();first.focus();
  }
}
