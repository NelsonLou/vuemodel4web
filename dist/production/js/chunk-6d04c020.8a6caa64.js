(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6d04c020"],{"358f":function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"layout"},[a("el-container",[a("el-aside",{staticClass:"layout_side",attrs:{width:e.asideWidth}},[a("div",{staticClass:"layout_LOGO_l"}),a("el-menu",{staticClass:"el-menu-vertical-demo layout_menu",attrs:{"default-active":"2",collapse:e.menuCollapse,router:"","unique-opened":"","background-color":"#545c64","text-color":"#fff","active-text-color":"#ffd04b"}},[a("el-submenu",{attrs:{index:"1"}},[a("template",{slot:"title"},[a("i",{staticClass:"el-icon-setting"}),a("span",{directives:[{name:"show",rawName:"v-show",value:e.showMenuSpan,expression:"showMenuSpan"}]},[e._v("Module")])]),a("el-menu-item",{attrs:{index:"/account"}},[e._v("DemoPage")]),a("el-menu-item",{attrs:{index:"1-2"}},[e._v("MenuItem")])],2)],1)],1),a("el-container",[a("el-header",{staticClass:"clearfloat layout_header"},[a("i",{class:[e.showMenuSpan?"el-icon-s-unfold":"el-icon-s-fold","layout_headerIcon"],on:{click:e.handleCollapse}}),a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),a("el-breadcrumb-item",[e._v("活动管理")])],1),a("el-dropdown",{staticClass:"right layout_dropdown",on:{command:e.handleClick}},[a("span",{staticClass:"el-dropdown-link"},[e._v("\n\t\t\t\t\t\tuserName"),a("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[a("el-dropdown-item",{attrs:{command:"EditPassword"}},[e._v("EditPassword")]),a("el-dropdown-item",{attrs:{command:"Logout"}},[e._v("Logout")])],1)],1)],1),a("el-main",[a("router-view")],1),a("el-footer",{attrs:{height:"44px"}},[e._v("@2019 hadlinks.com 海大物联研发中心团队提供技术支持")])],1)],1)],1)},n=[],s={name:"syslayout",data:function(){return{asideWidth:"200px",menuCollapse:!1,showMenuSpan:!0}},components:{},created:function(){},computed:{},watch:{menuCollapse:function(e){this.asideWidth=e?"70px":"200px"}},methods:{handleCollapse:function(){this.showMenuSpan=!this.showMenuSpan;var e=this;setTimeout(function(){e.menuCollapse=!e.menuCollapse},100)},handleClick:function(e){"Logout"==e&&this.$store.dispatch("handleLogout")}}},l=s,i=(a("baae"),a("17cc")),d=Object(i["a"])(l,o,n,!1,null,"1715ef0d",null);t["default"]=d.exports},4154:function(e,t,a){},baae:function(e,t,a){"use strict";var o=a("4154"),n=a.n(o);n.a}}]);