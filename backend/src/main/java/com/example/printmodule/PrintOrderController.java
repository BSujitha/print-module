package com.example.printmodule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api")
public class PrintOrderController {

    @Autowired
    private PrintOrderRepository repo;

    @PostMapping("/orders")
    public PrintOrder save(@RequestBody PrintOrder order) {
        return repo.save(order);
    }

    @GetMapping("/orders")
    public List<PrintOrder> getAll() {
        return repo.findAll();
    }

    @DeleteMapping("/orders/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}