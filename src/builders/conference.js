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
        if (!this.featureTypes && !this.label) {
            throw 'Conference must contain a feature and a label'
        }
        return true
    }

    build() {
        if (this.isValid()) {
            let e = 'CONFERENCE;VALUE=URL;'
            if (this.featureTypes && Array.isArray(this.featureTypes)) {
                this.featureTypes.forEach((f) => (e += `FEATURE:${f};\r\n`))
            }
            e += `LABEL:${this.label}\r\n`
            return e
        }
    }
}

module.exports = Conference
