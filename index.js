import { LegacyElementMixin } from './lib/legacy/legacy-element-mixin.js';
import './lib/legacy/polymer-fn.js';
import './lib/legacy/templatizer-behavior.js';
import './lib/elements/dom-bind.js';
import './lib/elements/dom-repeat.js';
import './lib/elements/dom-if.js';
import './lib/elements/array-selector.js';
import './lib/elements/custom-style.js';
import './lib/legacy/mutable-data-behavior.js';
const most = require('most')
const bluebird = require('bluebird')

//No NEW
class Nils {
  constructor(){
    this.stream = most;
    this.promise = bluebird;
    import { ElementMixin } from './lib/mixins/element-mixin.js';

    /**
     * Base class that provides the core API for Polymer's meta-programming
     * features including template stamping, data-binding, attribute deserialization,
     * and property change observation.
     *
     * @customElement
     * @polymer
     * @memberof Polymer
     * @constructor
     * @implements {Polymer_ElementMixin}
     * @extends HTMLElement
     * @appliesMixin Polymer.ElementMixin
     * @summary Custom element base class that provides the core API for Polymer's
     *   key meta-programming features including template stamping, data-binding,
     *   attribute deserialization, and property change observation
     */
    this.PolymerElement = ElementMixin(HTMLElement);
    this.PolymerElementLegacy = LegacyElementMixin(HTMLElement).prototype;
  }
  // Get a Babel Compatible Nativ Browser Element
  babelElement(BROWSERElement) {
    function BabelHTMLElement(){
      const newTarget = this.__proto__.constructor;
      return Reflect.construct(BROWSERElement, [], newTarget);
    }
    Object.setPrototypeOf(BabelBROWSERElement, BROWSERElement);
    Object.setPrototypeOf(BabelBROWSERElement.prototype, BROWSERElement.prototype);
  }
  // create component
  // take a existing component and combine them
  // else return new
  createComponent(component = most.empty()) {
    //bindings is stream of bindings to apply to this view
    //a component without bindings is in general a data Component
    return component
  }
  // Attach view to viewModel
  renderWithMustache(component) {
   let templateStream = most.of(Mustache.render("{{title}} spends {{calc}} <subTemplate>", component.viewModel))
   component.view = templateStream
                .map((html)=>html.replace('<subTemplates>',Mustache.render("{{title}} spended sub this {{calc}} <subTemplate>", viewModel)))
   //subTemplates replace a tag inside template with rendered data
   return component
  }
  // component === { view, viewModel, bindings}
  getDOMdiff(component) {
    component.diff = ''
    return component
  }
  //gets returned after DOM is rendered
  //don't emit twice
  //takes state of a component and attaches realTime bindings to values
  attachBindings(component) {
    // Look if already binded else bind
    return Component.of(component)
      .combineArray((observed)=>observed,[
        Component.fromInput(document.querySelector('input.x'))
        .map((val)=>{
          return { data: val }
        }),
        Component.fromInput(document.querySelector('input.x'))
        .map((val)=>{
          return { name: val }
        })
      ])
      .loop((lastSetValue, setValue) => {
        // deep merge lastSetValue setValue
       	return { seed: values, value: setValue };
      }, {}) // Returns Data From inputs
      .map((component)=>this.renderWithMustache(component))
      .map((component)=>this.getDOMdiff(component))
      .map((component)=>{
        component.diff.apply()
        return component
      })
  }
}

module.exports = new Nils()
