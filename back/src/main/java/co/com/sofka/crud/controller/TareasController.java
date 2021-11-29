package co.com.sofka.crud.controller;

import co.com.sofka.crud.model.Tareas;
import co.com.sofka.crud.service.TareasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TareasController {

    @Autowired
    private TareasService service;

    @GetMapping(value = "api/tareas")
    public Iterable<Tareas> list(){
        return service.list();
    }

    @PostMapping(value = "api/tareas")
    public Tareas save(@RequestBody Tareas tareas){
        return service.save(tareas);
    }


    @PutMapping(value = "api/tarea")
    public Tareas update(@RequestBody Tareas tareas){
        if(tareas.getId() != null){
            return service.save(tareas);
        }
        throw new RuntimeException("No existe el id para actualizar");
    }

    @DeleteMapping(value = "api/{id}/tarea")
    public void delete(@PathVariable("id") Long id){
        service.delete(id);
    }

    @GetMapping(value = "api/{id}/tarea")
    public Tareas get(@PathVariable("id") Long id){
        return service.get(id);
    }
}