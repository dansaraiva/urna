package com.tech.UrnaEletronica.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.tech.UrnaEletronica.dto.ChapaDTO;
import com.tech.UrnaEletronica.service.ChapaService;

import java.util.List;

@RestController
@RequestMapping("/api/chapas")
@RequiredArgsConstructor
public class ChapaController {
    
    private final ChapaService chapaService;
    
    @GetMapping
    public List<ChapaDTO> listarChapas() {
        return chapaService.listarChapas();
    }
    
    @GetMapping("/{id}")
    public ChapaDTO buscarChapa(@PathVariable Long id) {
        return chapaService.buscarChapa(id);
    }
    
    @PostMapping
    public ChapaDTO cadastrarChapa(@RequestBody ChapaDTO chapaDTO) {
        return chapaService.cadastrarChapa(chapaDTO);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarChapa(@PathVariable Long id) {
        chapaService.deletarChapa(id);
        return ResponseEntity.noContent().build();
    }
}