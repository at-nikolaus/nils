function BabelHTMLElement(){
  const newTarget = this.__proto__.constructor;
  return Reflect.construct(HTMLElement, [], newTarget);
}
Object.setPrototypeOf(BabelHTMLElement, HTMLElement);
Object.setPrototypeOf(BabelHTMLElement.prototype, HTMLElement.prototype);
export class nilsImport extends BabelHTMLElement {
  constructor() {
    super()
    this.done = false
  }
  adoptedCallback(oldDocument, newDocument) {
    console.log(oldDocument, newDocument)
    const newWindow = newDocument.defaultView;
    if (newWindow) {
      // newDocument belongs to a window
      const otherConstructor = newWindow.customElements.get(this.localName);

      if (otherConstructor && otherConstructor._isFromPolymer) {
        Object.setPrototypeOf(this, otherConstructor.prototype);

        // Now any customizations that newWindow code has applied to the
        // prototype will apply over here.
      }
    }
  }
  connectedCallback() {
    let section = this.getAttribute('section') || 'head'
    let target = this.getAttribute('target') || 'window'

    let finalTarget
    if (target === 'window') {
      finalTarget = window.document[section].innerHTML
      if (finalTarget.indexOf(this.innerHTML) === -1) {
        window.document[section].innerHTML += this.innerHTML;
      }
    } else {
      finalTarget = document[section].innerHTML
      if (finalTarget.indexOf(this.innerHTML) === -1) {
        document[section].innerHTML += this.innerHTML;
      }
    }
  }
  appendImportingDocHead(section){
    document[section].innerHTML = this.innerHTML
  }
}

customElements.define('nils-import', nilsImport);
