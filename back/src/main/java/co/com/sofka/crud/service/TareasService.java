package co.com.sofka.crud.service;

import co.com.sofka.crud.model.Tareas;
import co.com.sofka.crud.repository.TareasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TareasService {

    @Autowired
    private TareasRepository repository;

    public Iterable<Tareas> list(){
        return repository.findAll();
    }

    public Tareas get(Long id){
        return repository.findById(id).orElseThrow();
    }

    public Tareas save(Tareas taskList){
        return repository.save(taskList);
    }

    public void delete(Long id){
        repository.delete(get(id));
    }
}