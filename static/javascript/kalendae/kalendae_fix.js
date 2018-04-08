(function(i) {
    var w, l, r = function(a, b) {
        if ("function" === typeof document.addEventListener || d.isIE8()) {
            var e = !1;
            try {
                e = a instanceof Element
            } catch(n) {
                e = !!a && 1 === e.nodeType
            }
            e || "string" === typeof a || (b = a);
            var f = this,
            g = f.classes,
            k = f.settings = d.merge(f.defaults, {
                attachTo: a
            },
            b || {}),
            e = f.container = d.make("div", {
                "class": g.container
            }),
            r = f.calendars = [],
            p = l().day(k.weekStart),
            u,
            v = [],
            m,
            q,
            B,
            w;
            m = [];
            var D;
            q = 0;
            u = k.months;
            d.isIE8() && d.addClassName(e, "ie8");
            for (q = 7; q--;) v.push(p.format(k.columnHeaderFormat)),
            p.add("days", 1);
            F(f);
            if ("object" === typeof k.subscribe) for (q in k.subscribe) k.subscribe.hasOwnProperty(q) && f.subscribe(q, k.subscribe[q]);
            f._sel = [];
            k.selected && f.setSelected(k.selected, !1);
            u = k.viewStartDate ? l(k.viewStartDate, k.format) : 0 < f._sel.length ? l(f._sel[0]) : l();
            f.viewStartDate = u.date(1); (u = {
                past: k.months - 1,
                "today-past": k.months - 1,
                any: 2 < k.months ? Math.floor(k.months / 2) : 0,
                "today-future": 0,
                future: 0
            } [this.settings.direction]) && l().month() == l(f.viewStartDate).month() && (f.viewStartDate = l(f.viewStartDate).subtract({
                M: u
            }).date(1));
            if ("function" === typeof k.blackout) f.blackout = k.blackout;
            else if (k.blackout) {
                var C = z(k.blackout, k.parseSplitDelimiter, k.format);
                f.blackout = function(a) {
                    a = l(a).startOf("day").yearDay();
                    if (1 > a || !f._sel) return ! 1;
                    for (var e = C.length; e--;) if (C[e].startOf("day").yearDay() === a) return ! 0;
                    return ! 1
                }
            } else f.blackout = function() {
                return ! 1
            };
            f.direction = f.directions[k.direction] ? f.directions[k.direction] : f.directions.any;
            for (u = Math.max(k.months, 1); u--;) {
                m = d.make("div", {
                    "class": g.calendar
                },
                e);
                m.setAttribute("data-cal-index", u);
                1 < k.months && (u == Math.max(k.months - 1, 1) ? d.addClassName(m, g.monthFirst) : 0 === u ? d.addClassName(m, g.monthLast) : d.addClassName(m, g.monthMiddle));
                q = d.make("div", {
                    "class": g.title
                },
                m);
                k.useYearNav || d.addClassName(q, g.disableYearNav);
                d.make("a", {
                    "class": g.previousYear
                },
                q);
                d.make("a", {
                    "class": g.previousMonth
                },
                q);
                d.make("a", {
                    "class": g.nextYear
                },
                q);
                d.make("a", {
                    "class": g.nextMonth
                },
                q);
                p = d.make("span", {
                    "class": g.caption
                },
                q);
                B = d.make("div", {
                    "class": g.header
                },
                m);
                q = 0;
                do D = d.make("span", {},
                B),
                D.innerHTML = v[q];
                while (7 > ++q);
                B = d.make("div", {
                    "class": g.days
                },
                m);
                q = 0;
                m = [];
                do "week" == k.mode ? (0 === q % 7 && (w = d.make("div", {
                    "class": g.week + " clearfix"
                },
                B), m.push(w)), d.make("span", {},
                w)) : m.push(d.make("span", {},
                B));
                while (42 > ++q);
                r.push({
                    caption: p,
                    days: m
                });
                u && d.make("div", {
                    "class": g.monthSeparator
                },
                e)
            }
            f.draw();
            d.addEvent(e, "mousedown",
            function(a, e) {
                var b;
                if (d.hasClassName(e, g.nextMonth)) f.disableNext || !1 === f.publish("view-changed", f, ["next-month"]) || (f.viewStartDate.add("months", 1), f.draw());
                else if (d.hasClassName(e, g.previousMonth)) f.disablePreviousMonth || !1 === f.publish("view-changed", f, ["previous-month"]) || (f.viewStartDate.subtract("months", 1), f.draw());
                else if (d.hasClassName(e, g.nextYear)) f.disableNext || !1 === f.publish("view-changed", f, ["next-year"]) || (f.viewStartDate.add("years", 1), f.draw());
                else if (d.hasClassName(e, g.previousYear)) f.disablePreviousMonth || !1 === f.publish("view-changed", f, ["previous-year"]) || (f.viewStartDate.subtract("years", 1), f.draw());
                else if ((d.hasClassName(e.parentNode, g.days) || d.hasClassName(e.parentNode, g.week)) && d.hasClassName(e, g.dayActive) && (b = e.getAttribute("data-date"))) {
                    if (b = l(b, k.dayAttributeFormat).hours(12), !1 !== f.publish("date-clicked", f, [b])) switch (k.mode) {
                    case "multiple":
                        f.addSelected(b) || f.removeSelected(b);
                        break;
                    case "range":
                        f.addSelected(b);
                        break;
                    case "week":
                        f.weekSelected(b);
                        break;
                    default:
                        f.addSelected(b)
                    }

					if (typeof opts.dayclick === 'function') {
						opts.dayclick();
					}
                } else d.hasClassName(e.parentNode, g.week) && (b = e.getAttribute("data-date")) && (b = l(b, k.dayAttributeFormat).hours(12), !1 !== f.publish("date-clicked", f, [b]) && "week" == k.mode && f.weekSelected(b));
                return ! 1
            }); (k.attachTo = d.$(k.attachTo)) && k.attachTo.appendChild(e)
        }
    };
    r.prototype = {
        defaults: {
            attachTo: null,
            months: 1,
            weekStart: 0,
            direction: "any",
            directionScrolling: !0,
            viewStartDate: null,
            blackout: null,
			dayclick:null,
            selected: null,
            mode: "single",
            dayOutOfMonthClickable: !1,
            format: null,
            subscribe: null,
            columnHeaderFormat: "dd",
            titleFormat: "MMMM, YYYY",
            dayNumberFormat: "D",
            dayAttributeFormat: "YYYY-MM-DD",
            parseSplitDelimiter: /,\s*|\s+-\s+/,
            rangeDelimiter: " - ",
            multipleDelimiter: ", ",
			range_type            :null,
            useYearNav: !0,
            dateClassMap: {}
        },
        classes: {
            container: "kalendae",
            calendar: "k-calendar",
            monthFirst: "k-first-month",
            monthMiddle: "k-middle-month",
            monthLast: "k-last-month",
            title: "k-title",
            previousMonth: "k-btn-previous-month",
            nextMonth: "k-btn-next-month",
            previousYear: "k-btn-previous-year",
            nextYear: "k-btn-next-year",
            caption: "k-caption",
            header: "k-header",
            days: "k-days",
            week: "k-week",
            dayOutOfMonth: "k-out-of-month",
            dayInMonth: "k-in-month",
            dayActive: "k-active",
            daySelected: "k-selected",
            dayInRange: "k-range",
            dayToday: "k-today",
            monthSeparator: "k-separator",
            disablePreviousMonth: "k-disable-previous-month-btn",
            disableNextMonth: "k-disable-next-month-btn",
            disablePreviousYear: "k-disable-previous-year-btn",
            disableNextYear: "k-disable-next-year-btn",
            disableYearNav: "k-disable-year-nav"
        },
        disablePreviousMonth: !1,
        disableNextMonth: !1,
        disablePreviousYear: !1,
        disableNextYear: !1,
        directions: {
            past: function(a) {
                return l(a).startOf("day").yearDay() >= w.yearDay()
            },
            "today-past": function(a) {
                return l(a).startOf("day").yearDay() > w.yearDay()
            },
            any: function(a) {
                return ! 1
            },
            "today-future": function(a) {
                return l(a).startOf("day").yearDay() < w.yearDay()
            },
            future: function(a) {
                return l(a).startOf("day").yearDay() <= w.yearDay()
            }
        },
        getSelectedAsDates: function() {
            for (var a = [], b = 0, e = this._sel.length; b < e; b++) a.push(this._sel[b].toDate());
            return a
        },
        getSelectedAsText: function(a) {
            for (var b = [], e = 0, d = this._sel.length; e < d; e++) b.push(this._sel[e].format(a || this.settings.format || "YYYY-MM-DD"));
            return b
        },
        getSelectedRaw: function() {
            for (var a = [], b = 0, e = this._sel.length; b < e; b++) a.push(l(this._sel[b]));
            return a
        },
        getSelected: function(a) {
            a = this.getSelectedAsText(a);
            switch (this.settings.mode) {
            case "week":
            case "range":
                return a.splice(2),
                a.join(this.settings.rangeDelimiter);
            case "multiple":
                return a.join(this.settings.multipleDelimiter);
            default:
                return a[0] || null
            }
        },
        isSelected: function(a) {
            a = l(a).startOf("day").yearDay();
            if (1 > a || !this._sel || 1 > this._sel.length) return ! 1;
            switch (this.settings.mode) {
            case "week":
            case "range":
                var b = this._sel[0] ? this._sel[0].startOf("day").yearDay() : 0,
                e = this._sel[1] ? this._sel[1].startOf("day").yearDay() : 0;
                return b === a || e === a ? 1 : b && e ? a > b && a < e || b < e && a < b && a > e ? -1 : !1 : 0;
            case "multiple":
                for (b = this._sel.length; b--;) if (this._sel[b].startOf("day").yearDay() === a) return ! 0;
                return ! 1;
            default:
                return this._sel[0] && this._sel[0].startOf("day").yearDay() === a
            }
        },
        setSelected: function(a, b) {
            var e, d = z(a, this.settings.parseSplitDelimiter, this.settings.format),
            f = z(this.getSelected(), this.settings.parseSplitDelimiter, this.settings.format);
            for (e = f.length; e--;) this.removeSelected(f[e], !1);
            for (e = d.length; e--;) this.addSelected(d[e], !1); ! 1 !== b && (d[0] && (this.viewStartDate = l(d[0], this.settings.format)), this.draw())
        },
        addSelected: function(a, b) {
            a = l(a, this.settings.format).hours(12);
            this.settings.dayOutOfMonthClickable && "range" !== this.settings.mode && this.makeSelectedDateVisible(a);
            switch (this.settings.mode) {
            case "multiple":
                if (this.isSelected(a)) return ! 1;
                this._sel.push(a);
                break;
            case "range":
                

				if(this.settings.range_type == this.settings.range_begin)
				{
					this._sel[0] = a;
				}else if(this.settings.range_type == this.settings.range_end)
				{
					if (this._sel.length !== 1) 
					{
						this._sel = [a,a];
					}else {
						this._sel[1] = a;
					}
				}else{
					1 !== this._sel.length ? this._sel = [a] : a.startOf("day").yearDay() > this._sel[0].startOf("day").yearDay() ? this._sel[1] = a: this._sel = [a, this._sel[0]];
				}

                break;
            default:
                this._sel = [a]
            }
            this._sel.sort(function(a, b) {
                return a.startOf("day").yearDay() - b.startOf("day").yearDay()
            });
            this.publish("change", this, [a]); ! 1 !== b && this.draw();
            return ! 0
        },
        weekSelected: function(a) {
            var b = a.toDate(),
            e = l(b).startOf("week"),
            b = l(b).endOf("week").subtract("day", 1);
            this._sel = [e, b];
            this.publish("change", this, [a.day()]);
            this.draw()
        },
        makeSelectedDateVisible: function(a) {
            outOfViewMonth = l(a).date("1").diff(this.viewStartDate, "months");
            0 > outOfViewMonth ? this.viewStartDate.subtract("months", 1) : 0 < outOfViewMonth && outOfViewMonth >= this.settings.months && this.viewStartDate.add("months", 1)
        },
        removeSelected: function(a, b) {
            a = l(a, this.settings.format).hours(12);
            for (var e = this._sel.length; e--;) if (this._sel[e].startOf("day").yearDay() === a.startOf("day").yearDay()) return this._sel.splice(e, 1),
            this.publish("change", this, [a]),
            !1 !== b && this.draw(),
            !0;
            return ! 1
        },
        draw: function() {
            var a = l(this.viewStartDate).startOf("day").hours(12),
            b,
            e = this.classes,
            n,
            f,
            g,
            k = 0,
            r,
            p = 0,
            u,
            v,
            m = this.settings;
            r = this.calendars.length;
            do {
                b = l(a).date(1);
                b.day(b.day() < this.settings.weekStart ? this.settings.weekStart - 7 : this.settings.weekStart);
                n = this.calendars[k];
                n.caption.innerHTML = a.format(this.settings.titleFormat);
                u = p = 0;
                do "week" == m.mode ? (0 === p % 7 && 0 !== p && u++, f = n.days[u].childNodes[p % 7]) : f = n.days[p], g = [], (v = this.isSelected(b)) && g.push({
                    "-1": e.dayInRange,
                    1 : e.daySelected,
                    "true": e.daySelected
                } [v]), b.month() != a.month() ? g.push(e.dayOutOfMonth) : g.push(e.dayInMonth), (!(this.blackout(b) || this.direction(b) || b.month() != a.month() && !1 === m.dayOutOfMonthClickable) || 0 < v) && g.push(e.dayActive), b.startOf("day").yearDay() === w.yearDay() && g.push(e.dayToday), v = b.format(this.settings.dayAttributeFormat), m.dateClassMap[v] && g.push(m.dateClassMap[v]), f.innerHTML = b.format(m.dayNumberFormat), f.className = g.join(" "), f.setAttribute("data-date", v), b.add("days", 1);
                while (42 > ++p);
                a.add("months", 1)
            } while (++ k < r );
            if (m.directionScrolling) {
                b = l().startOf("day").hours(12);
                a = a.diff(b, "months", !0);
                if ("today-past" === m.direction || "past" === m.direction) 0 >= a ? (this.disableNextMonth = !1, d.removeClassName(this.container, e.disableNextMonth)) : (this.disableNextMonth = !0, d.addClassName(this.container, e.disableNextMonth));
                else if ("today-future" === m.direction || "future" === m.direction) a > m.months ? (this.disablePreviousMonth = !1, d.removeClassName(this.container, e.disablePreviousMonth)) : (this.disablePreviousMonth = !0, d.addClassName(this.container, e.disablePreviousMonth));
                if ("today-past" === m.direction || "past" === m.direction) - 11 >= a ? (this.disableNextYear = !1, d.removeClassName(this.container, e.disableNextYear)) : (this.disableNextYear = !0, d.addClassName(this.container, e.disableNextYear));
                else if ("today-future" === m.direction || "future" === m.direction) a > 11 + m.months ? (this.disablePreviousYear = !1, d.removeClassName(this.container, e.disablePreviousYear)) : (this.disablePreviousYear = !0, d.addClassName(this.container, e.disablePreviousYear))
            }
        }
    };
    var z = function(a, b, e) {
        var n = [];
        "string" === typeof a ? a = a.split(b) : d.isArray(a) || (a = [a]);
        b = a.length;
        var f = 0,
        g;
        do a[f] && (g = l(a[f], e).hours(12), g.isValid() && n.push(g));
        while (++f < b);
        return n
    };
    window.Kalendae = r;
    var d = r.util = {
        isIE8: function() {
            return ! (!/msie 8./i.test(navigator.appVersion) || /opera/i.test(navigator.userAgent) || !window.ActiveXObject || !XDomainRequest || window.msPerformance)
        },
        $: function(a) {
            return "string" == typeof a ? document.getElementById(a) : a
        },
        $$: function(a) {
            return document.querySelectorAll(a)
        },
        make: function(a, b, e) {
            var d;
            a = document.createElement(a);
            if (b) for (d in b) b.hasOwnProperty(d) && a.setAttribute(d, b[d]);
            e && e.appendChild(a);
            return a
        },
        isVisible: function(a) {
            return 0 < a.offsetWidth || 0 < a.offsetHeight
        },
        getStyle: function(a, b) {
            var e;
            a.currentStyle ? e = a.currentStyle[b] : window.getComputedStyle && (e = (e = window.getComputedStyle(a, null)) ? e[b] : "");
            return e
        },
        domReady: function(a) {
            var b = document.readyState;
            "complete" === b || "interactive" === b ? a() : setTimeout(function() {
                d.domReady(a)
            },
            9)
        },
        addEvent: function(a, b, e) {
            var d = function(b) {
                b = b || window.event;
                var d = e.apply(a, [b, b.target || b.srcElement]); ! 1 === d && (b.preventDefault ? b.preventDefault() : (b.returnValue = !1, b.cancelBubble = !0));
                return d
            };
            a.attachEvent ? a.attachEvent("on" + b, d) : a.addEventListener(b, d, !1);
            return d
        },
        removeEvent: function(a, b, e) {
            a.detachEvent ? a.detachEvent("on" + b, e) : a.removeEventListener(b, e, !1)
        },
        fireEvent: function(a, b) {
            if (document.createEvent) {
                var e = document.createEvent("HTMLEvents");
                e.initEvent(b, !1, !0);
                a.dispatchEvent(e)
            } else if (document.createEventObject) a.fireEvent("on" + b);
            else if ("function" == typeof a["on" + b]) a["on" + b]()
        },
        hasClassName: function(a, b) {
            if (! (a = d.$(a))) return ! 1;
            var e = a.className;
            return 0 < e.length && (e == b || RegExp("(^|\\s)" + b + "(\\s|$)").test(e))
        },
        addClassName: function(a, b) { (a = d.$(a)) && !d.hasClassName(a, b) && (a.className += (a.className ? " ": "") + b)
        },
        removeClassName: function(a, b) {
            if (a = d.$(a)) a.className = d.trimString(a.className.replace(RegExp("(^|\\s+)" + b + "(\\s+|$)"), " "))
        },
        isFixed: function(a) {
            do
            if ("fixed" === d.getStyle(a, "position")) return ! 0;
            while (a = a.offsetParent);
            return ! 1
        },
        scrollContainer: function(a) {
            do {
                var b = d.getStyle(a, "overflow");
                if ("auto" === b || "scroll" === b) return a
            } while (( a = a . parentNode ) && a != window.document.body);
            return null
        },
        getPosition: function(a, b) {
            var e = a.offsetLeft,
            d = a.offsetTop,
            f = {};
            if (!b) for (; a = a.offsetParent;) e += a.offsetLeft,
            d += a.offsetTop;
            f[0] = f.left = e;
            f[1] = f.top = d;
            return f
        },
        getHeight: function(a) {
            return a.offsetHeight || a.scrollHeight
        },
        getWidth: function(a) {
            return a.offsetWidth || a.scrollWidth
        },
        trimString: function(a) {
            return a.replace(/^\s+/, "").replace(/\s+$/, "")
        },
        merge: function() {
            for (var a = !0 === arguments[0], b = {},
            e = a ? 1 : 0; e < arguments.length; e++) {
                var d = b,
                f = arguments[e];
                if ("object" === typeof f) {
                    var g = void 0;
                    for (g in f) f.hasOwnProperty(g) && (a && "object" === typeof d[g] && "object" === typeof f[g] ? _update(d[g], f[g]) : d[g] = f[g])
                }
            }
            return b
        },
        isArray: function(a) {
            return "[object Array]" == Object.prototype.toString.call(a)
        }
    };
    "function" === typeof document.addEventListener && r.util.domReady(function() {
        for (var a = d.$$(".auto-kal"), b = a.length, e, n; b--;) e = a[b],
        n = e.getAttribute("data-kal"),
        n = null == n || "" == n ? {}: (new Function("return {" + n + "};"))(),
        "INPUT" === e.tagName ? new r.Input(e, n) : new r(d.merge(n, {
            attachTo: e
        }))
    });
    r.Input = function(a, b) {
        if ("function" === typeof document.addEventListener || d.isIE8()) {
            var e = this.input = d.$(a),
            n,
            f,
            g = !1;
            if (!e || "INPUT" !== e.tagName) throw "First argument for Kalendae.Input must be an <input> element or a valid element id.";
            var k = this,
            l = k.classes;
            f = k.settings = d.merge(k.defaults, b);
            this._events = {};
            f.attachTo = window.document.body;
            f.selected ? n = !0 : f.selected = e.value;
            r.call(k, f);
            f.closeButton && (f = d.make("a", {
                "class": l.closeButton
            },
            k.container), d.addEvent(f, "click",
            function() {
                e.blur()
            }));
            n && (e.value = k.getSelected());
            n = k.container;
            var p = !1;
            n.style.display = "none";
            d.addClassName(n, l.positioned);
            this._events.containerMouseDown = d.addEvent(n, "mousedown",
            function(a, b) {
                p = !0
            });
            this._events.documentMousedown = d.addEvent(window.document, "mousedown",
            function(a, b) {
                p = !1
            });
            this._events.inputFocus = d.addEvent(e, "focus",
            function() {
                g = !0;
                k.setSelected(this.value);
                g = !1;
                k.show()
            });
            this._events.inputBlur = d.addEvent(e, "blur",
            function() {
                p && d.isIE8() ? (p = !1, e.focus()) : k.hide()
            });
            this._events.inputKeyup = d.addEvent(e, "keyup",
            function(a) {
                g = !0;
                k.setSelected(this.value);
                g = !1
            }); (l = d.scrollContainer(e)) && d.addEvent(l, "scroll",
            function(a) {
                e.blur()
            });
            k.subscribe("change",
            function() {
                g || (e.value = k.getSelected(), d.fireEvent(e, "change"))
            })
        }
    };
    r.Input.prototype = d.merge(r.prototype, {
        defaults: d.merge(r.prototype.defaults, {
            format: "MM/DD/YYYY",
            side: "bottom",
            closeButton: !0,
            offsetLeft: 0,
            offsetTop: 0
        }),
        classes: d.merge(r.prototype.classes, {
            positioned: "k-floating",
            closeButton: "k-btn-close"
        }),
        show: function(obj = this.input,range_type = null) {
			
            var a = this.container,
            b = a.style,
            //e = this.input,
			e = obj,
            n = d.getPosition(e),
            f = d.scrollContainer(e),
            f = f ? f.scrollTop: 0,
            g = this.settings;
			//this.settings.range_type = range_type;
            b.display = "";
            switch (g.side) {
            case "left":
                b.left = n.left - d.getWidth(a) + g.offsetLeft + "px";
                b.top = n.top + g.offsetTop - f + "px";
                break;
            case "right":
                b.left = n.left + d.getWidth(e) + "px";
                b.top = n.top + g.offsetTop - f + "px";
                break;
            case "top":
                b.left = n.left + g.offsetLeft + "px";
                b.top = n.top - d.getHeight(a) + g.offsetTop - f + "px";
                break;
            default:
                b.left = n.left + g.offsetLeft + "px",
                b.top = n.top + d.getHeight(e) + g.offsetTop - f + "px"
            }
            b.position = d.isFixed(e) ? "fixed": "absolute";
            this.publish("show", this)
        },
        hide: function() {
            this.container.style.display = "none";
            this.publish("hide", this)
        },
        destroy: function() {
            var a = this.container,
            b = this.input;
            d.removeEvent(a, "mousedown", this._events.containerMousedown);
            d.removeEvent(window.document, "mousedown", this._events.documentMousedown);
            d.removeEvent(b, "focus", this._events.inputFocus);
            d.removeEvent(b, "blur", this._events.inputBlur);
            d.removeEvent(b, "keyup", this._events.inputKeyup);
            a.remove()
        }
    });
    var F = function(a) {
        a || (a = this);
        var b = a.c_ || {};
        a.publish = function(a, d, f) {
            for (var g = (a = b[a]) ? a.length: 0, k; g--;) if (k = a[g].apply(d, f || []), "boolean" === typeof k) return k
        };
        a.subscribe = function(a, d, f) {
            b[a] || (b[a] = []);
            f ? b[a].push(d) : b[a].unshift(d);
            return [a, d]
        };
        a.unsubscribe = function(a) {
            var d = b[a[0]];
            a = a[1];
            for (var f = d ? d.length: 0; f--;) d[f] === a && d.splice(f, 1)
        }
    }; (function(a) {
        function b(c, s) {
            return function(a) {
                return p(c.call(this, a), s)
            }
        }
        function e(c, s) {
            return function(a) {
                return this.lang().ordinal(c.call(this, a), s)
            }
        }
        function d() {}
        function f(c) {
            k(this, c)
        }
        function g(c) {
            var s = c.years || c.year || c.y || 0,
            a = c.months || c.month || c.M || 0,
            b = c.weeks || c.week || c.w || 0,
            e = c.days || c.day || c.d || 0,
            d = c.hours || c.hour || c.h || 0,
            f = c.minutes || c.minute || c.m || 0,
            h = c.seconds || c.second || c.s || 0,
            g = c.milliseconds || c.millisecond || c.ms || 0;
            this._input = c;
            this._milliseconds = g + 1E3 * h + 6E4 * f + 36E5 * d;
            this._days = e + 7 * b;
            this._months = a + 12 * s;
            this._data = {};
            this._bubble()
        }
        function k(c, s) {
            for (var a in s) s.hasOwnProperty(a) && (c[a] = s[a]);
            return c
        }
        function l(c) {
            return 0 > c ? Math.ceil(c) : Math.floor(c)
        }
        function p(c, s) {
            for (var a = c + ""; a.length < s;) a = "0" + a;
            return a
        }
        function r(c, s, a, b) {
            var e = s._milliseconds,
            d = s._days;
            s = s._months;
            var f, g;
            e && c._d.setTime( + c._d + e * a);
            if (d || s) f = c.minute(),
            g = c.hour();
            d && c.date(c.date() + d * a);
            s && c.month(c.month() + s * a);
            e && !b && h.updateOffset(c);
            if (d || s) c.minute(f),
            c.hour(g)
        }
        function v(c, s) {
            var a = Math.min(c.length, s.length),
            b = Math.abs(c.length - s.length),
            e = 0,
            d;
            for (d = 0; d < a; d++)~~c[d] !== ~~s[d] && e++;
            return e + b
        }
        function m(c) {
            return c ? V[c] || c.toLowerCase().replace(/(.)s$/, "$1") : c
        }
        function q(c) {
            if (!c) return h.fn._lang;
            if (!A[c] && M) try {
                require("./lang/" + c)
            } catch(a) {
                return h.fn._lang
            }
            return A[c]
        }
        function w(c) {
            var a = c.match(N),
            b,
            e;
            b = 0;
            for (e = a.length; b < e; b++) a[b] = x[a[b]] ? x[a[b]] : a[b].match(/\[.*\]/) ? a[b].replace(/^\[|\]$/g, "") : a[b].replace(/\\/g, "");
            return function(d) {
                var f = "";
                for (b = 0; b < e; b++) f += a[b] instanceof Function ? a[b].call(d, c) : a[b];
                return f
            }
        }
        function z(c, a) {
            function b(a) {
                return c.lang().longDateFormat(a) || a
            }
            for (var e = 5; e--&&O.test(a);) a = a.replace(O, b);
            H[a] || (H[a] = w(a));
            return H[a](c)
        }
        function D(c, a) {
            switch (c) {
            case "DDDD":
                return W;
            case "YYYY":
                return X;
            case "YYYYY":
                return Y;
            case "S":
            case "SS":
            case "SSS":
            case "DDD":
                return Z;
            case "MMM":
            case "MMMM":
            case "dd":
            case "ddd":
            case "dddd":
                return aa;
            case "a":
            case "A":
                return q(a._l)._meridiemParse;
            case "X":
                return ba;
            case "Z":
            case "ZZ":
                return I;
            case "T":
                return ca;
            case "MM":
            case "DD":
            case "YY":
            case "HH":
            case "hh":
            case "mm":
            case "ss":
            case "M":
            case "D":
            case "d":
            case "H":
            case "h":
            case "m":
            case "s":
                return da;
            default:
                return RegExp(c.replace("\\", ""))
            }
        }
        function C(c) {
            c = ((I.exec(c) || [])[0] + "").match(ea) || ["-", 0, 0];
            var a = +(60 * c[1]) + ~~c[2];
            return "+" === c[0] ? -a: a
        }
        function L(c) {
            var a, b = [];
            if (!c._d) {
                for (a = 0; 7 > a; a++) c._a[a] = b[a] = null == c._a[a] ? 2 === a ? 1 : 0 : c._a[a];
                b[3] += ~~ ((c._tzm || 0) / 60);
                b[4] += ~~ ((c._tzm || 0) % 60);
                a = new Date(0);
                c._useUTC ? (a.setUTCFullYear(b[0], b[1], b[2]), a.setUTCHours(b[3], b[4], b[5], b[6])) : (a.setFullYear(b[0], b[1], b[2]), a.setHours(b[3], b[4], b[5], b[6]));
                c._d = a
            }
        }
        function G(c) {
            var a = c._f.match(N),
            b = c._i,
            e,
            d;
            c._a = [];
            for (e = 0; e < a.length; e++) if ((d = (D(a[e], c).exec(b) || [])[0]) && (b = b.slice(b.indexOf(d) + d.length)), x[a[e]]) {
                var f = c,
                h = void 0,
                g = f._a;
                switch (a[e]) {
                case "M":
                case "MM":
                    g[1] = null == d ? 0 : ~~d - 1;
                    break;
                case "MMM":
                case "MMMM":
                    h = q(f._l).monthsParse(d);
                    null != h ? g[1] = h: f._isValid = !1;
                    break;
                case "D":
                case "DD":
                case "DDD":
                case "DDDD":
                    null != d && (g[2] = ~~d);
                    break;
                case "YY":
                    g[0] = ~~d + (68 < ~~d ? 1900 : 2E3);
                    break;
                case "YYYY":
                case "YYYYY":
                    g[0] = ~~d;
                    break;
                case "a":
                case "A":
                    f._isPm = q(f._l).isPM(d);
                    break;
                case "H":
                case "HH":
                case "h":
                case "hh":
                    g[3] = ~~d;
                    break;
                case "m":
                case "mm":
                    g[4] = ~~d;
                    break;
                case "s":
                case "ss":
                    g[5] = ~~d;
                    break;
                case "S":
                case "SS":
                case "SSS":
                    g[6] = ~~ (1E3 * ("0." + d));
                    break;
                case "X":
                    f._d = new Date(1E3 * parseFloat(d));
                    break;
                case "Z":
                case "ZZ":
                    f._useUTC = !0,
                    f._tzm = C(d)
                }
                null == d && (f._isValid = !1)
            }
            b && (c._il = b);
            c._isPm && 12 > c._a[3] && (c._a[3] += 12); ! 1 === c._isPm && 12 === c._a[3] && (c._a[3] = 0);
            L(c)
        }
        function F(c, a, b, d, e) {
            return e.relativeTime(a || 1, !!b, c, d)
        }
        function E(c, a, b) {
            a = b - a;
            b -= c.day();
            b > a && (b -= 7);
            b < a - 7 && (b += 7);
            c = h(c).add("d", b);
            return {
                week: Math.ceil(c.dayOfYear() / 7),
                year: c.year()
            }
        }
        function P(c) {
            var b = c._i,
            d = c._f;
            if (null === b || "" === b) return null;
            "string" === typeof b && (c._i = b = q().preparse(b));
            if (h.isMoment(b)) c = k({},
            b),
            c._d = new Date( + b._d);
            else if (d) if ("[object Array]" === Object.prototype.toString.call(d)) {
                var b = c,
                e, g, l = 99,
                m;
                for (m = 0; m < b._f.length; m++) e = k({},
                b),
                e._f = b._f[m],
                G(e),
                d = new f(e),
                e = v(e._a, d.toArray()),
                d._il && (e += d._il.length),
                e < l && (l = e, g = d);
                k(b, g)
            } else G(c);
            else if (g = c, b = g._i, d = fa.exec(b), b === a) g._d = new Date;
            else if (d) g._d = new Date( + d[1]);
            else if ("string" === typeof b) if (b = g._i, d = ga.exec(b)) {
                g._f = "YYYY-MM-DD" + (d[2] || " ");
                for (d = 0; 4 > d; d++) if (Q[d][1].exec(b)) {
                    g._f += Q[d][0];
                    break
                }
                I.exec(b) && (g._f += " Z");
                G(g)
            } else g._d = new Date(b);
            else "[object Array]" === Object.prototype.toString.call(b) ? (g._a = b.slice(0), L(g)) : g._d = b instanceof Date ? new Date( + b) : new Date(b);
            return new f(c)
        }
        function R(c, a) {
            h.fn[c] = h.fn[c + "s"] = function(c) {
                var b = this._isUTC ? "UTC": "";
                return null != c ? (this._d["set" + b + a](c), h.updateOffset(this), this) : this._d["get" + b + a]()
            }
        }
        function ha(c) {
            h.duration.fn[c] = function() {
                return this._data[c]
            }
        }
        function S(c, a) {
            h.duration.fn["as" + c] = function() {
                return + this / a
            }
        }
        for (var h, y = Math.round,
        t, A = {},
        M = "undefined" !== typeof module && module.exports,
        fa = /^\/?Date\((\-?\d+)/i,
        ia = /(\-)?(\d*)?\.?(\d+)\:(\d+)\:(\d+)\.?(\d{3})?/,
        N = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|SS?S?|X|zz?|ZZ?|.)/g,
        O = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g,
        da = /\d\d?/,
        Z = /\d{1,3}/,
        W = /\d{3}/,
        X = /\d{1,4}/,
        Y = /[+\-]?\d{1,6}/,
        aa = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,
        I = /Z|[\+\-]\d\d:?\d\d/i,
        ca = /T/i,
        ba = /[\+\-]?\d+(\.\d{1,3})?/,
        ga = /^\s*\d{4}-\d\d-\d\d((T| )(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?/,
        Q = [["HH:mm:ss.S", /(T| )\d\d:\d\d:\d\d\.\d{1,3}/], ["HH:mm:ss", /(T| )\d\d:\d\d:\d\d/], ["HH:mm", /(T| )\d\d:\d\d/], ["HH", /(T| )\d\d/]], ea = /([\+\-]|\d\d)/gi, J = ["Date", "Hours", "Minutes", "Seconds", "Milliseconds"], K = {
            Milliseconds: 1,
            Seconds: 1E3,
            Minutes: 6E4,
            Hours: 36E5,
            Days: 864E5,
            Months: 2592E6,
            Years: 31536E6
        },
        V = {
            ms: "millisecond",
            s: "second",
            m: "minute",
            h: "hour",
            d: "day",
            w: "week",
            M: "month",
            y: "year"
        },
        H = {},
        T = "DDD w W M D d".split(" "), U = "MDHhmswW".split(""), x = {
            M: function() {
                return this.month() + 1
            },
            MMM: function(c) {
                return this.lang().monthsShort(this, c)
            },
            MMMM: function(c) {
                return this.lang().months(this, c)
            },
            D: function() {
                return this.date()
            },
            DDD: function() {
                return this.dayOfYear()
            },
            d: function() {
                return this.day()
            },
            dd: function(c) {
                return this.lang().weekdaysMin(this, c)
            },
            ddd: function(c) {
                return this.lang().weekdaysShort(this, c)
            },
            dddd: function(c) {
                return this.lang().weekdays(this, c)
            },
            w: function() {
                return this.week()
            },
            W: function() {
                return this.isoWeek()
            },
            YY: function() {
                return p(this.year() % 100, 2)
            },
            YYYY: function() {
                return p(this.year(), 4)
            },
            YYYYY: function() {
                return p(this.year(), 5)
            },
            gg: function() {
                return p(this.weekYear() % 100, 2)
            },
            gggg: function() {
                return this.weekYear()
            },
            ggggg: function() {
                return p(this.weekYear(), 5)
            },
            GG: function() {
                return p(this.isoWeekYear() % 100, 2)
            },
            GGGG: function() {
                return this.isoWeekYear()
            },
            GGGGG: function() {
                return p(this.isoWeekYear(), 5)
            },
            e: function() {
                return this.weekday()
            },
            E: function() {
                return this.isoWeekday()
            },
            a: function() {
                return this.lang().meridiem(this.hours(), this.minutes(), !0)
            },
            A: function() {
                return this.lang().meridiem(this.hours(), this.minutes(), !1)
            },
            H: function() {
                return this.hours()
            },
            h: function() {
                return this.hours() % 12 || 12
            },
            m: function() {
                return this.minutes()
            },
            s: function() {
                return this.seconds()
            },
            S: function() {
                return~~ (this.milliseconds() / 100)
            },
            SS: function() {
                return p(~~ (this.milliseconds() / 10), 2)
            },
            SSS: function() {
                return p(this.milliseconds(), 3)
            },
            Z: function() {
                var c = -this.zone(),
                a = "+";
                0 > c && (c = -c, a = "-");
                return a + p(~~ (c / 60), 2) + ":" + p(~~c % 60, 2)
            },
            ZZ: function() {
                var c = -this.zone(),
                a = "+";
                0 > c && (c = -c, a = "-");
                return a + p(~~ (10 * c / 6), 4)
            },
            z: function() {
                return this.zoneAbbr()
            },
            zz: function() {
                return this.zoneName()
            },
            X: function() {
                return this.unix()
            }
        }; T.length;) t = T.pop(),
        x[t + "o"] = e(x[t], t);
        for (; U.length;) t = U.pop(),
        x[t + t] = b(x[t], 2);
        x.DDDD = b(x.DDD, 3);
        d.prototype = {
            set: function(c) {
                var a, b;
                for (b in c) a = c[b],
                "function" === typeof a ? this[b] = a: this["_" + b] = a
            },
            _months: "January February March April May June July August September October November December".split(" "),
            months: function(c) {
                return this._months[c.month()]
            },
            _monthsShort: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
            monthsShort: function(c) {
                return this._monthsShort[c.month()]
            },
            monthsParse: function(c) {
                var a, b;
                this._monthsParse || (this._monthsParse = []);
                for (a = 0; 12 > a; a++) if (this._monthsParse[a] || (b = h([2E3, a]), b = "^" + this.months(b, "") + "|^" + this.monthsShort(b, ""), this._monthsParse[a] = RegExp(b.replace(".", ""), "i")), this._monthsParse[a].test(c)) return a
            },
            _weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
            weekdays: function(c) {
                return this._weekdays[c.day()]
            },
            _weekdaysShort: "Sun Mon Tue Wed Thu Fri Sat".split(" "),
            weekdaysShort: function(c) {
                return this._weekdaysShort[c.day()]
            },
            _weekdaysMin: "Su Mo Tu We Th Fr Sa".split(" "),
            weekdaysMin: function(c) {
                return this._weekdaysMin[c.day()]
            },
            weekdaysParse: function(c) {
                var a, b;
                this._weekdaysParse || (this._weekdaysParse = []);
                for (a = 0; 7 > a; a++) if (this._weekdaysParse[a] || (b = h([2E3, 1]).day(a), b = "^" + this.weekdays(b, "") + "|^" + this.weekdaysShort(b, "") + "|^" + this.weekdaysMin(b, ""), this._weekdaysParse[a] = RegExp(b.replace(".", ""), "i")), this._weekdaysParse[a].test(c)) return a
            },
            _longDateFormat: {
                LT: "h:mm A",
                L: "MM/DD/YYYY",
                LL: "MMMM D YYYY",
                LLL: "MMMM D YYYY LT",
                LLLL: "dddd, MMMM D YYYY LT"
            },
            longDateFormat: function(c) {
                var a = this._longDateFormat[c]; ! a && this._longDateFormat[c.toUpperCase()] && (a = this._longDateFormat[c.toUpperCase()].replace(/MMMM|MM|DD|dddd/g,
                function(c) {
                    return c.slice(1)
                }), this._longDateFormat[c] = a);
                return a
            },
            isPM: function(c) {
                return "p" === (c + "").toLowerCase()[0]
            },
            _meridiemParse: /[ap]\.?m?\.?/i,
            meridiem: function(c, a, b) {
                return 11 < c ? b ? "pm": "PM": b ? "am": "AM"
            },
            _calendar: {
                sameDay: "[Today at] LT",
                nextDay: "[Tomorrow at] LT",
                nextWeek: "dddd [at] LT",
                lastDay: "[Yesterday at] LT",
                lastWeek: "[Last] dddd [at] LT",
                sameElse: "L"
            },
            calendar: function(c, a) {
                var b = this._calendar[c];
                return "function" === typeof b ? b.apply(a) : b
            },
            _relativeTime: {
                future: "in %s",
                past: "%s ago",
                s: "a few seconds",
                m: "a minute",
                mm: "%d minutes",
                h: "an hour",
                hh: "%d hours",
                d: "a day",
                dd: "%d days",
                M: "a month",
                MM: "%d months",
                y: "a year",
                yy: "%d years"
            },
            relativeTime: function(c, a, b, d) {
                var e = this._relativeTime[b];
                return "function" === typeof e ? e(c, a, b, d) : e.replace(/%d/i, c)
            },
            pastFuture: function(c, a) {
                var b = this._relativeTime[0 < c ? "future": "past"];
                return "function" === typeof b ? b(a) : b.replace(/%s/i, a)
            },
            ordinal: function(c) {
                return this._ordinal.replace("%d", c)
            },
            _ordinal: "%d",
            preparse: function(c) {
                return c
            },
            postformat: function(c) {
                return c
            },
            week: function(c) {
                return E(c, this._week.dow, this._week.doy).week
            },
            _week: {
                dow: 0,
                doy: 6
            }
        };
        h = function(c, a, b) {
            return P({
                _i: c,
                _f: a,
                _l: b,
                _isUTC: !1
            })
        };
        h.utc = function(c, a, b) {
            return P({
                _useUTC: !0,
                _isUTC: !0,
                _l: b,
                _i: c,
                _f: a
            })
        };
        h.unix = function(c) {
            return h(1E3 * c)
        };
        h.duration = function(c, a) {
            var b = h.isDuration(c),
            d = "number" === typeof c,
            e = b ? c._input: d ? {}: c,
            f = ia.exec(c);
            d ? a ? e[a] = c: e.milliseconds = c: f && (d = "-" === f[1] ? -1 : 1, e = {
                y: 0,
                d: ~~f[2] * d,
                h: ~~f[3] * d,
                m: ~~f[4] * d,
                s: ~~f[5] * d,
                ms: ~~f[6] * d
            });
            f = new g(e);
            b && c.hasOwnProperty("_lang") && (f._lang = c._lang);
            return f
        };
        h.version = "2.1.0";
        h.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
        h.updateOffset = function() {};
        h.lang = function(c, a) {
            if (!c) return h.fn._lang._abbr;
            a ? (a.abbr = c, A[c] || (A[c] = new d), A[c].set(a)) : A[c] || q(c);
            h.duration.fn._lang = h.fn._lang = q(c)
        };
        h.langData = function(c) {
            c && c._lang && c._lang._abbr && (c = c._lang._abbr);
            return q(c)
        };
        h.isMoment = function(c) {
            return c instanceof f
        };
        h.isDuration = function(c) {
            return c instanceof g
        };
        h.fn = f.prototype = {
            clone: function() {
                return h(this)
            },
            valueOf: function() {
                return + this._d + 6E4 * (this._offset || 0)
            },
            unix: function() {
                return Math.floor( + this / 1E3)
            },
            toString: function() {
                return this.format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
            },
            toDate: function() {
                return this._offset ? new Date( + this) : this._d
            },
            toISOString: function() {
                return z(h(this).utc(), "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
            },
            toArray: function() {
                return [this.year(), this.month(), this.date(), this.hours(), this.minutes(), this.seconds(), this.milliseconds()]
            },
            isValid: function() {
                null == this._isValid && (this._isValid = this._a ? !v(this._a, (this._isUTC ? h.utc(this._a) : h(this._a)).toArray()) : !isNaN(this._d.getTime()));
                return !! this._isValid
            },
            utc: function() {
                return this.zone(0)
            },
            local: function() {
                this.zone(0);
                this._isUTC = !1;
                return this
            },
            format: function(c) {
                c = z(this, c || h.defaultFormat);
                return this.lang().postformat(c)
            },
            add: function(c, a) {
                var b;
                b = "string" === typeof c ? h.duration( + a, c) : h.duration(c, a);
                r(this, b, 1);
                return this
            },
            subtract: function(c, a) {
                var b;
                b = "string" === typeof c ? h.duration( + a, c) : h.duration(c, a);
                r(this, b, -1);
                return this
            },
            diff: function(c, a, b) {
                c = this._isUTC ? h(c).zone(this._offset || 0) : h(c).local();
                var d = 6E4 * (this.zone() - c.zone()),
                e;
                a = m(a);
                "year" === a || "month" === a ? (e = 432E5 * (this.daysInMonth() + c.daysInMonth()), d = 12 * (this.year() - c.year()) + (this.month() - c.month()), d += (this - h(this).startOf("month") - (c - h(c).startOf("month"))) / e, d -= 6E4 * (this.zone() - h(this).startOf("month").zone() - (c.zone() - h(c).startOf("month").zone())) / e, "year" === a && (d /= 12)) : (e = this - c, d = "second" === a ? e / 1E3: "minute" === a ? e / 6E4: "hour" === a ? e / 36E5: "day" === a ? (e - d) / 864E5: "week" === a ? (e - d) / 6048E5: e);
                return b ? d: l(d)
            },
            from: function(c, a) {
                return h.duration(this.diff(c)).lang(this.lang()._abbr).humanize(!a)
            },
            fromNow: function(c) {
                return this.from(h(), c)
            },
            calendar: function() {
                var c = this.diff(h().startOf("day"), "days", !0),
                c = -6 > c ? "sameElse": -1 > c ? "lastWeek": 0 > c ? "lastDay": 1 > c ? "sameDay": 2 > c ? "nextDay": 7 > c ? "nextWeek": "sameElse";
                return this.format(this.lang().calendar(c, this))
            },
            isLeapYear: function() {
                var c = this.year();
                return 0 === c % 4 && 0 !== c % 100 || 0 === c % 400
            },
            isDST: function() {
                return this.zone() < this.clone().month(0).zone() || this.zone() < this.clone().month(5).zone()
            },
            day: function(c) {
                var a = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
                return null != c ? "string" === typeof c && (c = this.lang().weekdaysParse(c), "number" !== typeof c) ? this: this.add({
                    d: c - a
                }) : a
            },
            month: function(a) {
                var b = this._isUTC ? "UTC": "",
                d;
                if (null != a) {
                    if ("string" === typeof a && (a = this.lang().monthsParse(a), "number" !== typeof a)) return this;
                    d = this.date();
                    this.date(1);
                    this._d["set" + b + "Month"](a);
                    this.date(Math.min(d, this.daysInMonth()));
                    h.updateOffset(this);
                    return this
                }
                return this._d["get" + b + "Month"]()
            },
            startOf: function(a) {
                a = m(a);
                switch (a) {
                case "year":
                    this.month(0);
                case "month":
                    this.date(1);
                case "week":
                case "day":
                    this.hours(0);
                case "hour":
                    this.minutes(0);
                case "minute":
                    this.seconds(0);
                case "second":
                    this.milliseconds(0)
                }
                "week" === a && this.weekday(0);
                return this
            },
            endOf: function(a) {
                return this.startOf(a).add(a, 1).subtract("ms", 1)
            },
            isAfter: function(a, b) {
                b = "undefined" !== typeof b ? b: "millisecond";
                return + this.clone().startOf(b) > +h(a).startOf(b)
            },
            isBefore: function(a, b) {
                b = "undefined" !== typeof b ? b: "millisecond";
                return + this.clone().startOf(b) < +h(a).startOf(b)
            },
            isSame: function(a, b) {
                b = "undefined" !== typeof b ? b: "millisecond";
                return + this.clone().startOf(b) === +h(a).startOf(b)
            },
            min: function(a) {
                a = h.apply(null, arguments);
                return a < this ? this: a
            },
            max: function(a) {
                a = h.apply(null, arguments);
                return a > this ? this: a
            },
            zone: function(a) {
                var b = this._offset || 0;
                if (null != a)"string" === typeof a && (a = C(a)),
                16 > Math.abs(a) && (a *= 60),
                this._offset = a,
                this._isUTC = !0,
                b !== a && r(this, h.duration(b - a, "m"), 1, !0);
                else return this._isUTC ? b: this._d.getTimezoneOffset();
                return this
            },
            zoneAbbr: function() {
                return this._isUTC ? "UTC": ""
            },
            zoneName: function() {
                return this._isUTC ? "Coordinated Universal Time": ""
            },
            daysInMonth: function() {
                return h.utc([this.year(), this.month() + 1, 0]).date()
            },
            dayOfYear: function(a) {
                var b = y((h(this).startOf("day") - h(this).startOf("year")) / 864E5) + 1;
                return null == a ? b: this.add("d", a - b)
            },
            weekYear: function(a) {
                var b = E(this, this.lang()._week.dow, this.lang()._week.doy).year;
                return null == a ? b: this.add("y", a - b)
            },
            isoWeekYear: function(a) {
                var b = E(this, 1, 4).year;
                return null == a ? b: this.add("y", a - b)
            },
            week: function(a) {
                var b = this.lang().week(this);
                return null == a ? b: this.add("d", 7 * (a - b))
            },
            isoWeek: function(a) {
                var b = E(this, 1, 4).week;
                return null == a ? b: this.add("d", 7 * (a - b))
            },
            weekday: function(a) {
                var b = (this._d.getDay() + 7 - this.lang()._week.dow) % 7;
                return null == a ? b: this.add("d", a - b)
            },
            isoWeekday: function(a) {
                return null == a ? this.day() || 7 : this.day(this.day() % 7 ? a: a - 7)
            },
            lang: function(b) {
                if (b === a) return this._lang;
                this._lang = q(b);
                return this
            }
        };
        for (t = 0; t < J.length; t++) R(J[t].toLowerCase().replace(/s$/, ""), J[t]);
        R("year", "FullYear");
        h.fn.days = h.fn.day;
        h.fn.months = h.fn.month;
        h.fn.weeks = h.fn.week;
        h.fn.isoWeeks = h.fn.isoWeek;
        h.fn.toJSON = h.fn.toISOString;
        h.duration.fn = g.prototype = {
            _bubble: function() {
                var a = this._milliseconds,
                b = this._days,
                d = this._months,
                e = this._data;
                e.milliseconds = a % 1E3;
                a = l(a / 1E3);
                e.seconds = a % 60;
                a = l(a / 60);
                e.minutes = a % 60;
                a = l(a / 60);
                e.hours = a % 24;
                b += l(a / 24);
                e.days = b % 30;
                d += l(b / 30);
                e.months = d % 12;
                b = l(d / 12);
                e.years = b
            },
            weeks: function() {
                return l(this.days() / 7)
            },
            valueOf: function() {
                return this._milliseconds + 864E5 * this._days + this._months % 12 * 2592E6 + 31536E6 * ~~ (this._months / 12)
            },
            humanize: function(a) {
                var b = +this,
                d;
                d = !a;
                var e = this.lang(),
                f = y(Math.abs(b) / 1E3),
                g = y(f / 60),
                h = y(g / 60),
                k = y(h / 24),
                l = y(k / 365),
                f = 45 > f && ["s", f] || 1 === g && ["m"] || 45 > g && ["mm", g] || 1 === h && ["h"] || 22 > h && ["hh", h] || 1 === k && ["d"] || 25 >= k && ["dd", k] || 45 >= k && ["M"] || 345 > k && ["MM", y(k / 30)] || 1 === l && ["y"] || ["yy", l];
                f[2] = d;
                f[3] = 0 < b;
                f[4] = e;
                d = F.apply({},
                f);
                a && (d = this.lang().pastFuture(b, d));
                return this.lang().postformat(d)
            },
            add: function(a, b) {
                var d = h.duration(a, b);
                this._milliseconds += d._milliseconds;
                this._days += d._days;
                this._months += d._months;
                this._bubble();
                return this
            },
            subtract: function(a, b) {
                var d = h.duration(a, b);
                this._milliseconds -= d._milliseconds;
                this._days -= d._days;
                this._months -= d._months;
                this._bubble();
                return this
            },
            get: function(a) {
                a = m(a);
                return this[a.toLowerCase() + "s"]()
            },
            as: function(a) {
                a = m(a);
                return this["as" + a.charAt(0).toUpperCase() + a.slice(1) + "s"]()
            },
            lang: h.fn.lang
        };
        for (t in K) K.hasOwnProperty(t) && (S(t, K[t]), ha(t.toLowerCase()));
        S("Weeks", 6048E5);
        h.duration.fn.asMonths = function() {
            return ( + this - 31536E6 * this.years()) / 2592E6 + 12 * this.years()
        };
        h.lang("en", {
            ordinal: function(a) {
                var b = a % 10;
                return a + (1 === ~~ (a % 100 / 10) ? "th": 1 === b ? "st": 2 === b ? "nd": 3 === b ? "rd": "th")
            }
        });
        M && (module.exports = h);
        "undefined" === typeof ender && (this.moment = h);
        "function" === typeof define && define.amd && define("moment", [],
        function() {
            return h
        });
        this.moment = h
    }).call("undefined" === typeof r ? window: r);
    if (!r.moment) if (window.moment) r.moment = window.moment;
    else throw "Kalendae requires moment.js. You must use kalendae.standalone.js if moment is not available on the page.";
    l = r.moment;
    l.fn.yearDay = function(a) {
        var b = Math.floor(this._d / 864E5);
        return "undefined" === typeof a ? b: this.add({
            d: a - b
        })
    };
    w = r.moment().startOf("day");
    "undefined" === typeof jQuery || "function" !== typeof document.addEventListener && !d.isIE8() || (jQuery.fn.kalendae = function(a) {
        this.each(function(b, d) {
            "INPUT" === d.tagName ? $(d).data("kalendae", new r.Input(d, a)) : $(d).data("kalendae", new r($.extend({},
            {
                attachTo: d
            },
            a)))
        });
        return this
    })
})();