// Copyright (c) 2021 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

export class ElementPickerEvents {
  private callbackHover: (event: Element) => void;
  private callbackClick: (event: Element) => void;
  private callbackOnDeactivate: () => void;
  private lastElem: HTMLElement | null;
  private _isActive: boolean;
  constructor(
    callbackHover: (elem: Element) => void,
    callbackClick: (elem: EventTarget) => void,
    callbackOnDeactivate: () => void,
  ) {
    this.callbackHover = callbackHover;
    this.callbackClick = callbackClick;
    this.callbackOnDeactivate = callbackOnDeactivate;
    this._isActive = false;
    this.lastElem = null;
  }

  onKeydownEvent = (event: KeyboardEvent): void => {
    if (event.key === 'Escape' || event.which === 27) {
      event.stopPropagation();
      event.preventDefault();
      this.deactivate();
    }
  }

  onMouseClickEvent = (event: Event): void => {
    event.stopPropagation();
    event.preventDefault();
    if (this.lastElem) {
      this.callbackClick(this.lastElem!);
    }
  }

  onMouseMoveEvent = (event: MouseEvent): void => {
    const e: Event = event || window.event;
    let target = document.elementFromPoint(event.x, event.y)
    if (target && target instanceof HTMLElement) {
      if (target !== this.lastElem) {
        this.callbackHover(target)
        this.lastElem = target
      }
      e.stopPropagation()
    }
  }

  isActive = (): boolean => {
    return this._isActive;
  }

  activate = (): void => {
    document.addEventListener('click', this.onMouseClickEvent, true);
    document.addEventListener('keydown', this.onKeydownEvent, true);
    document.addEventListener('mousemove', this.onMouseMoveEvent, false);
    this._isActive = true;
  }

  deactivate = (triggerCallback: boolean = true): void => {
    document.removeEventListener('click', this.onMouseClickEvent, true);
    document.removeEventListener('keydown', this.onKeydownEvent, true);
    document.removeEventListener('mousemove', this.onMouseMoveEvent, false);
    if (triggerCallback) {
      this.callbackOnDeactivate();
    }
    this._isActive = false;
  }
}
