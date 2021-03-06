const React = require('react');

module.exports = {
    propTypes: {
        hRestrict: React.PropTypes.bool,
        vRestrict: React.PropTypes.bool,
        relatedTo: React.PropTypes.func
    },

    position: "",

    getDefaultProps() {
        return {
            hRestrict: false,
            vRestrict: false
        };
    },

    componentDidMount() {
        this._updatePosition();
        window.addEventListener("resize", this._onWindowResize);
        //window.addEventListener("wheel", this._onWindowScroll)
    },

    componentDidUpdate() {
        this._updatePosition();
    },

    componentWillUnmount() {
        window.removeEventListener("resize", this._onWindowResize);
        //window.removeEventListener("wheel", this._onWindowScroll)
    },

    _onWindowResize() {
        this._updatePosition();
    },

    _onWindowScroll() {
        this._updatePosition();
    },

    _updatePosition() {
        let base = null;

        let {
            hRestrict,
            relatedTo
        } = this.props;

        if (relatedTo && typeof relatedTo === "function") {
            base = relatedTo();
        }

        if (base) {
            let self = this.getDOMNode();
            let baseDOM = base.getDOMNode();
            let baseRect = baseDOM.getBoundingClientRect();

            // Window client size
            let innerWidth = document.body.clientWidth; //window.innerWidth;
            let innerHeight = document.body.clientHeight; //window.innerHeight;

            let baseTop = baseRect.top;
            let baseLeft = baseRect.left;
            let baseRight = baseRect.right;
            let baseBottom = baseRect.bottom;
            let baseHeight = baseRect.height;

            let selfWidth = self.offsetWidth;
            let selfHeight = self.offsetHeight;

            let selfTop = 0;
            let selfLeft = null;
            let selfRight = null;

            if (innerHeight - baseBottom - selfHeight >= 0) {
                selfTop = baseTop + baseHeight;
                this.position = "bottom";
            } else if (baseTop - selfHeight >= 0) {
                selfTop = baseTop - selfHeight;
                this.position = "top";
            }

            if (innerWidth - baseRight - selfWidth >= 0) {
                selfLeft = baseLeft;
                if (hRestrict) {
                    selfRight = innerWidth - baseRight;
                }
            } else if (baseRight - selfWidth >= 0) {
                selfRight = innerWidth - baseRight;
                if (hRestrict) {
                    selfLeft = baseLeft;
                }
            }

            self.style.position = "fixed";
            self.style.zIndex = "1000";
            self.style.top = selfTop + "px";

            if (selfLeft) {
                self.style.left = selfLeft + "px";
            } else {
                self.style.left = "auto";
            }

            if (selfRight) {
                self.style.right = selfRight + "px";
            } else {
                self.style.right = "auto";
            }
        }
    }
};