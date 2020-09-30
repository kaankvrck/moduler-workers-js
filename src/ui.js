export class UI{
    constructor(){
        this.employeeslist = document.getElementById("employees");
        this.updateButton = document.getElementById("update");
        this.nameInput = document.getElementById("name");
        this.departmentInput = document.getElementById("department");
        this.salaryInput = document.getElementById("salary");
        this.filterInput = document.getElementById("filter");
    }
    //Bütün Employeeleri UI'a Ekleme Fonksiyonu
    addAllEmployeeToUI(employees){

             let result = "";

             employees.forEach(employee => {
                 result += `
                 <tr>             
                 <td class="table-group-item">${employee.name}</td>
                 <td>${employee.department}</td>
                 <td>${employee.salary}</td>
                 <td>${employee.id}</td>
                 <td style="width: 50px; height: auto;"><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
                 <td style="width: 90px; height: auto;"> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a> </td>
                </tr>
                 `;
             });
             this.employeeslist.innerHTML = result;
    }

    //Filtreleme Fonksiyonun Yazılması
    filterEmployeeUI(tableItems,filterValue){
        tableItems.forEach(function(employeeName){
            const empname = employeeName.textContent.toLowerCase();
            if (empname.indexOf(filterValue)=== -1){
                employeeName.parentElement.setAttribute("style","display:none !important");
            }
            else{
                employeeName.parentElement.setAttribute("style","display:''");
            }
        });
        this.filterInput.value = "";
    }

    //Inputları Temizleme Fonksiyonunun Yazılması
    clearAllInputs(){
        this.nameInput.value = "";
        this.salaryInput.value = "";
        this.departmentInput.value = "";
    }

    //Uı'a Yeni Employee Ekleme Fonksiyonunuun Yazılması
    addEmployeeToUI(employee){

        this.employeeslist.innerHTML += `
        <tr>             
        <td class="table-group-item">${employee.name}</td>
        <td>${employee.department}</td>
        <td>${employee.salary}</td>
        <td>${employee.id}</td>
        <td style="width: 50px; height: auto;"><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
        <td style="width: 90px; height: auto;"> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a> </td>
       </tr>
        `;
    }

    //Employee Güncelleme Fonksiyonunun Yazılması
    toogleUpdateButton(target,id){
        if(this.updateButton.style.display ==="none"){
            this.updateButton.style.display = "block";
            this.addEmployeeInfoToInputs(target);
        }
        else{
            this.updateButton.style.display = "none";
            this.clearAllInputs();
        }
    }

    //Arayüzden Employeelerin Silinmesi Fonksiyonu
    deleteEmployeeFromUI(element){
        element.remove();
    }

    //Employee Bilgilerini Inputa Ekleme Fonksiyonu
    addEmployeeInfoToInputs(target){
        const children = target.children;

        this.nameInput.value = children[0].textContent;
        this.departmentInput.value = children[1].textContent;
        this.salaryInput.value = children[2].textContent;
    }

    //Güncellenmiş Employee Bilgilerini UI'a Aktarma Fonksiyonu
    updateEmployeeOnUI(employee,parent){
        parent.innerHTML= `
                <tr>             
                <td class="table-group-item">${employee.name}</td>
                <td>${employee.department}</td>
                <td>${employee.salary}</td>
                <td>${employee.id}</td>
                <td style="width: 50px; height: auto;"><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
                <td style="width: 90px; height: auto;"> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a> </td>
            </tr>
        
        
        `;
    }
}