import { ENGINE_METHOD_PKEY_ASN1_METHS } from "constants";
import {Request} from "./request";
import {UI} from "./ui";

//Tüm Elementleri Seçme
const add = document.getElementById("add");
const form = document.getElementById("employee-form");
const nameInput = document.getElementById("name");
const departmentInput = document.getElementById("department");
const salaryInput = document.getElementById("salary");
const employeesList = document.getElementById("employees");
const updateEmployeeButton = document.getElementById("update");
const filter = document.getElementById("filter-btn");
const filterInput = document.getElementById("filter");
const clearAll = document.getElementById("clear-all");

const request = new Request("http://localhost:3000/employees");
const ui = new UI();

let updateState = null;
//Tüm EventListenerlarımı Çağırma Fonksiyonu
eventListeners();

function eventListeners(){
    document.addEventListener("DOMContentLoaded",getAllEmployees);
    add.addEventListener("click",addEmployee);
    employeesList.addEventListener("click",UpdateOrDelete);
    updateEmployeeButton.addEventListener("click",updateEmployee);
    filter.addEventListener("click",filterEmployees);
    clearAll.addEventListener("click",clearAllEmployees);
}

//Sayfa Yüklendiğinde Employeeleri Alma Fonksiyonu
function getAllEmployees(){

    request.get()
    .then(employees => {
        ui.addAllEmployeeToUI(employees);
    })
    .catch(err => console.log(err));
}

//Yeni Employee Ekleme
function addEmployee(e){

    const employeeName = nameInput.value.trim();
    const employeeDepartment = departmentInput.value.trim();
    const employeeSalary = salaryInput.value.trim();

    if(employeeName ==="" || employeeDepartment === "" || employeeSalary ===""){
        alert("Lütfen tüm alanları doldurunuz");
    }else{

        request.post({name:employeeName,department:employeeDepartment,salary:Number(employeeSalary)})
        .then(employee => {
            ui.addEmployeeToUI(employee);
        })
        .catch(err => console.log(err));
    }

    ui.clearAllInputs();
    e.preventDefault();
}

//Güncelleme Veya Silme İşlemi
function UpdateOrDelete(e){

    if(e.target.id ==="delete-employee"){
        deleteEmployee(e.target);
    }
    else if(e.target.id ==="update-employee"){
        updateEmployeeController(e.target.parentElement.parentElement);
    }
}

//Silme İşlemi
function deleteEmployee(targetEmployee){
    const id = targetEmployee.parentElement.previousElementSibling.previousElementSibling.textContent;

    request.delete(id)
    .then(message => {
        ui.deleteEmployeeFromUI(targetEmployee.parentElement.parentElement);
    })
    .catch(err => console.log(err));
}

//Employee Güncelleme Kontrolü Fonskiyonu
function updateEmployeeController(targetEmployee){
    ui.toogleUpdateButton(targetEmployee);

    if(updateState === null){
        updateState = {
            updateId : targetEmployee.children[3].textContent,
            updateParent :  targetEmployee
        }
    }else{
        updateState = null;
    }
}

//Employee Güncelleme Fonksiyonu
function updateEmployee(){
    if(updateState){
        const data = {name:nameInput.value.trim(),department:departmentInput.value.trim(),salary:Number(salaryInput.value.trim())};

        request.put(updateState.updateId,data)
        .then(updatedEmployee => {
            ui.updateEmployeeOnUI(updatedEmployee,updateState.updateParent);
        })
        .catch(err => console.log(err));
    }
}

//Employeeleri Filtreleme
function filterEmployees(){
    console.log("filtering");
    const filterValue = filterInput.value.toLowerCase();
    const tableItems = document.querySelectorAll(".table-group-item");

    ui.filterEmployeeUI(tableItems,filterValue);
}

//Employeelerin Tamamını Silme İşlemi
function clearAllEmployees(){
    let count = employeesList.children.length;
    console.log(count);
    for(let i=0;i<count;i++){
        request.delete(Number(employeesList.children[i].children[3].textContent));
    }

    for(let i=0;i<count;i++){
        employeesList.firstElementChild.remove();
    }


}