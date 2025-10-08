/* extracted <script> block */
(() => {
  const applied = new WeakMap();

  const parseEvents = (s) => {
    if (!s || !s.trim()) return ['init'];
    return s.split(/[,\s|]+/).map(e => e.trim()).filter(Boolean);
  };

  const getOrInit = (map, key, init) => {
    if (!map.has(key)) map.set(key, init instanceof Function ? init() : init);
    return map.get(key);
  };

  window.behavior = {
    _defs: new Map(),      // selector -> Map(event -> [fns])
    _library: new Map(),   // name -> function

    define(name, fn) {
      this._library.set(name, fn);
      return this;
    },

    add(key, fnOrName) {
      const [selector, eventsRaw = 'init'] = key.split('::');
      const events = parseEvents(eventsRaw);
      const byEvent = getOrInit(this._defs, selector, () => new Map());

      events.forEach(evt => {
        const list = getOrInit(byEvent, evt, () => []);
        list.push(fnOrName); // can be string or function
      });
      return this;
    },

    init(root = document) {
      this._defs.forEach((eventsMap, selector) => {
        root.querySelectorAll(selector).forEach(el => {
          let selMapBySelector = applied.get(el);
          if (!selMapBySelector) {
            selMapBySelector = new Map(); // selector -> Set(boundEvents)
            applied.set(el, selMapBySelector);
          }
          const boundEvents = getOrInit(selMapBySelector, selector, () => new Set());

          eventsMap.forEach((fns, evtName) => {
            if (boundEvents.has(evtName)) return;

            const resolvedFns = fns.map(fn => 
              typeof fn === 'string' ? this._library.get(fn) : fn
            ).filter(Boolean);

            if (evtName === 'init' || evtName === 'DOMContentLoaded') {
              resolvedFns.forEach(fn => fn(el));
              boundEvents.add(evtName);
              return;
            }

            resolvedFns.forEach(fn => {
              el.addEventListener(evtName, (e) => fn(el, e));
            });
            boundEvents.add(evtName);
          });
        });
      });
    },

    trigger(selector, evtName, detail = {}) {
      document.querySelectorAll(selector).forEach(el => this.triggerEl(el, evtName, detail));
    },

    triggerEl(el, evtName, detail = {}) {
      const event = new CustomEvent(evtName, { detail, bubbles: true, cancelable: true });
      el.dispatchEvent(event);
    },

    // This makes the behaviours work even for newly added elements
    observeMutations() {
      const observer = new MutationObserver(mutations => {
        mutations.forEach(m => {
          m.addedNodes.forEach(node => {
            if (!(node instanceof HTMLElement)) return;
            this.init(node);
          });
        });
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }
  };

})();

// Initialize behaviors after DOM ready
document.addEventListener('DOMContentLoaded', () => {
behavior.init();
behavior.observeMutations();
});
