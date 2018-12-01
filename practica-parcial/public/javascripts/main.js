window.onload = () => {

    //Listener del formulario
    let form = document.claseForm;

    form.addEventListener('submit', ()=>{
        event.preventDefault();
        if(!form.name.value == "" && !form.uvs.value == "" && !form.descripcion.value == ""){
            let clase = {
                name: form.name.value,
                uvs: form.uvs.value,
                descripcion: form.descripcion.value
            }

            fetch('/clase', {
                method:'POST',
                body: JSON.stringify(clase),
                headers:{
                    'Content-Type': 'application/json'
                }   
            })
            .then(res => {return res.json()})
            .then(data => {
                if(data.ok)
                    addrow(data.clase);
            });
        }
    });

    //llenar tabla cada vez que cargue la pagina
    fetch('/clase', {
        method:'GET'
    })
    .then(res => {return res.json()})
    .then(data => {
        if(data.ok){
            let clases = data.clases;
            clases.forEach(element => {
                addrow(element);
            });
        }
    })

}

function addrow(clase){
    let tbody = document.getElementById("claseTablaBody");

    let tr = document.createElement('tr');

    let td_name = document.createElement('td');
    let td_uvs = document.createElement('td');
    let td_descripcion = document.createElement('td');
    let td_edit = document.createElement('td');
    let td_delete = document.createElement('td');

    td_name.innerText = clase.name;
    tr.appendChild(td_name);

    td_uvs.innerText= clase.uvs;
    tr.appendChild(td_uvs);

    td_descripcion.innerText = clase.descripcion;
    tr.appendChild(td_descripcion);

    td_edit.innerHTML = '<a href="#" class="btn btn-warning">EDIT</a>';
    tr.appendChild(td_edit);

    td_delete.innerHTML = '<a href="#" class="btn btn-danger">DELETE</a>';
    tr.appendChild(td_delete);

    tr.setAttribute("data-claseId", clase._id);

    tbody.appendChild(tr);

    td_edit.childNodes[0].addEventListener('click', function(){
        edit(clase._id);
    });

    td_delete.childNodes[0].addEventListener('click', function(){
        del(clase._id);
    });

}

function del(claseId){
    
    fetch('/clase/'+claseId, {
        method: 'DELETE'
    })
    .then(res => {return res.json()})
    .then(deleted => {
        if(deleted.ok){
            var to_remove = document.querySelector('[data-claseId="'+claseId+'"]');
            to_remove.parentNode.removeChild(to_remove);
        }
    });
}

function edit(claseId){
    //conseguimos la fila a actualizar
    var tr = document.querySelector('[data-claseId="'+claseId+'"]');


    //cambiamos los primeros 3 a que sean inputs.
    var children = tr.childNodes;

    //conseguimos los valores viejos
    claseOld = {
        name: children[0].innerText,
        uvs:children[1].innerText,
        descripcion:children[2].innerText
    };

    //cambiamos los textos a que hora tengan inputs y metemos como placeholder los valores viejos
    children[0].innerHTML = '<input type="text" name="up_name" placeholder="'+claseOld.name+'" >';
    children[1].innerHTML = '<input type="text" name="up_uvs" placeholder="'+claseOld.uvs+'" >';
    children[2].innerHTML = '<input type="text" name="up_descripcion" placeholder="'+claseOld.descripcion+'" >';

    //borramos los dos botones que ya existian
    tr.removeChild(children[3]);
    tr.removeChild(children[3]);

    //creamos el boton para el update
    var update_btn = document.createElement('input');
    update_btn.type = "submit";
    update_btn.name = "up_submit";
    update_btn.value = "update";
    update_btn.className = "btn btn-warning";

    //lo agregamos a la fila
    tr.appendChild(update_btn);

    

    //le damos funcionalidad al boton de update
    update_btn.addEventListener('click', function(){
        
        //conseguimos los valores del formulario
        let updated = {
            name: children[0].firstChild.value,
            uvs: children[1].firstChild.value,
            descripcion: children[2].firstChild.value
        };

        //vemos que no quieran actualizar con algo vacio
        if(!updated.name == "" && !updated.uvs == "" && !updated.descripcion == ""){
            fetch('/clase/'+claseId, {
                method:'PUT',
                body: JSON.stringify(updated),
                headers: {
                    'content-type': 'application/json'
                }
            })
            .then(res => {return res.json()})
            .then(data => {
                //Si todo funciono devolvamos la fila como estaba antes pero con los nuevos datos.
                if(data.ok){
                    //borramos todo lo que estaba dentro del tr
                    while(tr.firstChild){
                        tr.removeChild(tr.firstChild);
                    }


                    //creamos todo como es originalmente
                    let td_name = document.createElement('td');
                    let td_uvs = document.createElement('td');
                    let td_descripcion = document.createElement('td');
                    let td_edit = document.createElement('td');
                    let td_delete = document.createElement('td');

                    td_name.innerText = updated.name;
                    tr.appendChild(td_name);

                    td_uvs.innerText= updated.uvs;
                    tr.appendChild(td_uvs);

                    td_descripcion.innerText = updated.descripcion;
                    tr.appendChild(td_descripcion);

                    td_edit.innerHTML = '<a href="#" class="btn btn-warning">EDIT</a>';
                    tr.appendChild(td_edit);

                    td_delete.innerHTML = '<a href="#" class="btn btn-danger">DELETE</a>';
                    tr.appendChild(td_delete);

                    tr.setAttribute("data-claseId", claseId);

                    td_edit.childNodes[0].addEventListener('click', function(){
                        edit(claseId);
                    });

                    td_delete.childNodes[0].addEventListener('click', function(){
                        del(claseId);
                    });
                }
            });
            
        }
        
    })

    
    

}
