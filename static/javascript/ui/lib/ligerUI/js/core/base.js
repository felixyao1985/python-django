﻿/**
* jQuery ligerUI 1.1.4
* 
* Author leoxie [ gd_star@163.com ] 
* 
*/
(function ($)
{


    //lgerui 继承方法
    Function.prototype.ligerExtend = function (parent, overrides)
    {
        if (typeof parent != 'function') return this;
        //保存对父类的引用
        this.base = parent.prototype;
        this.base.constructor = parent;
        //继承
        var f = function () { };
        f.prototype = parent.prototype;
        this.prototype = new f();
        this.prototype.constructor = this;
        //附加属性方法
        if (overrides) $.extend(this.prototype, overrides);
    };

    // 核心对象
    $.ligerui = {
        version: 'V1.1.4',
        managerCount: 0,
        //组件管理器池
        managers: {},
        managerIdPrev: 'ligerui',
        //错误提示
        error: {
            managerIsExist: '管理器id已经存在'
        },
        getId: function (prev)
        {
            prev = prev || this.managerIdPrev;
            var id = prev + (1000 + this.managerCount);
            this.managerCount++;
            return id;
        },
        add: function (manager)
        {
            if (arguments.length == 2)
            {
                var m = arguments[1];
                m.id = m.id || m.options.id || arguments[0].id;
                this.addManager(m);
                return;
            }
            if (!manager.id) manager.id = this.getId(manager.__idPrev());
            if (this.managers[manager.id])
                throw new Error(this.error.managerIsExist);
            this.managers[manager.id] = manager;
        },
        //获取ligerui对象
        //1,传入ligerui ID
        //2,传入Dom Object Array(jQuery)
        get: function (arg, idAttrName)
        {
            idAttrName = idAttrName || "ligeruiid";
            if (typeof arg == "string" || typeof arg == "number")
            {
                return $.ligerui.managers[arg];
            }
            else if (typeof arg == "object" && arg.length)
            {
                if (!arg[0][idAttrName]) return null;
                return $.ligerui.managers[arg[0][idAttrName]];
            }
            return null;
        },
        //$.fn.liger{Plugin} 和 $.fn.ligerGet{Plugin}Manager
        //会调用这个方法,并传入作用域(this)
        //@parm [plugin]  插件名
        //@parm [args] 参数(数组)
        //@parm [ext] 扩展参数,定义命名空间或者id属性名
        run: function (plugin, args, ext)
        {
            if (!plugin) return;
            ext = $.extend({
                defaultsNamespace: 'ligerDefaults',
                methodsNamespace: 'ligerMethods',
                controlNamespace: 'controls',
                idAttrName: 'ligeruiid',
                isStatic: false,
                hasElement: true,           //是否拥有element(比如drag、resizable等不拥有)
                propertyToElemnt: null     //链接到element的属性名
            }, ext || {});
            plugin = plugin.replace(/^ligerGet/, '');
            plugin = plugin.replace(/^liger/, '');
            if (this == null || this == window || ext.isStatic)
            {
                if (!$.ligerui.plugins[plugin])
                {
                    $.ligerui.plugins[plugin] = {
                        fn: $['liger'+plugin],
                        isStatic: true
                    };
                }
                return new $.ligerui[ext.controlNamespace][plugin]($.extend({}, $[ext.defaultsNamespace][plugin] || {}, $[ext.defaultsNamespace][plugin + 'String'] || {}, args.length > 0 ? args[0] : {}));
            }
            if (!$.ligerui.plugins[plugin])
            {
                $.ligerui.plugins[plugin] = {
                    fn: $.fn['liger' + plugin],
                    isStatic: false
                };
            }
            if (/Manager$/.test(plugin)) return $.ligerui.get(this, ext.idAttrName);
            this.each(function ()
            {
                if (this[ext.idAttrName]) return; //已经执行过
                if (args.length >= 1 && typeof args[0] == 'string') return;
                //只要第一个参数不是string类型,都执行组件的实例化工作
                var options = args.length > 0 ? args[0] : null;
                var p = $.extend({}, $[ext.defaultsNamespace][plugin] || {}
                , $[ext.defaultsNamespace][plugin + 'String'] || {}, options || {});
                if (ext.propertyToElemnt) p[ext.propertyToElemnt] = this;
                if (ext.hasElement)
                {
                    new $.ligerui[ext.controlNamespace][plugin](this, p);
                }
                else
                {
                    new $.ligerui[ext.controlNamespace][plugin](p);
                }
            });
            if (this.length == 0) return null;
            if (args.length == 0) return $.ligerui.get(this, ext.idAttrName);
            if (typeof args[0] == 'object') return $.ligerui.get(this, ext.idAttrName);
            if (typeof args[0] == 'string')
            {
                var manager = $.ligerui.get(this, ext.idAttrName);
                if (manager == null) return;
                if (args[0] == "option")
                {
                    if (args.length == 2)
                        return manager.get(args[1]);  //manager get
                    else if (args.length >= 3)
                        return manager.set(args[1], args[2]);  //manager set
                }
                else
                {
                    var method = args[0];
                    if (!manager[method]) return; //不存在这个方法
                    var parms = Array.apply(null, args);
                    parms.shift();
                    return manager[method].apply(manager, parms);  //manager method
                }
            }
            return null;
        },
        //扩展
        //1,默认参数     
        //2,本地化扩展 
        defaults: {},
        //3,方法接口扩展
        methods: {},
        //命名空间
        //核心控件,封装了一些常用方法
        core: {},
        //命名空间
        //组件的集合
        controls: {},
        //plugin 插件的集合
        plugins: {}
    };

    //扩展对象
    $.ligerDefaults = {};

    //扩展对象
    $.ligerMethos = {};

    //关联起来
    $.ligerui.defaults = $.ligerDefaults;
    $.ligerui.methods = $.ligerMethos;


    //组件基类
    //1,完成定义参数处理方法和参数属性初始化的工作
    //2,完成定义事件处理方法和事件属性初始化的工作
    $.ligerui.core.Component = function (options)
    {
        //事件容器
        this.events = this.events || {};
        //配置参数
        this.options = options || {};
    };
    $.extend($.ligerui.core.Component.prototype, {
        __getType: function ()
        {
            return '$.ligerui.core.Component';
        },
        __idPrev: function ()
        {
            return 'ligerui';
        },
        //设置属性
        set: function (arg, value)
        {
            if (!arg) return;
            if (typeof arg == 'object')
            {
                var tmp
                if (this.options != arg)
                {
                    $.extend(this.options, arg);
                    tmp = arg;
                }
                else
                {
                    tmp = $.extend({}, arg);
                }
                for (var p in tmp)
                {
                    this.set(p, tmp[p]);
                }
                return;
            }
            var name = arg;
            //事件参数
            if (name.indexOf('on') == 0)
            {
                if (typeof value == 'function')
                    this.bind(name.substr(2), value);
                return;
            }
            this.trigger('propertychange', arg, value);
            this.options[name] = value;
            var pn = '_set' + name.substr(0, 1).toUpperCase() + name.substr(1);
            if (this[pn])
            {
                this[pn].call(this, value);
            }
            this.trigger('propertychanged', arg, value);
        },
        //获取属性
        get: function (name)
        {
            var pn = '_get' + name.substr(0, 1).toUpperCase() + name.substr(1);
            if (this[pn])
            {
                return this[pn].call(this, name);
            }
            return this.options[name];
        },
        hasBind: function (arg)
        {
            var name = arg.toLowerCase();
            var event = this.events[name];
            if (event && event.length) return true;
            return false;
        },
        //触发事件
        //data (可选) Array(可选)传递给事件处理函数的附加参数
        trigger: function (arg, data)
        {
            var name = arg.toLowerCase();
            var event = this.events[name];
            if (!event) return;
            data = data || [];
            if ((data instanceof Array) == false)
            {
                data = [data];
            }
            for (var i = 0; i < event.length; i++)
            {
                var ev = event[i];
                if (ev.handler.apply(ev.context, data) == false)
                    return false;
            }
        },
        //绑定事件
        bind: function (arg, handler, context)
        {
            if (typeof arg == 'object')
            {
                for (var p in arg)
                {
                    this.bind(p, arg[p]);
                }
                return;
            }
            if (typeof handler != 'function') return false;
            var name = arg.toLowerCase();
            var event = this.events[name] || [];
            context = context || this;
            event.push({ handler: handler, context: context });
            this.events[name] = event;
        },
        //取消绑定
        unbind: function (arg, handler)
        {
            if (!arg)
            {
                this.events = {};
                return;
            }
            var name = arg.toLowerCase();
            var event = this.events[name];
            if (!event && !event.length) return;
            if (!handler)
            {
                delete this.events[name];
            }
            else
            {
                for (var i = 0, l = event.length; i < l; i++)
                {
                    if (event[i].handler == handler)
                    {
                        event.splice(i, 1);
                        break;
                    }
                }
            }
        },
        destroy: function () { }
    });


    //界面组件基类, 
    //1,完成界面初始化:设置组件id并存入组件管理器池,初始化参数
    //2,渲染的工作,细节交给子类实现
    //@parm [element] 组件对应的dom element对象
    //@parm [options] 组件的参数
    $.ligerui.core.UIComponent = function (element, options)
    {
        $.ligerui.core.UIComponent.base.constructor.call(this, options);
        var extendMethods = this._extendMethods();
        if (extendMethods) $.extend(this, extendMethods);
        this.element = element;
        this._init();
        this.trigger('render');
        this._render();
        this.trigger('rendered');
        this._rendered();
    };
    $.ligerui.core.UIComponent.ligerExtend($.ligerui.core.Component, {
        __getType: function ()
        {
            return '$.ligerui.core.UIComponent';
        },
        //扩展方法
        _extendMethods: function ()
        {

        },
        _init: function ()
        {
            this.type = this.__getType();
            if (!this.element)
            {
                this.id = this.options.id || $.ligerui.getId(this.__idPrev());
            }
            else
            {
                this.id = this.options.id || this.element.id || $.ligerui.getId(this.__idPrev());
            }
            //存入管理器池
            $.ligerui.add(this);

            if (!this.element) return;

            //读取attr方法,并加载到参数,比如['url']
            var attributes = this.attr();
            if (attributes && attributes instanceof Array)
            {
                for (var i = 0; i < attributes.length; i++)
                {
                    var name = attributes[i];
                    this.options[name] = $(this.element).attr(name);
                }
            }
            //读取ligerui这个属性，并加载到参数，比如 ligerui = "width:120,heigth:100"
            var p = this.options;
            if ($(this.element).attr("ligerui"))
            {
                try
                {
                    var attroptions = $(this.element).attr("ligerui");
                    if (attroptions.indexOf('{') != 0) attroptions = "{" + attroptions + "}";
                    eval("attroptions = " + attroptions + ";");
                    if (attroptions) $.extend(p, attroptions);
                }
                catch (e) { }
            }
        },
        _render: function ()
        {

        },
        _rendered: function ()
        {
            if (this.element)
            {
                this.element.applyligerui = true;
                this.element.ligeruiid = this.id;
            }
        },
        //返回要转换成ligerui参数的属性,比如['url']
        attr: function ()
        {
            return [];
        }
    });


    //表单控件基类
    $.ligerui.controls.Input = function (element, options)
    {
        $.ligerui.controls.Input.base.constructor.call(this, element, options);
    };

    $.ligerui.controls.Input.ligerExtend($.ligerui.core.UIComponent, {
        __getType: function ()
        {
            return '$.ligerui.core.Input';
        },
        setValue: function (value)
        {
            return this.set('value', value);
        },
        getValue: function ()
        {
            return this.get('value');
        },
        setEnabled: function ()
        {
            return this.set('disabled', false);
        },
        setDisabled: function ()
        {
            return this.set('disabled', true);
        },
        updateStyle: function ()
        {

        }
    });


})(jQuery);