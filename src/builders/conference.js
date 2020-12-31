class Conference {
    constructor(feature, label) {
        this.featureTypes = []
        this.label = label
        if (feature) {
            if (Array.isArray(feature)) {
                for (let i = 0; i < feature.length; i++) {
                    const f = feature[i]
                    this.featureTypes.push(f)
                }
            } else {
                this.featureTypes.push(feature)
            }
        }
    }

    isValid() {
        return this.featureTypes && this.label
    }
}

module.exports = Conference
