/**
 * 皮肤样式主题模块
 */
let style = {};

style.black = {
  color: '#243340', //主打字体颜色
  header_back_color:'#3C464F',//导航栏背景颜色
  menubar_back_color: '#243340',//导航栏中logo背景颜色
  bar_color:"#CCCCCC",//导航栏字体颜色
  unselect_color: '#6B7279',//菜单栏未选中字体色
  unselect_bg_color:'#ffffff',//菜单栏未选中背景色
  selected_color: '#243340',//菜单栏选中字体颜色
  selected_bg_color:"#EBEFF2",//菜单栏选中背景色  
};

style.blue = {
  color: '#243340', //主打字体颜色
  header_back_color:'#0C6FF8',//导航栏背景颜色
  menubar_back_color: '#0A5FD5',//导航栏中logo背景颜色
  bar_color:"#ffffff",//导航栏字体颜色
  unselect_color: '#6B7279',//菜单栏未选中字体色
  unselect_bg_color:'#ffffff',//菜单栏未选中背景色
  selected_color: '#243340',//菜单栏选中字体颜色
  selected_bg_color:"#EBEFF2",//菜单栏选中背景色
};

style.purple = {
  color: '#243340', //主打字体颜色
  header_back_color:'#674598',//导航栏背景颜色
  menubar_back_color: '#532D89',//导航栏中logo背景颜色
  bar_color:"#ffffff",//导航栏字体颜色
  unselect_color: '#6B7279',//菜单栏未选中字体色
  unselect_bg_color:'#ffffff',//菜单栏未选中背景色
  selected_color: '#243340',//菜单栏选中字体颜色
  selected_bg_color:"#EBEFF2",//菜单栏选中背景色
};

style.green = {
  color: '#243340', //主打字体颜色
  header_back_color:'#69B076',//导航栏背景颜色
  menubar_back_color: '#45A056',//导航栏中logo背景颜色
  bar_color:"#ffffff",//导航栏字体颜色
  unselect_color: '#6B7279',//菜单栏未选中字体色
  unselect_bg_color:'#ffffff',//菜单栏未选中背景色
  selected_color: '#243340',//菜单栏选中字体颜色
  selected_bg_color:"#EBEFF2",//菜单栏选中背景色
};

style.orange = {
  color: '#243340', //主打字体颜色
  header_back_color:'#EA5506',//导航栏背景颜色
  menubar_back_color: '#D3510C',//导航栏中logo背景颜色
  bar_color:"#ffffff",//导航栏字体颜色
  unselect_color: '#6B7279',//菜单栏未选中字体色
  unselect_bg_color:'#ffffff',//菜单栏未选中背景色
  selected_color: '#243340',//菜单栏选中字体颜色
  selected_bg_color:"#EBEFF2",//菜单栏选中背景色
};

let theme = {
  bg_color: '#F2F6F9',                       //背景颜色
  border_color_dark: '#AEBAC5',              //边框深色
  border_color_light: '#D6D6D6',             //边框浅色
  alternate_colors: ['#FFFFFF','#FAFAFA'],   //交替颜色(用于表格类的间隔行底色)
  list_hover_color: '#FCF0C1',               //鼠标浮动颜色(用于选中表格、列表等的鼠标经过的底色)
  inputHeight: 32,                            //输入框默认高度
  buttonBarHeight:40,
  menuWidth:150,
  minWidth:824,
  headerHeight:60,
  menu_boxshadow:"rgba(204,204,204,0.5)",//菜单栏右侧阴影
  button_bar_back_color:"#fff",//tab栏背景色
  button_bar_border_color:"#eee",//tab栏边框
  button_bar_select_back_color:'#3C464F',//tab栏选中背景颜色
  button_bar_unselect_back_color:'#fff',//tab栏未选中背景颜色
  button_bar_select_color:'#fff',//tab栏选中字符颜色
  button_bar_unselect_color:'#6B7279',//tab栏未选中字符颜色
};

let zindex = 2000;
theme.zindex = () => zindex++;

theme.change = name => {
    localStorage.setItem('theme',name)
    name = style[name];
    for (let key in name) {
        theme[key] = name[key];
    }
};
theme.change(localStorage.getItem('theme') || 'black');

theme.rgba = (rgba, a) => {
return rgba.replace(',1)', ','+a+')');
}

export default window.$_theme = theme;
