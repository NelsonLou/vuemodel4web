(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0a4b1f"],{"0812":function(e,a,l){"use strict";l.r(a);var t=function(){var e=this,a=e.$createElement,l=e._self._c||a;return l("div",{staticClass:"account"},[l("formComp",{ref:"filterForm",attrs:{inline:!0,formConf:e.filterFormConf}}),l("el-button",{attrs:{icon:"el-icon-search",size:"small",type:"primary",circle:""},on:{click:e.getTableData}}),l("el-button",{attrs:{icon:"el-icon-plus",size:"small",type:"primary",circle:""},on:{click:e.handleAdd}}),l("tableComp",{ref:"accountTable",staticClass:"marginTop",attrs:{tableConf:e.tableConf,tableActConf:e.tableActConf}}),l("el-dialog",{attrs:{title:e.dialogTitle,visible:e.dialogVisible},on:{"update:visible":function(a){e.dialogVisible=a}}},[l("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}]},[l("formComp",{directives:[{name:"show",rawName:"v-show",value:"add"==e.act,expression:'act == "add"'}],ref:"addFormConf",attrs:{formConf:e.addFormConf,autoSubmit:!0,submitUrl:e.formUrl,handleAferSubmit:e.getTableData}}),l("formComp",{directives:[{name:"show",rawName:"v-show",value:"edit"==e.act,expression:'act == "edit"'}],ref:"editFormConf",attrs:{formConf:e.addFormConf,autoSubmit:!0,submitUrl:e.formUrl,handleAferSubmit:e.getTableData}})],1),l("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:function(a){e.dialogVisible=!1}}},[e._v("取 消")]),l("el-button",{attrs:{type:"primary"},on:{click:e.handleSubmit}},[e._v("确 定")])],1)])],1)},i=[],o=(l("3a23"),[{label:"江苏",child:[{label:"苏州"}]},{label:"浙江",child:[{label:"宁波"}]}]),n=o,s={name:"account",data:function(){return{act:"",dialogTitle:"",formUrl:"/mock/addUser",loading:!1,dialogVisible:!1,tableConf:[{prop:"name",label:"用户名",type:"data"},{prop:"role",label:"角色类型",type:"data"},{prop:"address",label:"地区",type:"data"},{prop:"status",label:"状态",type:"data"}],tableActConf:[{label:"操作",child:[{label:"编辑",methodsName:"handleEdit"},{label:"删除",methodsName:"handleDelete"}]}],filterFormConf:[{valName:"userName",type:"input",plh:"用户名"},{valName:"roleName",plh:"所属角色",type:"select",selectList:[{value:"roleA",label:"角色A"},{value:"roleB",label:"角色B"},{value:"roleC",label:"角色C"}]}],addFormConf:[{valName:"userName",label:"用户名",type:"input",plh:"用户名"},{valName:"roleName",label:"所属角色",plh:"所属角色",type:"select",selectList:[{value:"roleA",label:"角色A"},{value:"roleB",label:"角色B"},{value:"roleC",label:"角色C"}]},{valName:"sex",label:"性别",plh:"性别",type:"select",selectList:[{value:"1",label:"男"},{value:"2",label:"女"}]},{valName:"limitDateRange",childValName:["limitStartTime","limitEndTime"],label:"可登陆时间",plh:"可登陆时间",type:"timeRange"},{valName:"region",childValName:["province","city"],label:"地区",plh:"地区",type:"cascader",cascaderData:n,props:{value:"label",children:"child"}},{valName:"forbidden",label:"状态",plh:"状态",type:"switch",selectList:[{value:"1",label:"启用"},{value:"0",label:"禁用"}]},{valName:"note",label:"备注",type:"textarea",plh:"备注"},{valName:"birthday",label:"生日",type:"date",plh:"生日"},{valName:"department",label:"所属部门",plh:"所属部门",type:"select",multiple:!0,selectList:[{value:"departA",label:"部门A"},{value:"departB",label:"部门B"},{value:"departC",label:"部门C"}]}]}},mounted:function(){this.getTableData()},methods:{getTableData:function(){var e="/mock/userList",a=this.$refs.filterForm.handleSubmit();this.$refs.accountTable.getTableData(e,a)},handleEdit:function(e){var a=this,l="/mock/userInfo",t={};this.act="edit",this.$Ax.get(l).then(function(e){a.dialogVisible=!0,t=e}).catch(function(e){console.log(e)}).then(function(e){a.$refs.editFormConf.handleDataEnter(t)})},handleAdd:function(){this.act="add",this.dialogTitle="添加用户",this.dialogVisible=!0},handleDelete:function(e){var a=this,l={name:e.name};this.$confirm("确认删除该用户（"+e.name+"）？","确认信息",{distinguishCancelAndClose:!0,confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(){a.$Ax.post("/mock/deleteUser",l).then(function(e){a.getTableData()}).catch(function(e){console.log(e)})}).catch(function(e){a.$message({type:"success",message:"已取消删除"})})},handleSubmit:function(){this.$refs[this.act+"FormConf"].handleSubmit()}}},r=s,c=l("17cc"),d=Object(c["a"])(r,t,i,!1,null,"6acebb44",null);a["default"]=d.exports}}]);