const toStorage = (value, values, lang) => {
    const pinnedValues_ = {...values};
    const unfiltered = [...Object.values(pinnedValues_)];
    const items = unfiltered.length;
    const max = 5;
    const pins = unfiltered.filter((pin) => {
        return pin !== null;
    });
    function setPinnedItems() {
        for (let i = 0; i < items; i += 1) {
            if (pins[i]) {
                pinnedValues_['val' + i] = pins[i];
            } else pinnedValues_['val' + i] = null;
        }
        localStorage.setItem('pinned', JSON.stringify(pinnedValues_));
    }
    return {
        add: function() {
            if (this.full()) return;
            pins.push(value);
            setPinnedItems();
            return pinnedValues_;
        },
        remove: function() {
            const index = this.has(true);
            pins.splice(index, 1);
            setPinnedItems();
            return pinnedValues_;
        },
        has: function(index=false) {
            for (let i = 0; i < unfiltered.length; i += 1) {
                const pin = unfiltered[i];
                if (pin && [pin.en, pin.ru, pin.by].includes(value[lang])) {
                    return index ? i : true;
                }
            }
            return false;
        },
        full: function() {
            if (pins.length < max) return false;
            return true;
        }
    };
}


export default toStorage;