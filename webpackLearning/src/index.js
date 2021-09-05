//1.使用ES6模块化导入jquery
import $ from 'jquery'
import './css/index.css'
import './css/index.less'

//2.实现隔行变色的效果
$(function () {
    $('li:odd').css('background-color', 'yellow')
    $('li:even').css('background-color', 'blue')
})

class Person {
    static info = 'person info'
}

console.log(Person.info)